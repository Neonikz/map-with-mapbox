import React from "react";
import ReactDOM from "react-dom/client";
import { MapApp } from "./MapApp";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  "pk.eyJ1IjoibmVvbmlreiIsImEiOiJja3E4Y3N4cXgwMGYxMndveTk2Z3hicXhxIn0.1Dx9nF_E_Ovwcqgkupio2g";

if (!navigator.geolocation) {
  alert("Tu navegador no tiene opción de Geolocation");
  throw new Error("Tu navegador no tiene opción de Geolocation");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MapApp />
  </React.StrictMode>
);
