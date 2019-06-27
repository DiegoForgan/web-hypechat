import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import axios from 'axios';
import ls from 'local-storage';
import { Badge, Form, FormGroup, Label, Input, InputGroupAddon, Button, Container, Row, Col, Table, InputGroup } from 'reactstrap';
import AlertApp from './alerta-app';

class DetalleCanal extends Component {
    constructor(props){
        super(props);
        this.state = {
            badgeColor: "success",
            privacidad: "",
            miembros: [],
            msjBienvenida: "",
            descripcion: "",
            nombre: "",
            colorAlerta: "success",
            mensajeAlerta: "El usuario se agrego correctamente!",
            mostrarAlerta: false,
            miembroCandidato: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.cambiarBienvenida = this.cambiarBienvenida.bind(this);
        this.hacerCanalPublico = this.hacerCanalPublico.bind(this);
        this.hacerCanalPrivado = this.hacerCanalPrivado.bind(this);
        this.cambiarDescripcion = this.cambiarDescripcion.bind(this);
        this.setearPrivacidad = this.setearPrivacidad.bind(this);
        this.invitarMiembro = this.invitarMiembro.bind(this);
        this.eliminarMiembro = this.eliminarMiembro.bind(this);
    }


    componentDidMount(){
        const URL = "https://secure-plateau-18239.herokuapp.com/channel/"+ls("token")+"/"+ls("id_orga")+"/"+this.props.match.params.id_canal;
        axios.get(URL)
        .then((response) => {
            var privacidad_txt = "PRIVADO"
            var datos_canal  = response.data.channel;
            if (!datos_canal.private) {
                privacidad_txt = "PUBLICO"
                //Los miembros son los mismos de la organizacion por ser publico
                axios.get('https://secure-plateau-18239.herokuapp.com/organization/'+ls("token")+'/'+ls("id_orga"),{})
                .then((response) => {
                    console.log(response);
                    this.setState({ 
                        privacidad: privacidad_txt,
                        descripcion: datos_canal.description,
                        msjBienvenida: datos_canal.welcome,
                        nombre: datos_canal.name,
                        miembros: response.data.organization.members,
                     });
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else{
                this.setState({ 
                    privacidad: privacidad_txt,
                    descripcion: datos_canal.description,
                    msjBienvenida: datos_canal.welcome,
                    nombre: datos_canal.name,
                    miembros: datos_canal.members,
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }


    handleChange(e) {
        this.setState({
           [e.target.name] : e.target.value
       });
    }

    cambiarBienvenida(){
        const URL = "https://secure-plateau-18239.herokuapp.com/welcomeChannel"
        axios.put(URL,{
            token: ls("token"),
            organizationID: ls("id_orga"),
            name: this.state.nombre,
            welcome: this.state.msjBienvenida,
        })
        .then((response) => {
            console.log(response);
            axios.get(URL+"/"+ls("token")+"/"+ls("id_orga")+"/"+this.state.nombre)
            .then((response) => {
                console.log(response);
                this.setState({
                    msjBienvenida: response.data.welcome,
                });
                this.configAlertParams("success","El mensaje de Bienvenida se Actualizo correctamente");
                this.onShowAlert();
            })
            .catch((error) => {
                console.log(error); 
             });
        })
        .catch((error) => {
           console.log(error); 
        });
    }

    cambiarDescripcion(){
        const URL = "https://secure-plateau-18239.herokuapp.com/description"
        axios.put(URL,{
            token: ls("token"),
            organizationID: ls("id_orga"),
            name: this.state.nombre,
            description: this.state.descripcion,
        })
        .then((response) => {
            console.log(response);
            axios.get(URL+"/"+ls("token")+"/"+ls("id_orga")+"/"+this.state.nombre)
            .then((response) => {
                console.log(response);
                this.setState({
                    descripcion: response.data.description,
                });
                this.configAlertParams("success","La descripcion se cambio correctamente!");
                this.onShowAlert();
            })
            .catch((error) => {
                console.log(error); 
             });
        })
        .catch((error) => {
           console.log(error); 
        });
    }

    setearPrivacidad(privado){
        if (privado) {
            this.setState({
                privacidad: "PRIVADO",
            });
        }else{
            this.setState({
                privacidad: "PUBLICO",
            });
        }
        this.configAlertParams("success","La privacidad se cambio correctamente!");
        this.onShowAlert();
    }

    hacerCanalPublico(){
        const URL = "https://secure-plateau-18239.herokuapp.com/privateChannel"
        axios.put(URL,{
            token: ls("token"),
            organizationID: ls("id_orga"),
            name: this.state.nombre,
            private: 0,
        })
        .then((response) => {
            console.log(response);
            axios.get(URL+"/"+ls("token")+"/"+ls("id_orga")+"/"+this.state.nombre)
            .then((response) => {
                console.log(response);
                this.setearPrivacidad(response.data.private);
            })
            .catch((error) => {
                console.log(error); 
             });
        })
        .catch((error) => {
           console.log(error); 
        });
    }

    hacerCanalPrivado(){
        const URL = "https://secure-plateau-18239.herokuapp.com/privateChannel"
        axios.put(URL,{
            token: ls("token"),
            organizationID: ls("id_orga"),
            name: this.state.nombre,
            private: 1,
        })
        .then((response) => {
            console.log(response);
            axios.get(URL+"/"+ls("token")+"/"+ls("id_orga")+"/"+this.state.nombre)
            .then((response) => {
                console.log(response);
                this.setearPrivacidad(response.data.private);
            })
            .catch((error) => {
                console.log(error); 
             });
        })
        .catch((error) => {
           console.log(error); 
        });
    }


    configAlertParams = (color,mensaje)=>{
        this.setState({colorAlerta: color, mensajeAlerta: mensaje});
    }


    onShowAlert = ()=>{
        this.setState({mostrarAlerta:true},()=>{
          window.setTimeout(()=>{
            this.setState({mostrarAlerta:false})
          },2000)
        });
    }

    puedoEliminar(){
        return this.state.miembros.includes(this.state.miembroCandidato) && (this.state.privacidad === "PRIVADO");
    }

    puedoInvitar(){
        var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return (re.test(String(this.state.miembroCandidato).toLowerCase())) && (this.state.privacidad === "PRIVADO") && (!this.state.miembros.includes(this.state.miembroCandidato));
    }

    invitarMiembro(){
        const URL = "https://secure-plateau-18239.herokuapp.com/channel/user"
        axios.post(URL,{
            token: ls("token"),
            id: ls("id_orga"),
            name: this.state.nombre,
            email: this.state.miembroCandidato,
        })
        .then((response) => {
            console.log(response);
            this.configAlertParams("success","El usuario ha sido invitado correctamente");
            this.onShowAlert();
        })
        .catch((error) => {
            console.log(error.response);
            switch (error.response.status) {
                case 400:
                    this.configAlertParams("danger","NO existe un usuario con ese email en el sistema");
                    this.onShowAlert();
                    break;
                case 401:
                    this.configAlertParams("danger","El usuario NO forma parte de la organizacion");
                    this.onShowAlert();
                    break;
                case 403:
                    this.configAlertParams("warning","El usuario YA forma parte del canal");
                    this.onShowAlert();
                    break;
                case 405:
                    this.configAlertParams("warning","NO tiene permiso para agregar a el canal");
                    this.onShowAlert();
                    break;
                default:
                    break;
            }

        });
    }

    eliminarMiembro(){
        const URL = "https://secure-plateau-18239.herokuapp.com/channel/user/"+ls("token")+"/"+ls("id_orga")+"/"+this.state.nombre+"/"+this.state.miembroCandidato;
        axios.delete(URL,{})
        .then((response) => {
            console.log(response);
            this.configAlertParams("success","El usuario ha sido eliminado correctamente");
            this.onShowAlert();
        })
        .catch((error) => {
            console.log(error.response);
            switch (error.response.status) {
                case 400:
                    this.configAlertParams("danger","NO existe un usuario con ese email en el sistema");
                    this.onShowAlert();
                    break;
                case 401:
                    this.configAlertParams("danger","El usuario NO forma parte de la organizacion");
                    this.onShowAlert();
                    break;
                case 403:
                    this.configAlertParams("warning","El usuario YA forma parte del canal");
                    this.onShowAlert();
                    break;
                case 405:
                    this.configAlertParams("warning","NO tiene permiso para agregar a el canal");
                    this.onShowAlert();
                    break;
                default:
                    break;
            }

        });

    }

    render() { 
        return (
            <React.Fragment>
            <BarraNavegacion/>
            <BarraOrganizaciones/>
            <div className="organizacion-data"> 
            <h1>{this.props.match.params.id_canal+"  "}<Badge color={this.badgeColor}>{this.state.privacidad}</Badge></h1>
            <div>
                    <AlertApp color={this.state.colorAlerta} show={this.state.mostrarAlerta}>
                        {this.state.mensajeAlerta}
                    </AlertApp>
            </div>
            <Container>
                <Row>
                    <Col>
                    <Form className="contenedor-formulario">
                    <FormGroup>
                        <Label className="font-weight-bold">Mensaje de Bienvenida del Canal:</Label>
                        <Input name="msjBienvenida" type="text" placeholder="Escriba el mensaje de Bienvenida del Canal..." value={this.state.msjBienvenida} onChange={this.handleChange}/>
                        <InputGroupAddon addonType="append">
                            <Button color="info" onClick={this.cambiarBienvenida}>MODIFICAR</Button>
                        </InputGroupAddon>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Descripcion Del Canal:</Label>
                        <Input type="textarea" name="descripcion" value={this.state.descripcion} onChange={this.handleChange}/>
                        <InputGroupAddon addonType="append">
                            <Button color="info" onClick={this.cambiarDescripcion}>MODIFICAR</Button>
                        </InputGroupAddon>
                    </FormGroup>
                    {(this.state.privacidad === "PUBLICO") ? 
                    (<Button color="warning" onClick={this.hacerCanalPrivado}>HACER PRIVADO</Button>)
                    :
                    (<Button color="primary" onClick={this.hacerCanalPublico}>HACER PUBLICO</Button>) }
                    </Form>
                    </Col>
                    <Col>
                    <div>
                    <h2>Listado de miembros del canal</h2>
                    <Table size="sm" bordered dark>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.miembros.map((miembro,index) => ( <tr key={index}>
                                                                    <td>{miembro}</td>
                                                                    </tr>))}
                    </tbody>
                    </Table>
                    <InputGroup>
                    <Input name="miembroCandidato" type="email" placeholder="usuario..." onChange={this.handleChange} value={this.state.miembroCandidato}/>
                    <InputGroupAddon addonType="append">
                        <Button color="success"  disabled={!this.puedoInvitar()} onClick={this.invitarMiembro}>INVITAR MIEMBRO</Button>
                        <Button color="danger" disabled={!this.puedoEliminar()} onClick={this.eliminarMiembro}>ELIMINAR MIEMBRO</Button>
                    </InputGroupAddon>
                    </InputGroup>
                    </div>
                    </Col>
                </Row>
            </Container>
            </div>
            </React.Fragment>
          );
    }
}
 
export default DetalleCanal;