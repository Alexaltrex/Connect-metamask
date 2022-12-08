import {action, makeObservable, observable} from "mobx";

export class CryptoStore {
    provider: any = null;
    detectingProvider: boolean = false; // процесс определения провайдера
    connecting: boolean = false; // процесс подключения к аккаунту
    currentAccountAddress: string | null = null;
    balance: string | null = null;

    constructor() {
        makeObservable(this, {
            provider: observable,
            detectingProvider: observable,
            connecting: observable,
            currentAccountAddress: observable,
            balance: observable,

            setProvider: action.bound,
            setDetectingProvider: action.bound,
            setConnecting: action.bound,
            setCurrentAccountAddress: action.bound,
            setBalance: action.bound,
        })
    }

    setProvider(provider: any) {
        this.provider = provider
    }

    setDetectingProvider(detectingProvider: boolean) {
        this.detectingProvider = detectingProvider
    }

    setConnecting(connecting: boolean) {
        this.connecting = connecting
    }

    setCurrentAccountAddress(currentAccountAddress: string | null) {
        this.currentAccountAddress = currentAccountAddress;
    }

    setBalance(balance: string) {
        this.balance = balance
    }
}
