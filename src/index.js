import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "normalize.css";
import "typeface-roboto";
import "typeface-roboto-slab";
import "react-grid-layout/css/styles.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
