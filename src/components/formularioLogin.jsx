import React, { Component } from 'react';
import '../css/formulario-login.css'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';


class FormularioLogin extends Component {

    constructor(props){
      super(props);
      this.state = {
        email: '',
        psw: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.loguearse = this.loguearse.bind(this);
    }

    loguearse(){
      axios.post('https://secure-plateau-18239.herokuapp.com/login', {
        email: this.state.email,
        psw: this.state.psw
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        alert(error);
      });
    }

    handleChange(e) {
      this.setState({
          [e.target.name] : e.target.value
      });
    }

    render() { 
        return (
          <Form className="formulario-login"> 
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
            <Button className="btn-block mt-3" block size="lg" color="success" onClick={this.loguearse}>Ingresar</Button>
            <Button block size="lg" color="warning">Registrarse</Button>
          </Form>
          );
    }
}
 
export default FormularioLogin;