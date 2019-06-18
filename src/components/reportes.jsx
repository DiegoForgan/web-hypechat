import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import {Card, CardBody, CardImg, Button, CardTitle, CardText, CardGroup} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/reportes.css'




class Reportes extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <div className="pantallaReportes">
                <h1 className="titulo-reportes">ELIJA EL REPORTE QUE DESEA VER:</h1>
                <CardGroup>
                <Card className="tarj">
                    <CardImg className="imagen" src={require('../img/usuarios.png')} alt="organizaciones imagen" />
                    <CardBody>
                        <CardTitle className="titulo">Usuarios Registrados</CardTitle>
                        <CardText className="descrip">Permite ver los usuarios que estan registrados en el sistema.</CardText>
                        <Button tag={Link} to="/notfound" block color="warning">Ver usuarios registrados</Button>
                    </CardBody>
                </Card>
                <Card className="tarj">
                    <CardImg className="imagen" src={require('../img/mensajes.png')} alt="perfil imagen" />
                    <CardBody>
                        <CardTitle className="titulo">Mensajes Enviados</CardTitle>
                        <CardText className="descrip">Permite ver la cantidad de mensajes que fueron enviados en el sistema.</CardText>
                        <Button tag={Link} to="/notfound" block color="warning">Ir Mensajes Enviados</Button>
                    </CardBody>
                </Card>
                </CardGroup>
                </div>
            </React.Fragment>
          );
    }
}
 
export default Reportes;