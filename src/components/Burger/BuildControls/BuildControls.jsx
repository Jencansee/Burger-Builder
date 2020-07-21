import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {ingredientName: 'Bacon', type: 'bacon'},
    {ingredientName: 'Salad', type: 'salad'},
    {ingredientName: 'Cheese', type: 'cheese'},
    {ingredientName: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map(ctrl => {
            return <BuildControl 
            key={ctrl.ingredientName} 
            ingredientName={ctrl.ingredientName} 
            addedIngredient={() => props.ingredientAdded(ctrl.type)}
            removedIngredient={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />
        })} 

        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchaseMode}>ORDER NOW</button>
    </div>
);

export default buildControls;