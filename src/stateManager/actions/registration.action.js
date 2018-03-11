/**
 * Created by Tega on 24/02/2018.
 */

import {REGISTRATION_ACTION} from 'stateManager/actions/actionTypes'
import Action from './Action';
import * as constant from 'helper/constants'

class Registration extends Action {
  /**
   * @param actionName
   * @param parameter
   * @returns {*}
   */
  resolveAction(actionName, parameter) {
    switch (actionName) {
      case REGISTRATION_ACTION.SAVE_CREDENTIALS:
      case REGISTRATION_ACTION.RESPONSE_CARS_SUCCESS:
      case REGISTRATION_ACTION.RESPONSE_CARS_FAIL:
      case REGISTRATION_ACTION.RESPONSE_MODELS_SUCCESS:
      case REGISTRATION_ACTION.RESPONSE_SAVE_USER_SUCCESS:
      case REGISTRATION_ACTION.SAVE_SELECTED_CAR:
      case REGISTRATION_ACTION.SAVE_ADDRESS:
      case REGISTRATION_ACTION.SAVE_SELECTED_MODEL:
      case REGISTRATION_ACTION.UPDATE_SELECTION:
        return {
          type: actionName,
          data: parameter
        };
      case REGISTRATION_ACTION.REQUEST_CARS:
        return {
          type: REGISTRATION_ACTION.REQUEST_CARS,
          endPoint: constant.ENDPOINTS.cars,
          requestType: constant.GET
        };
      case REGISTRATION_ACTION.REQUEST_SAVE_USER:
        return {
          type: REGISTRATION_ACTION.REQUEST_SAVE_USER,
          endPoint: constant.ENDPOINTS.register,
          requestType: constant.POST
        };
      case REGISTRATION_ACTION.REQUEST_MODELS:
        return {
          type: REGISTRATION_ACTION.REQUEST_MODELS,
          endPoint: constant.ENDPOINTS.models,
          requestType: constant.GET
        };
      default:
        return {};
    }
  }
}

export function registrationAction(actionName, parameter) {
  return (dispatch) => {
    return (new Registration()).execute(dispatch, actionName, parameter);
  }
}