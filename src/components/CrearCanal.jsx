import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col, Container, Alert } from 'reactstrap';
import axios from 'axios';
import ls from 'local-storage';
import ModalApp from './modal-app';

/*
req.body.name
req.body.id   (id de la org)
req.body.description  (opatitvo)
req.body.owner
req.body.welcome  (optativo)
req.body.private (optativo, si es privado tiene que mandar un 1)
*/

class CrearCanal extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombreCanal: "",
            descripcion: "",
            msjBienvenida: "",
            esPrivado: false,
            alertMsj: "El canal será PUBLICO",
            alertColor: "primary",
            isOpen: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.crearCanal = this.crearCanal.bind(this);
        this.hacerPublico = this.hacerPublico.bind(this);
        this.hacerPrivado = this.hacerPrivado.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }


    handleChange(e) {
        this.setState({
           [e.target.name] : e.target.value
       });
    }

    puedeCrear(){
        return (this.state.nombreCanal.length >= 4) && (!this.state.nombreCanal.includes(" "));
    }

    esPublico(){
        return !this.state.esPrivado;
    }

    esPrivado(){
        return this.state.esPrivado;
    }

    hacerPrivado(){
        this.setState({
            esPrivado: true,
            alertMsj: "El canal será PRIVADO!",
            alertColor: "warning",
        });
    }

    hacerPublico(){
        this.setState({
            esPrivado: false,
            alertMsj: "El canal será PUBLICO",
            alertColor: "primary", 
        });
    }

    crearCanal(){
        console.log("vas a crear un canal con los siguientes datos:");
        console.log("nombre: "+this.state.nombreCanal);
        console.log("welcome: "+this.state.msjBienvenida);
        console.log("descripcion: "+this.state.descripcion);
        console.log(this.state);
        var privacidad = 0;
        if (this.state.esPrivado) {
            privacidad = 1;
        }
        const URL = "https://secure-plateau-18239.herokuapp.com/channel";
        axios.post(URL,{
            name: this.state.nombreCanal,
            id: ls("id_orga"),
            description: this.state.descripcion,
            owner: ls("email"),
            welcome: this.state.msjBienvenida,
            private: privacidad,
        })
        .then((response)=>{
            console.log(response);
            var id_orga = ls("id_orga");
            this.props.history.push('/organizaciones/'+ id_orga + '/canales');
        })
        .catch((error) =>{
            console.log(error);
            if (error.response.status === 405){
                this.toggleModal();
            }
        });
    }



    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }


    render() { 
        return ( 
            <React.Fragment>
            <BarraNavegacion/>
            <BarraOrganizaciones/>
            <ModalApp show={this.state.isOpen}
              onClose={this.toggleModal}
              titulo="Error CREACION DE CANAL!">
              El nombre del canal ingresado YA EXISTE!. Por favor elija otro e intente de nuevo.
            </ModalApp>
            <div className="organizacion-data"> 
                <h1>Crear un Canal</h1>
                <p>Complete la Informacion pedida a continuacion y presione el boton crear</p>
                <Form className="contenedor-formulario">
                    <FormGroup>
                        <Label className="font-weight-bold">Nombre Del Canal:</Label>
                        <Input name="nombreCanal" type="text" placeholder="Escriba un nombre para el canal..." value={this.state.nombreCanal} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Mensaje de Bienvenida del Canal:</Label>
                        <Input name="msjBienvenida" type="text" placeholder="Escriba el mensaje de Bienvenida del Canal..." value={this.state.msjBienvenida} onChange={this.handleChange}/>
                        <FormText className="sugerencias">Este campo es optativo!</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Descripcion Del Canal:</Label>
                        <Input type="textarea" name="descripcion" value={this.state.descripcion} onChange={this.handleChange}/>
                        <FormText className="sugerencias">Este campo es optativo!</FormText>
                    </FormGroup>
                    <div>
                    <Container>
                        <Row>
                            <Col>
                                <Button className="boton-crearCanal" block color="primary" disabled={!this.state.esPrivado} onClick={this.hacerPublico}>PUBLICO</Button>
                            </Col>
                            <Col>
                                <Button className="boton-crearCanal" block color="warning" disabled={this.state.esPrivado} onClick={this.hacerPrivado}>PRIVADO</Button>
                            </Col>
                        </Row>
                    </Container>
                    <Alert color={this.state.alertColor} className="boton-crearCanal">
                        {this.state.alertMsj}
                    </Alert>
                    </div>
                </Form>
            <Button className="boton-crearCanal" block color="success" disabled={!this.puedeCrear()} onClick={this.crearCanal}>CREAR</Button>
            </div>      
            </React.Fragment>
        );}
}
 
export default CrearCanal;