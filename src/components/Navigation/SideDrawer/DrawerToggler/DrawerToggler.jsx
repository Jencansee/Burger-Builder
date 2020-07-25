import React from 'react';
import classes from './DrawerToggler.module.scss';

const DrawerToggler = (props) => (
    <div className={classes.DrawerToggler} onClick={props.openDrawer}>
        <span></span>
        <span></span>
        <span></span>
    </div>  
);

export default DrawerToggler;