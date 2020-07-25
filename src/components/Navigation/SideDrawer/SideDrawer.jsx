import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/Auxiliary';
import classes from './SideDrawer.module.scss';

const SideDrawer = (props) => {
    let attachedClasses = [classes.Close, classes.SideDrawer];
    if (props.open) {
        attachedClasses = [classes.Open, classes.SideDrawer];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clickDrop={props.closedDrawer}/>
            <div className={attachedClasses.join(' ')}>
                <Logo />
                <nav>
                    <NavigationItems />   
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;