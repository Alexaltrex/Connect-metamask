import React, {useEffect, useRef, useState} from "react";
import style from "./Header.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import detectEthereumProvider from "@metamask/detect-provider";
import {ethers} from "ethers";
import {svgIcons} from "../../assets/svgIcons";
import clsx from "clsx";
import {Fade} from "@mui/material";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {useOutsideButNotOnTargetClick} from "../../hooks/useOutsideClick";
import Jazzicon from "react-jazzicon";

export const Header = observer(() => {
    const {
        appStore: {
            showAccountPopup, setShowAccountPopup,
            setAlert
        },
        cryptoStore: {
            provider, setProvider,
            detectingProvider, setDetectingProvider,
            currentAccountAddress, setCurrentAccountAddress,
            balance, setBalance,
            connecting, setConnecting,

        }
    } = useStore();

    // 1 - определяем наличие провайдера
    useEffect(() => {
        const getProvider = async () => {
            setDetectingProvider(true);
            console.log("start detecting provider", new Date());
            const provider = await detectEthereumProvider();
            return provider
        }
        getProvider()
            .then(result => {
                console.log("end detecting provider", new Date());
                setProvider(result)
            })
            .finally(() => setDetectingProvider(false))
    }, []);

    // 2 - при наличие провайдера устанавливаем обработчики событий "accountsChanged", "chainChanged"
    useEffect(() => {
        if (provider) {
            provider.on('accountsChanged', (accounts: any) => accountChangeHandler(accounts[0]));
            provider.on("chainChanged", chainChangedHandler);
            return () => {
                provider.removeListener('accountsChanged', (accounts: any) => accountChangeHandler(accounts[0]));
                provider.removeListener("chainChanged", chainChangedHandler);
            }
        }
    }, [provider]);

    // обработчик смены аккаунта
    const accountChangeHandler = async (newAccount: string) => {
        setCurrentAccountAddress(newAccount);
        await getBalance(newAccount);
    }

    // обработчик смены сети
    const chainChangedHandler = () => {
        window.location.reload();
    }

    const getBalance = async (newAccount: string) => {
        try {
            const balance = await provider.request({
                method: 'eth_getBalance',
                params: [newAccount, 'latest']
            });
            setBalance(ethers.utils.formatEther(balance))
        } catch (e: any) {
            console.log(e?.message || "Error");
            setAlert({
                open: true,
                message: e?.message || "Error",
                severity: "error"
            })
        }
    }

    const onWalletButtonClickHandler = async () => {
        if (currentAccountAddress) { // если вошел в метамаск - переключаем попап
            setShowAccountPopup(!showAccountPopup)
        } else { // если нет - присоединяемся
            if (provider) {
                try {
                    setConnecting(true);
                    const accounts = await provider.request({method: 'eth_requestAccounts'});
                    await accountChangeHandler(accounts[0]);
                } catch (e: any) {
                    console.log(e?.message || "Error");
                    setAlert({
                        open: true,
                        message: e?.message || "Error",
                        severity: "error"
                    })
                } finally {
                    setConnecting(false);
                }
            } else {
                console.log("Please install MetaMask")
                setAlert({
                    open: true,
                    message: "Please install MetaMask",
                    severity: "error"
                });
            }
        }
    }

    const [toolTipLabel, setToolTipLabel] = useState('Copy to clipboard');
    const [copied, setCopied] = useState(false);

    const onDisconnectHandler = () => {
        setCurrentAccountAddress(null);
        setShowAccountPopup(false);
    }

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
                setToolTipLabel('Copy to clipboard!')
            }, 3000)
        }
    }, [copied])

    const onCopyHandler = () => {
        if (!copied && currentAccountAddress) {
            navigator.clipboard.writeText(currentAccountAddress)
            setCopied(true);
            setToolTipLabel('Copied!');
        }
    }

    const popupRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    // закрыть попап если кликнули вне него, но не по самой кнопке
    useOutsideButNotOnTargetClick(
        popupRef,
        btnRef,
        () => {
            setShowAccountPopup(false);
        }
    )

    return (
        <header className={style.header}>
            <p className={style.logo}>Connect Metamask Example</p>

            <div className={style.connectButtonWrapper}>
                <button className={clsx({
                    [style.connectButton]: true,
                    [style.connectButton_connected]: currentAccountAddress,
                })}
                        disabled={detectingProvider || connecting}
                        onClick={onWalletButtonClickHandler}
                        ref={btnRef}
                >
                    {
                        currentAccountAddress ? (
                            <>
                                <div className={style.metamask}>
                                    {svgIcons.metamask}
                                </div>
                                <div className={style.account}>
                                    <p className={style.topLabel}>{currentAccountAddress}</p>
                                    <p>{currentAccountAddress.slice(-5)}</p>
                                </div>
                                <div className={clsx({
                                    [style.arrow]: true,
                                    [style.arrow_showAccountPopup]: showAccountPopup,
                                })}>
                                    {svgIcons.arrowDown}
                                </div>

                            </>
                        ) : (
                            <p className={style.btnLabel}>
                                {
                                    connecting ? "Connecting Metamask..." : "Connect Metamask"
                                }
                            </p>
                        )
                    }
                </button>

                <Fade in={showAccountPopup}>
                    <div className={style.accountPopup}
                         ref={popupRef}
                    >

                        <div className={style.top}>

                            <p className={style.topLabel}>Account</p>

                            <Button variant="outlined"
                                    startIcon={<LogoutIcon fontSize="small"/>}
                                    size="small"
                                    className={style.disconnectBtn}
                                    onClick={onDisconnectHandler}
                            >
                                Disconnect
                            </Button>

                        </div>

                        <div className={style.accountBlock}>
                            {
                                currentAccountAddress &&
                                <div className={style.bottomLeft}>

                                    <Jazzicon diameter={24}
                                              seed={
                                                  //Math.round(Math.random() * 10000000)
                                                  parseInt(currentAccountAddress.slice(2, 10), 16)
                                              }
                                    />

                                    <div className={style.account}>
                                        <p className={style.topLabel}>{currentAccountAddress}</p>
                                        <p>{currentAccountAddress.slice(-5)}</p>
                                    </div>
                                </div>
                            }

                            <Tooltip title={toolTipLabel}>
                                {
                                    copied ? (
                                        <div className={style.copiedIconWrapper}>
                                            <DoneAllIcon/>
                                        </div>

                                    ) : (
                                        <IconButton size="small"
                                                    onClick={onCopyHandler}
                                        >
                                            <ContentCopyIcon fontSize="small"/>
                                        </IconButton>
                                    )
                                }
                            </Tooltip>

                        </div>

                        {
                            balance && (
                                <div className={style.balanceBlock}>
                                    <p>Balance:</p>
                                    <p>{`${Number(balance).toFixed(6)} ETH`}</p>
                                </div>
                            )
                        }

                    </div>
                </Fade>
            </div>

        </header>
    )
})
