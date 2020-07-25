import React, { Component } from 'react';
import Aux from '../../HOC/Auxiliary';
import classes from './Layout.module.scss';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    //secure way to setState, if it based on Previous state; showSDRWR = !showSDRWR can lead to unexpected results
    sideDrawerToggler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };

    render () {
        return (
            <Aux>
                <Toolbar openDrawer={this.sideDrawerToggler} />
                <SideDrawer closedDrawer={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
};

export default Layout;