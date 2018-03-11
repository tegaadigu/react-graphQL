/**
 * Created by Tega on 11/03/2018.
 */
import React from 'react'
import {Segment, Header, Button} from 'semantic-ui-react';
import 'css/App.css';
export default class Contact extends React.Component {

  displayContact = () => {
    let items = []
    var counter = 0;
    for (var index in this.props.data) {
      if (['firstname', 'lastname', 'contactId'].indexOf(index) >= 0) {
        continue;
      }
      items.push(
        <div key={counter++} style={{padding: 8}}>
          <span style={{marginRight:10}}>{index}:</span>
          <span>{this.props.data[index]}</span>
        </div>)
    }

    return items;
  }

  render() {
    let currentUrl = window.location.origin+'/';
    return (
      <div className="contact-wrapper">
        <Segment>
          {this.props.data === null ? <div>Click on a contact to the left..</div> :
            <div>
              <div style={{float:'right'}}>
                  <Button>Edit</Button>
              </div>
              <Header>{this.props.data.firstname + ' ' + this.props.data.lastname}</Header>
              {this.displayContact()}
              <div style={{padding: 8}}>
                contact Link: <a href={currentUrl+'contact/'+this.props.data.contactId}>{currentUrl+'contact/'+this.props.data.contactId}</a>
              </div>
            </div>
          }
        </Segment>
      </div>
    )
  }
}