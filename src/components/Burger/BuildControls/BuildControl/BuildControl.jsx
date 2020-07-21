import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.ingredientName}>{props.ingredientName}</div>
        <button className={classes.Less} onClick={props.removedIngredient} disabled={props.disabled}>Less</button>
        <button className={classes.More} onClick={props.addedIngredient} >More</button>
    </div>
);

export default buildControl;