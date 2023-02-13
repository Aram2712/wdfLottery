import {combineReducers, createStore} from 'redux';
import currencyReducer from './Currency/CurrencyReducer';
import faqReducer from './FAQ/faqReducer';

const reducer = combineReducers({
      currencys:currencyReducer,
      faq:faqReducer
})

export const store = createStore(reducer);