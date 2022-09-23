// export const PERSONAL_INFO = 'PERSONAL_INFO';
// export const WALLET_INFO = 'WALLET_INFO';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';
// export const requestAPI = () => ({ type: REQUEST_API });

// export const getResultApi = (data) => ({ type: SUCCES_API, data });

export const userInfoAction = (userInfo) => ({ type: REQUEST_LOGIN, userInfo });

export const updateScore = (value) => ({ type: UPDATE_SCORE, value });
