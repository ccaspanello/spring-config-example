import {Menubar} from "primereact/menubar";
import {MenuItem} from "primereact/menuitem";
import HeaderEnd from "./HeaderEnd.tsx";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const model: MenuItem[] = [
        {
            label: "Dashboard",
            command: () => navigate('/')
        }
    ]

    const start = () => {
        return (
            <>
            </>
        )
    }



    return (
        <Menubar model={model} start={start} end={<HeaderEnd />} />
    )
}

export default Header;