import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import Store from "./store/store.ts";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {BrowserRouter} from "react-router-dom";
import IndexStore from "./indexStore.js";


const store = new Store();
const indexStore = new IndexStore();

export const Context = createContext({
    store,
    indexStore
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Context.Provider value={{
            store,
            indexStore
        }}>
              <App />
          </Context.Provider>
    </BrowserRouter>
);