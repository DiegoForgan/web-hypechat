import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import '../css/contenedor-perfil.css';
import { Form, Button, Label, Input, FormGroup } from 'reactstrap';
import axios from 'axios';

class MiPerfil extends Component {
    constructor(props){
        super(props);
        this.state = {
          email: 'email@example.com',
          psw: '',
          nombre: '',
          apodo: '',
          foto_perfil: 'https://res.cloudinary.com/teepublic/image/private/s--VJddS-WL--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1455956068/production/designs/425835_1.jpg'
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

    }

    componentDidMount() {
        // Load async data.
        // Update state with new data.
        // Re-render our component.
        axios.post('https://secure-plateau-18239.herokuapp.com/profile/ironman@marvel.com', {
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZDA2ZjczNmRlNzQwODAwMTcxZDZiMWIifQ.4dqz6Lk4b9oK36LL4nYmuWBHKvhmf2b5RjbYtFl4N88"
      })
      //Recordar que definiendo las funciones asi puedo usar el THIS.SETSTATE bien
      .then((response) => {
        console.log(response);
        console.log(this.state);
        this.setState({email: response.data.email, nombre: response.data.name, apodo: response.data.nickname});
        
      })
      .catch((error) => {
        console.log(error);
        console.log(this.state);
      });
    }

    componentDidUpdate(){

    }

    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <div className="contenedor-perfil">
                <img src={this.state.foto_perfil} alt="PROFILE PIC" className="center"></img>
                <Form>
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
                </Form>
                <Button className="btn-block mt-3" block size="lg" color="success">Modificar Perfil</Button>
                </div>
            </React.Fragment>
          );
    }
}
 
export default MiPerfil;