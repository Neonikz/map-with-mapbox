import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];

  //Methods
  searchPlacesByTerm: (query: string) => Promise<Feature[] | undefined>;
}

export const PlacesContext = createContext({} as PlacesContextProps);
