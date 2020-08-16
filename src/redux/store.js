import { productListReducer } from './reducers/productReducer'
import { applyMiddleware, compose, createStore, combineReducers  } from 'redux';
import thunk from 'redux-thunk';


const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
