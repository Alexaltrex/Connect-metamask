import React from 'react';
import style from "./App.module.scss";
import {Header} from "../Header/Header";
import {CustomAlert} from "../CustomAlert/CustomAlert";

export const App = () => {
    return (
        <div className={style.app}>
            <Header/>
            <CustomAlert/>

            <div className={style.content}>
                <h1>Connect to MetaMask</h1>
                <div className={style.block}>
                    <h2>Connect using window.ethereum</h2>

                </div>
            </div>

        </div>
    );
}

