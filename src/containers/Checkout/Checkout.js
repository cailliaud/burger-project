import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component {


    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    onCheckoutContinued = () => {
        this.props.history.push(this.props.match.path + '/contact-data');
    }

    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchases ? <Redirect to="/"/> : null;
            summary = (
                <React.Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCheckoutCancelled={this.onCheckoutCancelled}
                        onCheckoutContinued={this.onCheckoutContinued}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                           component={ContactData}/>
                </React.Fragment>);
        }
        return (
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchases: state.orders.purchased
    }
}

export default connect(mapStateToProps)(Checkout);