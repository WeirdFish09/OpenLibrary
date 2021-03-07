import {createStore} from 'redux';
import RootReducer from './Reducers/RootReducer';

export const store =  createStore(RootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());