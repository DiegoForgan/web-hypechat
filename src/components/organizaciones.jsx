import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion'
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/organizaciones.css'
import ls from 'local-storage';

class Organizaciones extends Component {
    constructor(props){
        super(props);
        this.state = {
            organizaciones: []
        }
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
                    <ListGroup>
                        {this.state.organizaciones.map(orga => (<ListGroupItem className="elementos" tag={Link} to={`/organizaciones/${orga.id}`} key={orga.id}> {orga.name}</ListGroupItem> ))}             
                    </ListGroup>
                </div>
            </React.Fragment>
          );
    }
}
 
export default Organizaciones;