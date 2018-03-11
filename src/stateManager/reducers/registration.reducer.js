/**
 * Created by Tega on 24/02/2018.
 */

import {REGISTRATION_ACTION} from 'stateManager/actions/actionTypes'

var defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  loading: false,
  selectedCar: 0,
  selectedModel: 0,
  cars: [],
  models: [],
  selections: []
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'persist/REHYDRATE':
      let payload = {};
      if (typeof action.payload !== 'undefined') {
        payload = action.payload.registrationReducer;
      }
      return {
        ...state,
        ...payload
      };
    case REGISTRATION_ACTION.SAVE_CREDENTIALS:
      return {
        ...state,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        email: action.data.email,
        phone: action.data.phone,
        password: action.data.password
      };
    case REGISTRATION_ACTION.REQUEST_CARS:
    case REGISTRATION_ACTION.REQUEST_SAVE_USER:
      return {
        ...state,
        loading: true
      };
    case REGISTRATION_ACTION.RESPONSE_SAVE_USER_SUCCESS:
      console.log('yaay user saved', action);
      return {
        ...state,
        loading: false
      };
    case REGISTRATION_ACTION.RESPONSE_CARS_SUCCESS:
      return {
        ...state,
        loading: false,
        cars: action.data.cars
      };
    case REGISTRATION_ACTION.RESPONSE_MODELS_SUCCESS:
      return {
        ...state,
        loading: false,
        models: action.data.models
      };
    case REGISTRATION_ACTION.SAVE_SELECTED_CAR:
      return {
        ...state,
        selectedCar: action.data.selectedCar
      };
    case REGISTRATION_ACTION.SAVE_SELECTED_MODEL:
      var selections = state.selections.length > 0 ? state.selections : [];
      selections.push({
        'car': state.selectedCar,
        'model': action.data.selectedModel,
        'modelName': action.data.name,
        'carName': action.data.carName,
        'imageLink': action.data.imageLink
      })
      return {
        ...state,
        selectedModel: action.data.selectedModel,
        selections: selections
      };
    case REGISTRATION_ACTION.UPDATE_SELECTION:
      return {
        ...state,
        selections: action.data.selections
      }
    case REGISTRATION_ACTION.SAVE_VEHICLE_INFORMATION:
      return {
        ...state
      }
    default:
      return {
        ...state
      }
  }
}