import { MapProvider, PlacesProvider } from "./context";
import { HomePage } from "./pages";
import "./styles.css";

export const MapApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomePage />
      </MapProvider>
    </PlacesProvider>
  );
};
