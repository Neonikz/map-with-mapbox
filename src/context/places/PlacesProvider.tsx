import { useReducer, useEffect } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}
interface ChildrenProps {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
};

export const PlacesProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat })
    );
  }, []);

  const searchPlacesByTerm = async (query: string) => {
    if (query.length === 0) return []; //TODO:Limpiar state

    if (!state.userLocation) throw new Error("No hay ubicación del usuario ");

    try {
      const resp = await searchApi(`/${query}.json`, {
        params: {
          proximity: state.userLocation.join(","),
        },
      });

      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,

        //Methods
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
