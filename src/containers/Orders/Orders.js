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
        this.props.onFetchOrders(this.props.token,this.props.userId);

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
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));