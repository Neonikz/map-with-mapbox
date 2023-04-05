import { BtnMyLocation, MapView, ReactLogo, Searchbar } from "../components";

export const HomePage = () => {
  return (
    <div>
      <MapView />
      <BtnMyLocation />
      <ReactLogo />
      <Searchbar />
    </div>
  );
};
