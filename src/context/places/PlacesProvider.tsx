import { useReducer, useEffect } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}
interface ChildrenProps {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: true,
  places: [],
};

export const PlacesProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat })
    );
  }, []);

  const searchPlacesByTerm = async (
    query: string
  ): Promise<Feature[] | undefined> => {
    if (query.length === 0) return []; //TODO:Limpiar state

    if (!state.userLocation) throw new Error("No hay ubicación del usuario ");

    //Loading places
    dispatch({ type: "setLoadingPlaces" });

    try {
      const resp = await searchApi<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: state.userLocation.join(","),
        },
      });

      //Setting places
      dispatch({ type: "setPlaces", payload: resp.data.features });
      return resp.data.features;
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
