import { combineReducers } from "redux";

import budget from "./budgetReducer";
import common from './commonReducer';

const rootReducer = combineReducers({
    budget,
    common,
});

export default rootReducer;