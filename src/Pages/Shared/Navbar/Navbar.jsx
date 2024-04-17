import DrawerAppBar from "./AppBarMui";
import HideAppBar from "./MUI";
import SmallNav from "./SmallNav";



const Navbar = () => {
    return (
        <div>
            <SmallNav></SmallNav>
            <HideAppBar></HideAppBar>
            <DrawerAppBar></DrawerAppBar>
        </div>
    );
};

export default Navbar;