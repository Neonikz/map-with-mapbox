import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useContext, useEffect, useReducer } from "react";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

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

      dispatch({ type: "setMarkers", payload: newMarkers });
    }
  }, [places]);

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    try {
      const resp = await directionsApi<DirectionsResponse>(
        `/${start.join(",")}; ${end.join(",")}`
      );
      const { distance, duration, geometry } = resp.data.routes[0];
      const { coordinates: coords } = geometry;

      let kms = distance / 1000;
      kms = Math.round(kms * 100);
      kms /= 100;

      const minutes = Math.floor(duration / 60);

      const bounds = new LngLatBounds(start, start);

      for (const coord of coords) {
        const newCoord: [number, number] = [coord[0], coord[1]];
        bounds.extend(newCoord);
      }

      state.map?.fitBounds(bounds, {
        padding: 200,
      });

      //Polyline
      const sourceData: AnySourceData = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: coords,
              },
            },
          ],
        },
      };

      if (state.map?.getLayer("RouteString")) {
        state.map.removeLayer("RouteString");
        state.map.removeSource("RouteString");
      }

      //Adding polyline
      state.map?.addSource("RouteString", sourceData);
      //Polyline styles
      state.map?.addLayer({
        id: "RouteString",
        type: "line",
        source: "RouteString",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "black",
          "line-width": 3,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        //Methods
        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
