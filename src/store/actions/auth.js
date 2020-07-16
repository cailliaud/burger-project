import * as actionTypes from "./actionTypes";
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        newPath: path
    }
}

export const checkAuthTimeout = (expirationTimeInMilliSeconds) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTimeInMilliSeconds );
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            "email": email,
            "password": password,
            "returnSecureToken": true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+process.env.FIREBASE_PRIVATE_KEY;
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.FIREBASE_PRIVATE_KEY;
        }
        axios.post(url, data)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                const expirationTime = expirationDate.getTime() - new Date().getTime();
                dispatch(checkAuthTimeout(expirationTime ));
            } else {
                dispatch(logout());
            }

        }

    }
}