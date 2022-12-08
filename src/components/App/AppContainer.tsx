import React, {createContext} from "react";
import {rootStore, RootStore} from "../../store/RootStore";
import {App} from "./App";

export const StoreContext = createContext<RootStore>({} as RootStore)

export const AppContainer = () => {
    return (
        <StoreContext.Provider value={rootStore}>
                <App/>
        </StoreContext.Provider>
    )
}
