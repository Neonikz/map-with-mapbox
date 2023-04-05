import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useContext, useEffect, useReducer } from "react";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "../places/PlacesContext";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

interface MapProps {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({ children }: MapProps) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const { places } = useContext(PlacesContext);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
          <h4>Aquí estoy</h4>
          <p>En algún lugar del mundo</p>
        `);

    //Add marker
    new Marker({
      color: "#EA4335",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({ type: "setMap", payload: map });
  };

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
        <h6>${place.text}</h6>
        <p>${place.place_name}</p>

      `);
      const newMarker = new Marker({ color: "#EA4335" })
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);

      // TODO:borrar polylines

      dispatch({ type: "setMarkers", payload: newMarkers });
    }
  }, [places]);

  return (
    <MapContext.Provider
      value={{
        ...state,

        //Methods
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
