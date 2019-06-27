import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion'
import { ListGroup, ListGroupItem, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/organizaciones.css'
import ls from 'local-storage';

class Organizaciones extends Component {
    constructor(props){
        super(props);
        this.state = {
            organizaciones: [],
            orgaCandidata: '',
        }
        this.borrarOrganizacion = this.borrarOrganizacion.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/organizations/' + ls("email");
        axios.get(URL)
        .then((response) => {
            console.log(response);
            this.setState({organizaciones: response.data.organizations});
            console.log(this.state);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    borrarOrganizacion(){
        const URL = "https://secure-plateau-18239.herokuapp.com/organization"
        axios.delete(URL,{

        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    puedoBorrar(){
        /*var puede = false;
        this.state.organizaciones.forEach(organizacion => {
            if (organizacion.name === this.state.orgaCandidata) {
                puede = true;
            }
        });
        return puede;*/
        return false;
    }


    handleChange(e) {
        this.setState({
           [e.target.name] : e.target.value
       });
    }

    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <div className="organizaciones">
                    <div className="titulo-organizaciones">
                    <h1>Mis Organizaciones</h1>
                    <h3>A continuacion, se listan las organizaciones de las que formas parte:</h3>
                    </div>
                    {this.state.organizaciones.length === 0 ? (
                        <h3>No sos miembro de ninguna organizacion!</h3>
                    ) : (
                        <ListGroup>
                            {this.state.organizaciones.map(orga => (<ListGroupItem className="elementos" tag={Link} to={`/organizaciones/${orga.id}`} key={orga.id}> {orga.name}</ListGroupItem> ))}             
                        </ListGroup>
                    )}
                    <Button tag={Link} to={"/organizaciones/crearOrganizacion"} className="boton-crearCanal" block color="success">CREAR UNA ORGANIZACION</Button>
                    <InputGroup className="boton-crearCanal">
                    <Input name="orgaCandidata" type="text" placeholder="Ingrese la organizacion a eliminar..." onChange={this.handleChange} value={this.state.orgaCandidata}/>
                    <InputGroupAddon addonType="append">
                        <Button color="danger"  disabled={!this.puedoBorrar()} onClick={this.borrarOrganizacion}>¡¡¡BORRAR ORGANIZACION!!!</Button>
                    </InputGroupAddon>
                    </InputGroup>
                </div>
            </React.Fragment>
          );
    }
}
 
export default Organizaciones;