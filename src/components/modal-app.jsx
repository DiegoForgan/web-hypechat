import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
  }

  render() {
    return (
      
      <div>
          <Modal isOpen={this.props.show}>
            <ModalHeader>
              {this.props.titulo}
            </ModalHeader>
            <ModalBody>
              {this.props.children}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.props.onClose} block>Aceptar</Button>
            </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalApp;