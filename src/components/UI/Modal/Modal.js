import React from 'react';
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const Modal = (props) => {
    return (
        <Aux>
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
                }}>
                {props.children}
            </div>
            <Backdrop show={props.show } clicked={props.modalClosed}/>
        </Aux>

    );
};

export default Modal;
