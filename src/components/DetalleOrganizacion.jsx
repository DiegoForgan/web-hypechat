import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import ls from 'local-storage';
import axios from 'axios';
import '../css/organizacion.css'

class DetalleOrganizacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre: ''
        };
    }

    componentDidMount(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/organization/'+ls("token")+'/'+this.props.match.params.id_orga;
        ls("id_orga",this.props.match.params.id_orga);
        console.log(URL);
        axios.get(URL)
        .then((response) => {
            console.log(response);
            this.setState({nombre: response.data.organization.name});
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
                    <Container>
                        <Row>
                            <Col>
                                Example text
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
         );
    }
}
 
export default DetalleOrganizacion;