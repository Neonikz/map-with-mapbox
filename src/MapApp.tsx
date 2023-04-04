import { PlacesProvider } from "./context";
import { HomePage } from "./pages";

export const MapApp = () => {
  return (
    <PlacesProvider>
      <HomePage />
    </PlacesProvider>
  );
};
