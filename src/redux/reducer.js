import { combineReducers } from 'redux'
import { drizzleReducers } from 'drizzle'

import pilotLogReducer from './pilotLogReducer'
import browserHistory from './history'

// Individual routerReducer for connected-react-router
// see: https://github.com/rematch/rematch/issues/257
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const merge = (state, payload) => ({ ...state, ...payload });
const routerReducer = (history) => {
    const initialState = {
        location: history.location,
        action: history.action,
    };
    return (state = initialState, { type, payload } = {}) => {
        if (type === LOCATION_CHANGE) {
            return merge(state, payload)
        }

        return state
    }
};

const rootReducer = combineReducers({
	pilotLog: pilotLogReducer,
	routing: routerReducer(browserHistory),
	...drizzleReducers
})

export default rootReducer;
