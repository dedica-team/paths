import * as React from "react";
import { render } from "react-dom";
//import { Landscape } from "./scenes/Landscape";
import "./styles.css";
import {Octo} from "./scenes/Octo";

const App = () => <Octo />;

render(<App />, document.getElementById("root"));
