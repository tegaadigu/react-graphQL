import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from 'stateManager/store';
import {Contacts, NotFound} from 'screens';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Contacts}/>
              <Route path="/contact/:id" component={Contacts} />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;