import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalErrorLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Error de Login</ModalHeader>
          <ModalBody>
            El usuario ingresado o la contraseña son incorrectos!. Por favor intente nuevamente.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Aceptar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalErrorLogin;