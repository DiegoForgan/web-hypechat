import React, { Component } from 'react';
import '../css/formulario-login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import TituloDeLaApp from './titulo';
import { Link } from 'react-router-dom';


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
        alert('Hubo un error!');
      });
    }

    handleChange(e) {
      this.setState({
          [e.target.name] : e.target.value
      });
    }

    render() { 
        return (
          <React.Fragment>
            <TituloDeLaApp/>
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
              <Button  tag={Link} to="/registro" className="btn-block mt-3" block size="lg" color="warning">Registrarse</Button>
            </Form>
          </React.Fragment>
          );
    }
}
 
export default FormularioLogin;