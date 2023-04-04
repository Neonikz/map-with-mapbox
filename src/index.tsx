import React from "react";
import ReactDOM from "react-dom";
import { MapApp } from "./MapApp";

if (!navigator.geolocation) {
  alert("Tu navegador no tiene opción de Geolocation");
  throw new Error("Tu navegador no tiene opción de Geolocation");
}

ReactDOM.render(
  <React.StrictMode>
    <MapApp />
  </React.StrictMode>,
  document.getElementById("root")
);
