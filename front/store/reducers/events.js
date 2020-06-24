import actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    auth: null,
    events: null,
    selected: null,
    jwt: null,
    user: null
};

function dataFetchReducer(state = INITIAL_STATE, action) {
  // console.log("dataFetchReducer: ", action.payload, state);
  switch (action.type) {
    case actionTypes.GET: {
        return Object.assign({}, state, {
            events: action.payload.events
        });
    }
    case actionTypes.CREATE: {
        return Object.assign({}, state, {
            ...state,
            ...action.payload
        });
    }
    case actionTypes.UPDATE_EVENT: {
        return Object.assign({}, state, {
            events: action.payload.events
        });
    }
    case actionTypes.DELETE: {
        return Object.assign({}, state, {
            events: action.payload.events
        });
    }
    case actionTypes.CHECK_USER: {
  console.log("reducer CHECK_USER: ", action.payload);

        return Object.assign({}, state, {
            jwt: action.payload.jwt,
            user: action.payload.user
        });
    }
    case actionTypes.GET_INITIAL_STATE: {
        return Object.assign({}, state, {
            auth: null,
            events: null,
            selected: null,
            jwt: null,
            user: null
        });
    }
    case actionTypes.UPDATE: {
        return Object.assign({}, state, {
            ...state,
            ...action.payload
        });
    }
    default:
        return state;
  }
}

export default dataFetchReducer;
