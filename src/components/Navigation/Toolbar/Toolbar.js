import React from 'react';
import classes from "./Toolbat.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = () => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <Logo />
            <NavigationItems />
        </header>
    );
};

export default Toolbar;
