/**
 * Created by Tega on 11/03/2018.
 */
import Action from './Action'
import {CONTACT_ACTION} from 'stateManager/actions/actionTypes'
import * as constant from 'helper/constants'

class Contact extends Action {
  /**
   * @param actionName
   * @param parameter
   * @returns {*}
   */
  resolveAction(actionName, parameter) {
    switch (actionName) {
      case CONTACT_ACTION.REQUEST_CONTACTS:
        return {
          type: CONTACT_ACTION.REQUEST_CONTACTS,
          endPoint: constant.ENDPOINTS.contact,
          requestType: constant.GET
        };
      case CONTACT_ACTION.REQUEST_CONTACT:
        return {
          type: CONTACT_ACTION.REQUEST_CONTACT,
          endPoint: constant.ENDPOINTS.contact,
          requestType: constant.GET
        };
      case CONTACT_ACTION.RESPONSE_CONTACTS_SUCCESS:
      case CONTACT_ACTION.RESPONSE_CONTACT_SUCCESS:
      case CONTACT_ACTION.RESPONSE_CONTACT_FAIL:
        return {
          type: actionName,
          data: parameter
        };
      default:
        return {};
    }
  }
}

export function contactAction(actionName, parameter) {
  return (dispatch) => {
    return (new Contact()).execute(dispatch, actionName, parameter);
  }
}