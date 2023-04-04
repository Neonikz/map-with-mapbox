import logo from "../logo.svg";

export const ReactLogo = () => {
  return (
    <img
      src={logo}
      alt="Logo React"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "130px",
      }}
    />
  );
};
