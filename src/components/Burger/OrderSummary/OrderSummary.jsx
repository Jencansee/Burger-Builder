import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
        <li style={{listStyle: 'none'}}key={igKey + props.ingredients[igKey]}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>
        );
    });

   return (
    <Aux>   
        <h3>Your order:</h3>
        <p>Your delicious burger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Total Price: {props.price.toFixed(2)}</p>
        <Button btnType={'Danger'} clicked={props.purchaseCancel}>Cancel</Button>
        <Button btnType={'Success'} clicked={props.purchaseProceed}>Proceed</Button>
    </Aux>
   );
};

export default OrderSummary;