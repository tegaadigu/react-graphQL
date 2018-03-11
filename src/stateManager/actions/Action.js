/**
 * Created by tegaadigu on 11/03/2018.
 */

import Api from 'ApiManager/Api';

export default class Action {
  /**
   * @param dispatch
   * @param actionName
   * @param parameter
   * @returns {*}
   */
  execute(dispatch, actionName, parameter) {
    let resolvedAction = this.resolveAction(actionName, parameter);
    if (typeof resolvedAction.endPoint !== 'undefined') {
      let api = new Api();
      return api.request(resolvedAction.requestType, resolvedAction.endPoint, parameter).then(response => {
        return Promise.resolve(dispatch(this.resolveAction(this._processResponse(actionName, (typeof response.errors === 'undefined')), response.data)))
      });
    } else {
      return Promise.resolve(dispatch(resolvedAction));
    }
  }

  _processResponse(actionName, responseOk) {
    return ('response_' + actionName + (responseOk ? '_success' : '_fail')).toUpperCase();
  }

  /**
   * @param actionName
   * @param parameter
   * @returns {{type: string, data: *}}
   */
  resolveAction(actionName, parameter) {
    return {
      type: 'fake',
      data: parameter
    }
  }
}