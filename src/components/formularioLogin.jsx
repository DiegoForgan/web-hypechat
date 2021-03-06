import React, { Component } from 'react';
import '../css/formulario-login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import TituloDeLaApp from './titulo';
import { Link } from 'react-router-dom';
import ModalApp from './modal-app';
import ls from 'local-storage';


class FormularioLogin extends Component {

    constructor(props){
      super(props);
      this.state = {
        email: '',
        psw: '',
        isOpen: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.loguearse = this.loguearse.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
    }

    loguearse(){
      axios.post('https://secure-plateau-18239.herokuapp.com/login', {
        email: this.state.email,
        psw: this.state.psw
      })
      //Recordar que definiendo las funciones asi puedo usar el THIS.SETSTATE bien
      .then((response) => {
        this.gardarDatosDeUsuario(response.data);
        this.props.history.push('/home');
      })
      .catch((error) => {
        console.log(error);
        this.toggleModal();
      });
    }

    gardarDatosDeUsuario(data){
      ls("psw",this.state.psw);
      ls("email",data.email);
      ls("nombre",data.name);
      ls("apodo",data.nickname);
      ls("token",data.token);
      ls("foto_perfil",data.photo);
    }

    handleChange(e) {
      this.setState({
          [e.target.name] : e.target.value
      });
    }

    fomularioValido(){
      return this.state.email.length > 0 && this.state.psw.length >= 8;
    }


    toggleModal = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    render() { 
        return (
          <React.Fragment>
            <TituloDeLaApp/>
            <div className="formulario-login">
            <ModalApp show={this.state.isOpen}
              onClose={this.toggleModal}
              titulo="Error de Login">
              El usuario ingresado o la contraseña son incorrectos!. Por favor intente nuevamente.
            </ModalApp>
            <Form className="contenedor-formulario" onSubmit={this.loguearse}> 
              <FormGroup>
                <Label className="font-weight-bold">Email</Label>
                <Input name="email" type="email" value={this.state.email}  
                placeholder="Ingrese su email..." 
                onChange={this.handleChange}></Input>
              </FormGroup>
              <FormGroup>
                <Label className="font-weight-bold">Contraseña</Label>
                <Input name="psw" type="password" value={this.state.psw}
                placeholder="Ingrese su contraseña..."
                onChange={this.handleChange}></Input>
              </FormGroup>
              <Button className="btn-block mt-3" block size="lg" color="success" onClick={this.loguearse} disabled={!this.fomularioValido()}>INGRESAR</Button>
              <Button  tag={Link} to="/registro" className="btn-block mt-3" block size="lg" color="warning">REGISTRO</Button>
            </Form>
            </div>
          </React.Fragment>
          );
    }
}
 
export default FormularioLogin;