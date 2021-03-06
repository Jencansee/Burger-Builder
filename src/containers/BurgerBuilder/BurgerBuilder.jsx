import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../HOC/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.8,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,      
        totalPrice: 4,
        purchasable: false,
        purchaseModal: false,
        loadingCheckOut: false,
        error: false
    }

    //fetching from firebase - {salad: 0, bacon: 0, cheese: 0, meat: 0,}

    componentDidMount () {
        axios.get('https://reactburgerbuilder-77bd6.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;

//checks if there's something to remove from ingredient

        if (oldCount <= 0) {
            return;
        }

        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    //MODAL POP-OUT
    purchaseHandler = () => {
        this.setState({purchaseModal: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchaseModal: false});
    };

    purchaseProceedHandler = () => {
        this.setState({loadingCheckOut: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            // better to change price to raw data and calculate the price in the backend, cause user can manipulate the price
            customer: {
                name: 'John Doe',
                address: {
                    street: 'Black Mesa Research Facility',
                    zipCode: '12456789'
                },
                email: 'test@bmesa.us',
                tel: '854216889421'
            }
        }

        axios.post('/orders.json', order) //.json only for FIREBASE
        .then(res => {
            this.setState({loadingCheckOut: false, purchaseModal: false });
        })
        .catch(error => {
            this.setState({loadingCheckOut: false, purchaseModal: false });
        }); 
    };

    render() {
    
        // Checks, if there's any ingredient, if none disables it
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }


        // orderSummary set to null because it's using this.state.ingredients which
        // we're fetching from Firebase (in componentDidMount), data isn't present on the rendering (due to how Life-Cycles methods work)
        // and results in crashing
        let orderSummary = null;
        // we're setting burger to a <Spinner> and start checking if this.state.ingredient != null 
        // if that's the case, we're reassigning the variable to according components
        // the same thing is to orderSummary
        let burger = this.state.error ? <p>Problem with loading ingredients, please reload page</p> :  <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo} price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchaseMode={this.purchaseHandler}
                    />
                </Aux>
            );

           orderSummary = <OrderSummary 
           ingredients={this.state.ingredients} 
           purchaseCancel={this.purchaseCancelHandler}
           purchaseProceed={this.purchaseProceedHandler} 
           price={this.state.totalPrice} />;
        };

        // loading ? then assign Spinner 
        
        if (this.state.loadingCheckOut) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchaseModal} modalClosed={this.purchaseCancelHandler} >
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);