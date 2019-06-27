import React, { Component } from 'react';
import ls from 'local-storage';
import axios from 'axios';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import '../css/organizacion.css';
import { ListGroup, ListGroupItem, Button, InputGroupAddon, Input, InputGroup} from 'reactstrap';
import { Link } from 'react-router-dom';

class Canales extends Component {
    constructor(props){
        super(props);
        this.state = {
            canales: [],
            canalCandidato: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.borrarCanal = this.borrarCanal.bind(this);
    }

    componentDidMount(){
        const URL = "https://secure-plateau-18239.herokuapp.com/channels/user";
        axios.post(URL, {
            token: ls("token"),
            id: ls("id_orga"),
            email: ls("email"),
        })
        .then((response) => {
            console.log(response);
            this.setState({canales: response.data.channel})
            console.log(this.state);
        })
          .catch((error) => {
            console.log(error);
        });
    }

    puedoBorrar(){
        return this.state.canales.includes(this.state.canalCandidato);
    }


    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    borrarCanal(){
        console.log("vas a borrar un canal");
        console.log(this.state);
        const URL = "https://secure-plateau-18239.herokuapp.com/channel/"+ls("token")+"/"+ls("id_orga")+"/"+ this.state.canalCandidato;
        axios.delete(URL)
        .then((response) => {
            console.log(response);
            this.setState({
                canales: response.data.channels,
                canalCandidato: "",
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() { 
        return (
            <React.Fragment>
            <BarraNavegacion/>
            <BarraOrganizaciones/>
            <div className="organizacion-data"> 
                <h1>Lista de Canales de la Organizacion</h1>
            
            {this.state.canales.length === 0 ? (
                <h3>No estas en ningun Canal!</h3>
            ) : (
                <ListGroup>
                    {this.state.canales.map((canal,index) => (<ListGroupItem className="elementos" tag={Link} to={`/organizaciones/${ls("id_orga")}/canales/${canal}`} key={index}> {canal}</ListGroupItem> ))}             
                </ListGroup>
            )}
            <Button tag={Link} to={`/organizaciones/${ls("id_orga")}/canales/crearCanal`} className="boton-crearCanal" block color="success" disabled={!ls("tengoPrivilegios")}>CREAR UN CANAL</Button>
            <InputGroup className="boton-crearCanal">
                <Input name="canalCandidato" type="text" placeholder="Ingrese el canal a eliminar..." onChange={this.handleChange} value={this.state.canalCandidato}/>
                <InputGroupAddon addonType="append">
                    <Button color="danger"  disabled={!this.puedoBorrar()} onClick={this.borrarCanal}>¡¡¡BORRAR CANAL!!!</Button>
                </InputGroupAddon>
            </InputGroup>
            </div>      
            </React.Fragment>
        );
    }
}
 
export default Canales;