import { PlacesProvider } from "./context";
import { HomePage } from "./pages";
import "./styles.css";

export const MapApp = () => {
  return (
    <PlacesProvider>
      <HomePage />
    </PlacesProvider>
  );
};
