import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion'
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/organizaciones.css'

class Organizaciones extends Component {
    constructor(props){
        super(props);
        this.state = {
            organizaciones: []
        }
    }

    componentDidMount(){
        axios.get('https://secure-plateau-18239.herokuapp.com/organizations/test@1.com')
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
                    <h1>Mis Organizaciones</h1>
                    <h3>A continuacion, se listan las organizaciones de las que formas parte...</h3>
                    <ListGroup>
                        {this.state.organizaciones.map(orga => (<ListGroupItem className="elementos" tag={Link} to="/404" key={orga.id}> {orga.name}</ListGroupItem> ))}             
                    </ListGroup>
                </div>
            </React.Fragment>
          );
    }
}
 
export default Organizaciones;