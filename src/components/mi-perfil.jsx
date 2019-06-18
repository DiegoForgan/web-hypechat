import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import '../css/contenedor-perfil.css';
import { Form, Button, Label, Input, FormGroup } from 'reactstrap';
import axios from 'axios';
import ls from 'local-storage';

class MiPerfil extends Component {
    constructor(props){
        super(props);
        this.state = {
          email: ls("email"),
          psw: '',
          nombre: ls("nombre"),
          apodo: ls("apodo"),
          foto_perfil: 'https://res.cloudinary.com/teepublic/image/private/s--VJddS-WL--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1455956068/production/designs/425835_1.jpg',
        };
        this.handleChange = this.handleChange.bind(this);
        this.modificarPerfil = this.modificarPerfil.bind(this);
      }

    handleChange(e) {
       this.setState({
           [e.target.name] : e.target.value
       });
    }

    modificarPerfil(){
      const URL = "https://secure-plateau-18239.herokuapp.com/profile";
      axios.put(URL,{
        token: ls("token"),
        name: this.state.nombre,
        nickname: this.state.apodo,
        email: this.state.email
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          ls("email", this.state.email);
          ls("nombre", this.state.nombre);
          ls("apodo", this.state.apodo);
        }
      }).catch((error) => {
        console.log(error);
      });
    }

    componentDidMount() {
        // Load async data.
        // Update state with new data.
        // Re-render our component.
        const URL = 'https://secure-plateau-18239.herokuapp.com/profile/' + this.state.email;
        axios.post(URL, {
            token: ls("token")
      })
      //Recordar que definiendo las funciones asi puedo usar el THIS.SETSTATE bien
      .then((response) => {
        this.updateDatosPerfil(response);
      })
      .catch((error) => {
        console.log(error);
        console.log(this.state);
      });
    }

  updateDatosPerfil(response) {
    this.setState({ email: response.data.email, nombre: response.data.name, apodo: response.data.nickname });
    ls("email", response.data.email);
    ls("nombre", response.data.name);
    ls("apodo", response.data.nickname);
  }

    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <div className="contenedor-perfil">
                <h1>TUS DATOS SON:</h1>
                <img src={this.state.foto_perfil} alt="PROFILE PIC" className="center"></img>
                <Form className="contenedor-formulario">
                  <FormGroup>
                    <Label className="font-weight-bold">Nombre</Label>
                    <Input type="text" name="nombre" value={this.state.nombre} onChange={this.handleChange}></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label className="font-weight-bold">Apodo</Label>
                    <Input type="text" name="apodo" value={this.state.apodo} onChange={this.handleChange}></Input>
                  </FormGroup>
                  <Label className="font-weight-bold"> Email </Label>
                  <h3> {this.state.email} </h3>
                  <Button className="btn-block mt-3" block size="lg" color="success" onClick={this.modificarPerfil}>Modificar Perfil</Button>
                </Form>
                </div>
            </React.Fragment>
          );
    }
}
 
export default MiPerfil;