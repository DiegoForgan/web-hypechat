import React, { Component } from 'react';
import ls from 'local-storage';
import axios from 'axios';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import '../css/organizacion.css';
import { ListGroup, ListGroupItem, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

class Canales extends Component {
    constructor(props){
        super(props);
        this.state = {
            canales: []
        };
    }

    componentDidMount(){
        const URL = "https://secure-plateau-18239.herokuapp.com/channels/user";
        axios.post(URL, {
            token: ls("token"),
            id: ls("id_orga"),
            email: ls("email")
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
            <Button tag={Link} to={`/organizaciones/${ls("id_orga")}/canales/crearCanal`} className="boton-crearCanal" block color="success">CREAR UN CANAL</Button>
            </div>      
            </React.Fragment>
        );
    }
}
 
export default Canales;