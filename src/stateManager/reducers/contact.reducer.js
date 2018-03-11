/**
 * Created by Tega on 11/03/2018.
 */

import {CONTACT_ACTION} from 'stateManager/actions/actionTypes'

var defaultState = {
  contacts: [],
  contact: null,
  loading: false,
  error: false
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case CONTACT_ACTION.REQUEST_CONTACTS:
    case CONTACT_ACTION.REQUEST_CONTACT:
      return {
        ...state,
        loading: true
      };
    case CONTACT_ACTION.RESPONSE_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.data.contacts,
        loading: false,
        error: false
      };
    case CONTACT_ACTION.RESPONSE_CONTACT_SUCCESS:
      return {
        ...state,
        contact: action.data.contact[0],
        loading: false,
        error: false
      };
    case CONTACT_ACTION.RESPONSE_CONTACT_FAIL:
      return {
        ...state,
        error: true
      };
    default:
      return {
        ...state
      }
  }
}