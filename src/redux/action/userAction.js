export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const doLogin = (data) => {
    // console.log("check data", data);
    return (
        {
            type: 'FETCH_LOGIN_SUCCESS',
            payload: data
        }
    )
}

export const doLogout = () => {
    return (
        {
            type: 'LOGOUT_SUCCESS',
        }
    )
}