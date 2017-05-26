/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import { CHANGE_FORM, SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';
const assign = Object.assign || require('object.assign');
import auth from '../utils/auth';
import initialState from './initialState';

// Takes care of changing the application state
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return assign({}, state, {
        formState: action.newState
      });
    case SET_AUTH:
      return assign({}, state, {
        loggedIn: action.newState
      });
    case SENDING_REQUEST:
      return assign({}, state, {
        currentlySending: action.sending
      });
    case SET_ERROR_MESSAGE:
      return assign({}, state, {
        errorMessage: action.message
      });
    default:
      return state;
  }
}
