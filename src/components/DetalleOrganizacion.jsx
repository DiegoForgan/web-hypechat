import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import ls from 'local-storage';
import axios from 'axios';
import '../css/organizacion.css';

class DetalleOrganizacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            duenios: [],
            moderadores: [],
            mensajeBienvenida: ''
        };
    }

    componentDidMount(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/organization/'+ls("token")+'/'+this.props.match.params.id_orga;
        ls("id_orga",this.props.match.params.id_orga);
        axios.get(URL)
        .then((response) => {
            console.log(response);
            this.setState({nombre: response.data.organization.name, duenios: response.data.organization.owner, moderadores: response.data.organization.moderators,
            mensajeBienvenida: response.data.organization.welcome});
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
                    <h1>{this.state.nombre}</h1>
                    <Container className="contenedor-de-datos">
                        <Row className="fila-datos">
                            <Col>
                                Propietario/s:
                            </Col>
                            <Col>
                            {this.state.duenios.map((duenio,index) =>(
                                <Row key={index}>
                                    {duenio}
                                </Row>   
                            ))}
                            </Col> 
                        </Row>
                        <Row className="fila-datos">
                            <Col>
                                Moderadores:
                            </Col>
                            <Col>
                            {this.state.moderadores.map((moderador,index) =>(
                                <Row key={index}>
                                    {moderador}
                                </Row>   
                            ))}
                            </Col> 
                        </Row>
                        <Row className="fila-datos">
                            <Col>
                                Mensaje de Bienvenida:
                            </Col>
                            <Col>
                                <Row>
                                {this.state.mensajeBienvenida}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
         );
    }
}
 
export default DetalleOrganizacion;