import * as actionTypes from './actionTypes';
import axios from '../../config/axiosOrders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        const queryParams= '?auth=' + token;
        axios.post('/orders.json'+queryParams, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
}
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
}
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
}

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams= '?auth=' + token+ '&orderBy="userId"&equalTo="'+ userId+'"';
        axios.get('/orders.json' + queryParams)
            .then(result => {
                    const fetchedOrders = []
                    for (let key in result.data) {
                        fetchedOrders.push({
                                ...result.data[key],
                                id: key
                            }
                        );
                    }
                    ;
                    dispatch(fetchOrdersSuccess(fetchedOrders));

                }
            ).catch((error) => dispatch(fetchOrdersFail(error)));
    }
}