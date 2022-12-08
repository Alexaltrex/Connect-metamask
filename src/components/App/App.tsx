import Button from '@mui/material/Button';
import React from 'react';
import style from "./App.module.scss";
import {Header} from "../Header/Header";

export const App = () => {

    //const [errorMessage, setErrorMessage] = useState<string | null>(null);
    //const [connectButtonLabel, setConnectButtonLabel] = useState("Connect metamask");
    //const [connecting, setConnecting] = useState(false);




    // const onConnectHandler = async () => {
    //     if (provider) {
    //         if (Boolean(currentAccountAddress)) { // это дисконнект
    //             setCurrentAccountAddress("")
    //             setConnectButtonLabel("Connect metamask")
    //         } else {
    //             try {
    //                 setConnecting(true);
    //                 setConnectButtonLabel("Connecting...")
    //                 const accounts = await provider.request({method: 'eth_requestAccounts'});
    //                 await accountChangeHandler(accounts[0]);
    //                 setConnectButtonLabel("Disconnect")
    //             } catch (e: any) {
    //                 console.log(e)
    //                 if (e.message) {
    //                     setErrorMessage(e.message)
    //                 } else {
    //                     setErrorMessage("error")
    //                 }
    //             } finally {
    //                 setConnecting(false);
    //             }
    //         }
    //     } else {
    //         setErrorMessage("Please install MetaMask")
    //     }
    // }



    return (
        <div className={style.app}>
            <Header/>

            <div className={style.content}>
                <h1>Connect to MetaMask</h1>
                <div className={style.block}>
                    <h2>Connect using window.ethereum</h2>
                    {/*<Button variant="contained"*/}
                    {/*        className={style.btn}*/}
                    {/*        //onClick={onConnectHandler}*/}
                    {/*        disabled={detectingProvider || !currentAccountAddress && connecting}*/}
                    {/*>*/}
                    {/*    {connectButtonLabel}*/}
                    {/*</Button>*/}
                    {/*{*/}
                    {/*    currentAccountAddress && <p className={style.info}>*/}
                    {/*        <span>Address:</span> <span>{currentAccountAddress}</span>*/}
                    {/*    </p>*/}
                    {/*}*/}
                    {/*{*/}
                    {/*    balance &&*/}
                    {/*    <p className={style.info}>*/}
                    {/*        <span>Balance:</span> <span>{`${balance} ETH`}</span>*/}
                    {/*    </p>*/}
                    {/*}*/}
                </div>

                {/*{*/}
                {/*    errorMessage && <p className={style.error}>*/}
                {/*        {errorMessage}*/}
                {/*    </p>*/}
                {/*}*/}
            </div>

        </div>
    );
}

