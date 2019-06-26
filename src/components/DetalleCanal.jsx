import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import axios from 'axios';
import ls from 'local-storage';
import { Badge, Form, FormGroup, Label, Input, InputGroupAddon, Button } from 'reactstrap';

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
        };
        this.handleChange = this.handleChange.bind(this);
        this.cambiarBienvenida = this.cambiarBienvenida.bind(this);
        this.hacerCanalPublico = this.hacerCanalPublico.bind(this);
        this.hacerCanalPrivado = this.hacerCanalPrivado.bind(this);
        this.cambiarDescripcion = this.cambiarDescripcion.bind(this);
        this.setearPrivacidad = this.setearPrivacidad.bind(this);
    }


    componentDidMount(){
        const URL = "https://secure-plateau-18239.herokuapp.com/channel/"+ls("token")+"/"+ls("id_orga")+"/"+this.props.match.params.id_canal;
        axios.get(URL)
        .then((response) => {
            var privacidad_txt = "PRIVADO"
            var datos_canal  = response.data.channel;
            console.log(datos_canal);
            if (!datos_canal.private) {
                privacidad_txt = "PUBLICO"
                //Los miembros son los mismos de la organizacion por ser publico
            }
            this.setState({
                privacidad: privacidad_txt,
                miembros: datos_canal.members,
                descripcion: datos_canal.description,
                msjBienvenida: datos_canal.welcome,
                nombre: datos_canal.name,
            })
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
                    msjBienvenida: response.data.description,
                });
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

    render() { 
        return (
            <React.Fragment>
            <BarraNavegacion/>
            <BarraOrganizaciones/>
            <div className="organizacion-data"> 
            <h1>{this.props.match.params.id_canal+"  "}<Badge color={this.badgeColor}>{this.state.privacidad}</Badge></h1>
            <Form className="contenedor-formulario">
                    <FormGroup>
                        <Label className="font-weight-bold">Mensaje de Bienvenida del Canal:</Label>
                        <Input name="msjBienvenida" type="text" placeholder="Escriba el mensaje de Bienvenida del Canal..." value={this.state.msjBienvenida} onChange={this.handleChange}/>
                        <InputGroupAddon addonType="append">
                            <Button color="primary" onClick={this.cambiarBienvenida}>MODIFICAR</Button>
                        </InputGroupAddon>
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Descripcion Del Canal:</Label>
                        <Input type="textarea" name="descripcion" value={this.state.descripcion} onChange={this.handleChange}/>
                        <InputGroupAddon addonType="append">
                            <Button color="primary" onClick={this.cambiarDescripcion}>MODIFICAR</Button>
                        </InputGroupAddon>
                    </FormGroup>
                    {(this.state.privacidad === "PUBLICO") ? 
                    (<Button color="warning" onClick={this.hacerCanalPrivado}>HACER PRIVADO</Button>)
                    :
                    (<Button color="primary" onClick={this.hacerCanalPublico}>HACER PUBLICO</Button>) }
            </Form>
            </div>
            </React.Fragment>
          );
    }
}
 
export default DetalleCanal;