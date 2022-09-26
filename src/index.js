import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { persistor } from "./redux";
import { store } from "./stores";
import "react-notifications-component/dist/theme.css";
import "antd/dist/antd.css";
import "./index.css";

const renderApp = () => {
   ReactDOM.render(
      <Provider store={store}>
         <BrowserRouter>
            <App persistor={persistor} />
         </BrowserRouter>
      </Provider>,
      document.getElementById("root")
   );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
