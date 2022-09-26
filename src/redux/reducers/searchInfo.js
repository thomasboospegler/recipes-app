// import { PERSONAL_INFO } from '../actions';
// import { REQUEST_LOGIN, UPDATE_SCORE } from '../actions';

const initialState = {
  radioValue: '',
  inputValue: '',
};

const searchInfo = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_FETCH_INFO':
    return {
      ...state,
      radioValue: action.saveInfo.radioValue,
      inputValue: action.saveInfo.inputValue,
    };
  default:
    return state;
  }
};

export default searchInfo;
