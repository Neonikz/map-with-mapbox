import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";
export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const handleGoBackMyLocation = () => {
    if (!isMapReady) throw new Error("El mapa no esta listo");
    if (!userLocation) throw new Error("No existe la ubicacion del usuario");

    map?.flyTo({
      zoom: 15,
      center: userLocation,
    });
  };

  return (
    <button
      className="btn btn-primary"
      onClick={handleGoBackMyLocation}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 999,
      }}
    >
      Mi Ubicación
    </button>
  );
};
