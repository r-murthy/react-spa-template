import { createElement } from "react";
import { createRoot } from "react-dom/client";
import Framework7 from "framework7";
import Framework7React from "framework7-react";
import Container from "./app.jsx";

Framework7.use(Framework7React);

const root = createRoot(document.getElementById("app"));
root.render(createElement(Container));
