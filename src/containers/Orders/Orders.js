import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import axios from "../../config/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(result => {
                    const fetchedOrders = []
                    for (let key in result.data) {
                        fetchedOrders.push({
                                ...result.data[key],
                                id: key
                            }
                        );
                    }
                    this.setState({
                        orders: fetchedOrders,
                        loading: false
                    });
                }
            ).catch(error =>
            this.setState({
                loading: false
            })
        );

    }

    render() {
        let orders = <Spinner/>
        if (!this.state.loading) {
            orders = this.state.orders.map(
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

export default withErrorHandler(Orders, axios);