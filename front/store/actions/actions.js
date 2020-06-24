import actionTypes from "./actionTypes";
import {
    getEvents,
    createEvent,
    updateEvent,
    deleteUser,
    checkUser
} from "../../utils/services";

export const get_all_events = (jwt) => {
  return dispatch => {
    //dispatch({ type: actionTypes.GET_DATA });
    getEvents(jwt)
      .then(resp => {
        dispatch({
          type: actionTypes.GET,
          payload: resp.data
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const create_event = (jwt, eventData) => {
  return dispatch => {
    createEvent(jwt, eventData)
      .then(resp => {
        dispatch({
          type: actionTypes.CREATE,
          payload: resp.data
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const update_event = (jwt, eventId, eventData) => {
  return dispatch => {
    updateEvent(jwt, eventId, eventData)
      .then(resp => {
        dispatch({
          type: actionTypes.UPDATE_EVENT,
          payload: resp.data
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const delete_event = (jwt, eventId) => {
  return dispatch => {
    updateEvent(jwt, eventId)
      .then(resp => {
        dispatch({
          type: actionTypes.DELETE,
          payload: resp.data
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const check_user = (jwt, userData) => {
  console.log("action dispatch: ", userData);
  return dispatch => {
    checkUser(jwt, userData)
      .then(resp => {
        dispatch({
          type: actionTypes.CHECK_USER,
          payload: {
            jwt, userData
          }
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const update = payload => {
  return {
    type: actionTypes.UPDATE,
    payload
  };
};
/*
export const getInitialState = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DATA });
    Webservice.getInitialData()
      .then(resp => {
        dispatch({ type: actionTypes.GET_INITIAL_STATE, payload: resp.data });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const addEntity = (type, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DATA });
    Webservice.addEntity(type, data)
      .then(resp => {
        dispatch({
          type: actionTypes.POST_ENTITY,
          payload: resp.data,
          entity: type
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const getEntity = (type, id) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DATA });
    Webservice.getEntity(type, id)
      .then(resp => {
        dispatch({
          type: actionTypes.GET_ENTITY,
          payload: resp.data,
          entity: type
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const addCustom = (id, customsList) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DATA });
    Webservice.addCustom(id, { custom: customsList })
      .then(resp => {
        dispatch({
          type: actionTypes.ADD_CUSTOM,
          payload: { ...resp.data, custom: customsList }
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const addRelation = (type, body) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DATA });
    Webservice.makeRelation(type, body)
      .then(resp => {
        dispatch({
          type: actionTypes.POST_RELATION,
          payload: { ...resp.data }
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const updateEntity = (type, id, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DATA });
    Webservice.updateEntity(type, id, data)
      .then(resp => {
        dispatch({
          type: actionTypes.UPDATE_ENTITY,
          payload: resp.data,
          entity: type
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

export const deleteRelation = (type, id) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DATA });
    Webservice.deleteRelation(type, id)
      .then(resp => {
        dispatch({
          type: actionTypes.DELETE_RELATION,
          payload: resp.data,
          entity: type
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  };
};

*/