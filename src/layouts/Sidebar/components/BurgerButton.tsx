import burgerbutton from "@icons/burger-icon.svg";

const BurgerButton = ({ toggleDrawer }: { toggleDrawer: () => void }) => (
  <img
    style={{
      cursor: "pointer",
      width: 27,
      height: 23,
      marginLeft: 24,
      marginTop: 39,
    }}
    onClick={toggleDrawer}
    src={burgerbutton}
  />
);
export default BurgerButton;
