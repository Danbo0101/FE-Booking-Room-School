

import { FETCH_LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../action/userAction';


const INITIAL_STATE = {
    account: {
        email: '',
        name: '',
        role: ''
    }
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    email: action?.payload?.email,
                    name: action?.payload?.name,
                    role: action?.payload?.role,

                }
            };
        case LOGOUT_SUCCESS:
            return {
                ...state, account: {
                    email: '',
                    name: '',
                    role: ''
                }

            };
        default: return state;
    }
};

export default userReducer;