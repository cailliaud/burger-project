import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import axios from "../../config/axiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.props.onFetchOrders();

    }

    render() {
        let orders = <Spinner/>
        if (!this.props.loading) {
            orders = this.props.orders.map(
                order => {
                    return (<Order key={order.id} ingredients={order.ingredients} price={order.price}/>);
                }
            );
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));