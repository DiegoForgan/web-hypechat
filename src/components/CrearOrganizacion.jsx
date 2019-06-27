import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import Axios from 'axios';
import ls from 'local-storage';









class CrearOrganizacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombreOrganizacion: "",
            pswOrganizacion: "",
            idOrganizacion: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.crearOrganizacion = this.crearOrganizacion.bind(this);
    }
    
    handleChange(e) {
        this.setState({
           [e.target.name] : e.target.value
       });
       console.log(this.state);
    }

    crearOrganizacion(){
        const URL = "https://secure-plateau-18239.herokuapp.com/organization";
        Axios.post(URL,{
            id: this.state.idOrganizacion,
            email: ls("email"),
            psw: this.state.pswOrganizacion,
            name: this.state.nombreOrganizacion,
        })
        .then((response) => {
            console.log(response);
            this.props.history.push('/organizaciones');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    puedeCrear(){
        if ((/\s/.test(this.state.nombreOrganizacion)) || (this.state.pswOrganizacion.length < 8) || (/\s/.test(this.state.idOrganizacion))) {
           return false;
        }
        else{
            return true;
        }
    }
    
    render() { 
        return ( 
           <React.Fragment>
                <BarraNavegacion/>
                <BarraOrganizaciones/>
                <div className="organizacion-data">
                    <h1>Crear una Organizacion</h1>
                    <p>Complete los campos a continuacion para crear una nueva organizacion</p>
                <Form className="contenedor-formulario">
                <FormGroup>
                        <Label className="font-weight-bold">Nombre De La Organizacion:</Label>
                        <Input name="nombreOrganizacion" type="text" placeholder="Escriba un nombre para la organizacion..." value={this.state.nombreOrganizacion} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                        <Label className="font-weight-bold">ID De La organizacion:</Label>
                        <Input name="idOrganizacion" type="text" placeholder="Escriba un ID para la organizacion..." value={this.state.idOrganizacion} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                        <Label className="font-weight-bold">Contraseña De La Organizacion:</Label>
                        <Input name="pswOrganizacion" type="password" placeholder="Escriba una contraseña para la organizacion..." value={this.state.pswOrganizacion} onChange={this.handleChange}/>
                </FormGroup>
                </Form>
                <Button className="boton-crearCanal" block color="success" disabled={!this.puedeCrear()} onClick={this.crearOrganizacion}>CREAR ORGANIZACION</Button>
                </div>
            </React.Fragment>
         );
    }
}
 
export default CrearOrganizacion;