

import { FETCH_LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../action/userAction';


const INITIAL_STATE = {
    account: {
        id: '',
        email: '',
        name: '',
        phone_number: '',
        class_name: '',
        cccd: '',
        role: '',
        access_token: ''
    },
    isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    id: action?.payload?.student_id,
                    email: action?.payload?.email,
                    name: action?.payload?.name,
                    phone_number: action?.payload?.phone_number,
                    class_name: action?.payload?.class_name,
                    cccd: action?.payload?.identification_number,
                    role: action?.payload?.role,
                    access_token: action?.payload?.accessToken,
                },
                isAuthenticated: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...state, account: {
                    id: '',
                    email: '',
                    name: '',
                    phone_number: '',
                    class_name: '',
                    cccd: '',
                    role: '',
                    access_token: ''
                },
                isAuthenticated: false

            };

        default: return INITIAL_STATE;

    }
};

export default userReducer;