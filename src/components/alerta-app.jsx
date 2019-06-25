import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class AlertaApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
    render() { 
        return (
            <div>
                <Alert color={this.props.color} isOpen={this.props.show} transition={{in: true, timeout: 150}}>
                    {this.props.children}
                </Alert>
            </div>
          );
    }
}
 
export default AlertaApp;