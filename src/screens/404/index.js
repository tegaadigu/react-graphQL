/**
 * Created by Tega on 11/03/2018.
 */

import React from 'react';
import {Segment, Header, Button, Icon} from 'semantic-ui-react';

export default class NotFound extends React.Component {
  render() {
    return (
      <div style={{width: '50%', paddingTop: '40', margin: '0 auto'}}>
        <div style={{marginTop: 80}}>
          <Segment textAlign={'center'}>
            <Header>
              ERROR 404
            </Header>
            <Icon name="warning sign" size={'huge'} color={'teal'}/>
            <p style={{marginTop: 20}}>
              404. the page / contact you're looking for does not exist..
            </p>
            <div style={{marginTop: 40}}>
              <Button onClick={() => this.props.history.push('/')}>Home Page</Button>
            </div>
          </Segment>
        </div>
      </div>
    )
  }
}