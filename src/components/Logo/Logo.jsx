import React from 'react';
import burgerLogo from '../../assets/images/hamburger.png'
import classes from './Logo.module.scss';

const Logo = () => (
    <div className={classes.logo}>
        <img src={burgerLogo} alt="Burger Constructor"/>
    </div>
);

export default Logo;