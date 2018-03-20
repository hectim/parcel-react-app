import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import 'rxjs';

import { Store } from './store';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";


ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
