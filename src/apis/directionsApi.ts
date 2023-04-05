import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: false,
    access_token:
      "pk.eyJ1IjoibmVvbmlreiIsImEiOiJja3E4Y3N4cXgwMGYxMndveTk2Z3hicXhxIn0.1Dx9nF_E_Ovwcqgkupio2g",
  },
});

export default directionsApi;
