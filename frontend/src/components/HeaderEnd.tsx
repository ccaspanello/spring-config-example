import {Menu} from "primereact/menu";
import {Button} from "primereact/button";
import {useRef} from "react";
import {MenuItem} from "primereact/menuitem";
import {useNavigate} from "react-router-dom";

const HeaderEnd = () => {

    const navigate = useNavigate();
    const menuRef = useRef<Menu>(null);

    const menu: MenuItem[] = [
        {
            label: "Configuration",
            command: () => navigate('/configuration')
        }
    ]

    return (
        <>
            <Menu model={menu} popup ref={menuRef} id="popup_menu_right" popupAlignment="right" />
            <Button label="Administraction" size="small" severity="info"
                    onClick={(event) => menuRef.current?.toggle(event)}/>
        </>
    )
}

export default HeaderEnd;