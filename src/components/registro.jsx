import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import TituloDeLaApp from './titulo';
import '../css/formulario-registro.css';
import axios from 'axios';

class Registro extends Component {
    constructor(props){
        super(props);
        this.state = {
          email: '',
          psw: '',
          nombre: '',
          apodo: '',
          preg1: '',
          resp1: '',
          preg2: '',
          resp2: '',
          mostrarModal: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.registrar = this.registrar.bind(this);
      }

    registrar(){
      axios.post('https://secure-plateau-18239.herokuapp.com/signUp', {
        name: this.state.nombre,
        nickname: this.state.apodo,
        email: this.state.email,
        psw: this.state.psw,
        question1: this.state.preg1,
        question2: this.state.preg2,
        asw1: this.state.resp1,
        asw2: this.state.resp2
      })
      //Recordar que definiendo las funciones asi puedo usar el THIS.SETSTATE bien
      .then((response) => {
        console.log(response);
        console.log(this.state)
        alert("REGISTRO EXITOSO!");
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        console.log(this.state);
        alert('HUBO UN ERROR!');
      });
    }

    handleChange(e) {
       this.setState({
          [e.target.name] : e.target.value
      });
    }

    formularioValido(){
        return this.state.email.length > 0 && this.state.psw.length >= 8 && this.state.apodo.length > 0 && this.state.nombre.length >0 && this.state.preg1.length > 0
        && this.state.preg2.length > 0 && this.state.resp1.length > 0 && this.state.resp2.length > 0;
    }

    render() { 
        return (
            <React.Fragment>
                <TituloDeLaApp/>
                <Form className="formulario-registro">
                    <FormGroup>
                        <Label className="font-weight-bold">Email</Label>
                        <Input name="email" type="email" placeholder="Escriba un email valido..." value={this.state.email} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Contraseña</Label>
                        <Input name="psw" type="password" placeholder="Ingrese una contraseña..." value={this.state.psw} onChange={this.handleChange}/>
                        <FormText>La contraseña debe tener un minimo de 8 caracteres!</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Nombre</Label>
                        <Input name="nombre" type="text" placeholder="Escriba su nombre..." value={this.state.nombre} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Apodo</Label>
                        <Input name="apodo" type="text" placeholder="Escriba su apodo..." value={this.state.apodo} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Pregunta secreta nro 1</Label>
                        <Input name="preg1" type="text" placeholder="Escriba una pregunta secreta..." value={this.state.preg1} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Respuesta</Label>
                        <Input name="resp1" type="text" placeholder="Escriba la respuesta..." value={this.state.resp1} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Pregunta secreta nro 2</Label>
                        <Input name="preg2" type="text" placeholder="Escriba una pregunta secreta..." value={this.state.preg2} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Respuesta</Label>
                        <Input name="resp2" type="text" placeholder="Escriba la respuesta..." value={this.state.resp2} onChange={this.handleChange}/>
                        <FormText className="font-weight-bold">RECUERDE AMBAS RESPUESTAS YA QUE SERVIRAN PARA REESTABLECER SU CONTRASEÑA</FormText>
                    </FormGroup>
                    <Button className="btn-block mt-3" block size="lg" color="warning" onClick={this.registrar} disabled={!this.formularioValido()}>Registrarse</Button>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Registro;