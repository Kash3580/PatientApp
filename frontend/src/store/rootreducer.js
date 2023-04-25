import { combineReducers } from 'redux';
import patientReducer from './reducer/patients';

const rootReducer = combineReducers({ patientReducer });

export default rootReducer;
