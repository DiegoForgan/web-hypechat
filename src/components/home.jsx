import React, { Component } from 'react';
import  BarraNavegcion  from "./barra-navegacion";
import '../css/pantalla-bienvenida.css';
import {Card, CardBody, CardImg, Button, CardTitle, CardText, CardGroup} from 'reactstrap';
import {Link} from 'react-router-dom';

class Home extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <BarraNavegcion/>
                <div className="pantallaBienvenida">
                <h1>Bienvenido al BackOffice de Hypechat</h1>
                <h2>Opciones Disponibles:</h2>
                <div>
                <CardGroup>
                <Card className="tarjeta">
                    <CardImg top className="imagenes" src={require('../img/organizacion.png')} alt="organizaciones imagen" />
                    <CardBody>
                        <CardTitle className="titulos">Mis Organizaciones</CardTitle>
                        <CardText className="descripcion">Permite ver un listado de sus organizaciones para poder gestionar sus equipos.</CardText>
                        <Button tag={Link} to="/organizaciones" block>Ir a Mis Organizaciones</Button>
                    </CardBody>
                </Card>
                <Card className="tarjeta">
                    <CardImg top className="imagenes" src={require('../img/perfil.png')} alt="perfil imagen" />
                    <CardBody>
                        <CardTitle className="titulos">Mi Perfil</CardTitle>
                        <CardText className="descripcion">Permite ver sus datos personales en la plataforma y modificarlos.</CardText>
                        <Button tag={Link} to="/miperfil" block>Ir a Mi Perfil</Button>
                    </CardBody>
                </Card>
                <Card className="tarjeta">
                    <CardImg top className="imagenes" src={require('../img/reportes.png')} alt="reportes imagen" />
                    <CardBody>
                        <CardTitle className="titulos">Reportes</CardTitle>
                        <CardText className="descripcion">Permite ver reportes de la plataforma.</CardText>
                        <Button tag={Link} to="/reportes" block>Ir a Reportes</Button>
                    </CardBody>
                </Card>
                </CardGroup>
                </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Home;