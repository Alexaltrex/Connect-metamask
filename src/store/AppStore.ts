import {action, makeObservable, observable} from "mobx";
import {AlertColor} from "@mui/material";

export interface IAlert {
    open: boolean
    message: string
    severity: AlertColor
}

export class AppStore {
    showAccountPopup: boolean = false
    alert: IAlert = {
        open: false,
        message: "",
        severity: "success" as AlertColor
    }

    constructor() {
        makeObservable(this, {
            showAccountPopup: observable,
            alert: observable,

            setShowAccountPopup: action.bound,
            setAlert: action.bound,
        })
    }

    setShowAccountPopup(showAccountPopup: boolean) {
        this.showAccountPopup = showAccountPopup;
    }

    setAlert(alert: IAlert) {
        this.alert = alert
    }
}
