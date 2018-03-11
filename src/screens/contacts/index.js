/**
 * Created by Tega on 11/03/2018.
 */

import React from 'react';
import 'css/App.css';
import {Icon, List, Header, Search} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Contact from 'components/contact'
import {CONTACT_ACTION} from 'stateManager/actions/actionTypes'
import * as contactAction from 'stateManager/actions/contact.action';
import _ from 'lodash'

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      contact: null,
      loading: false,
      isLoadingSearch: false,
      searchValue: '',
      results: []
    }
  }

  componentDidMount() {
    //request list of contacts
    this.props.contactAction(CONTACT_ACTION.REQUEST_CONTACTS, {query: '{contacts{firstname, lastname, contactId, address}}'}).then(response => {
      this.setState({contacts: this.props.contactReducer.contacts});

      if (typeof this.props.match.params.id !== 'undefined') {
        this.showContact(this.props.match.params.id);
      }
    })
  }

  /**
   * @param {int} id
   */
  showContact(id) {
    this.props.contactAction(CONTACT_ACTION.REQUEST_CONTACT, {query: '{contact(id: ' + id + '){firstname, lastname, contactId, phone, email, address}}'}).then(() => {
      if (this.props.contactReducer.error === true) {
        this.props.history.push('/error');
      } else {
        this.setState({contact: this.props.contactReducer.contact})
      }
    })
  }

  resetComponent() {
    this.setState({
      isLoadingSearch: false,
      results: [],
      searchValue: '',
    })
  }

  render() {
    return (
      <div style={{padding: 80, flexDirection: 'row', display: 'flex'}}>
        <div className="contact-list-wrapper">
          <Header>All Contacts</Header>
          <div>
            <Search
              placeholder="Search contact.."
              loading={this.state.isLoadingSearch}
              onResultSelect={(e, { result }) => {
                  this.setState({searchValue: result.firstname +' '+ result.lastname})
                  this.showContact(result.contactId);
              }}
              onSearchChange={(e, { value }) => {
                this.setState({isLoadingSearch: true, searchValue: value})
                setTimeout(() => {
                  if (this.state.searchValue.length < 1) return this.resetComponent()
                    const re = new RegExp(_.escapeRegExp(value), 'gi');
                    const isMatch =  (result) => {
                    return re.test(result.firstname+ ' ' + result.lastname)}
                    this.setState({
                      isLoadingSearch: false,
                      results: _.filter(this.state.contacts, isMatch),
                    })
               }, 500)
              }}
              results={this.state.results}
              value={this.state.searchValue}
              resultRenderer={(object) => {
                return (
                <div style={{display:'flex', flexDirection: 'row'}} key={object.contactId}>
                    <div>
                        <span style={{fontWeight: 'bold'}}>
                       {object.firstname +' '+object.lastname}
                       </span>
                        <br/>
                       <p style={{fontSize: 12, fontWeight: '500', color: '#908b8b'}}> {object.address} </p>
                    </div>
                </div>)
              }}
            />
          </div>
          <List animated verticalAlign='middle'>
            {this.state.contacts.map((item, index) => {
              return (
                <List.Item className="contact-list" key={index} onClick={() =>
                 this.setState({searchValue: ''}, () => {
                  this.showContact(item.contactId)
                 })}
                >
                  <Icon name="user" className="contact-icon"/>
                  <List.Content>
                    <List.Header as='a'>{item.firstname + ' ' + item.lastname}</List.Header>
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
        </div>
        <div style={{width: '60%'}}>
          <Contact data={this.state.contact}/>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(contactAction, dispatch)
}

function mapStateToProps(state) {
  return {
    contactReducer: state.contactReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
