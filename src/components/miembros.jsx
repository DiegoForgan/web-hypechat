import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import '../css/organizacion.css';
import ls from 'local-storage';
import axios from 'axios';
import { Table, Input, InputGroup, Button, InputGroupAddon } from 'reactstrap';
import AlertApp from './alerta-app';

class Miembros extends Component {
    constructor(props){
        super(props);
        this.state = {
            duenios: [],
            miembros: [],
            moderadores: [],
            miembroCandidato: '',
            mostrarAlerta: false,
            colorAlerta: "success",
            mensajeAlerta: "El usuario se agrego correctamente!",
        };
        this.handleChange = this.handleChange.bind(this);
        this.ascenderMiembro = this.ascenderMiembro.bind(this);
        this.degradarMiembro = this.degradarMiembro.bind(this);
        this.agregarMiembro = this.agregarMiembro.bind(this);
        this.eliminarMiembro = this.eliminarMiembro.bind(this);
        this.actualizarEstadoPrivilegios = this.actualizarEstadoPrivilegios.bind(this);
    }

    actualizarEstadoPrivilegios(){
        if(this.state.moderadores.includes(ls("email")) || this.state.duenios.includes(ls("email"))){
            ls("tengoPrivilegios",true);
        }
        else{
            ls("tengoPrivilegios",false);
        }
    }

    onShowAlert = ()=>{
        this.setState({mostrarAlerta:true},()=>{
          window.setTimeout(()=>{
            this.setState({mostrarAlerta:false})
          },2000)
        });
      }

    configAlertParams = (color,mensaje)=>{
        this.setState({colorAlerta: color, mensajeAlerta: mensaje});
      }

    componentDidMount(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/organization/'+ls("token")+'/'+ls("id_orga");
        axios.get(URL,{})
        .then((response) => {
            console.log(response);
            this.setState({ duenios: response.data.organization.owner, moderadores: response.data.organization.moderators, miembros: response.data.organization.members });
            this.actualizarEstadoPrivilegios();
            console.log(this.state);
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

    ascenderMiembro(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/moderator'
        axios.put(URL, {
            token: ls("token"),
            organizationID: ls("id_orga"),
            userEmail: this.state.miembroCandidato,
      })
      //Recordar que definiendo las funciones asi puedo usar el THIS.SETSTATE bien
      .then((response) => {
        console.log(response);
        this.setState({moderadores: [...this.state.moderadores,this.state.miembroCandidato]});
        this.setState({miembroCandidato: ''});
        this.actualizarEstadoPrivilegios();
        this.configAlertParams("success","El usuario a sido ASCENDIDO correctamente");
        this.onShowAlert();
      })
      .catch((error) => {
        console.log(error);
        this.setState({miembroCandidato: ''});
      });
    }

    degradarMiembro(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/revokeModerator'
        axios.put(URL, {
            token: ls("token"),
            organizationID: ls("id_orga"),
            userEmail: this.state.miembroCandidato,
      })
      //Recordar que definiendo las funciones asi puedo usar el THIS.SETSTATE bien
      .then((response) => {
        console.log(response);
        var index = this.state.moderadores.indexOf(this.state.miembroCandidato);
        this.setState({moderadores: this.state.moderadores.filter((elemento, i) => i !== index)});
        this.setState({miembroCandidato: ''});
        this.actualizarEstadoPrivilegios();
        this.configAlertParams("warning","El usuario ha sido DEGRADADO correctamente!");
        this.onShowAlert();
      })
      .catch((error) => {
        console.log(error);
        this.setState({miembroCandidato: ''});
      });
    }
    
    agregarMiembro(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/organization/user';
        axios.post(URL,{
            token: ls("token"),
            idOrganization: ls("id_orga"),
            email: this.state.miembroCandidato,
            psw: ls("psw_orga"),
        })
        .then((response) => {
            console.log(response);
            this.setState({miembros: [...this.state.miembros,this.state.miembroCandidato], mostrarAlerta: true});
            this.setState({miembroCandidato: ''});
            this.actualizarEstadoPrivilegios();
            this.configAlertParams("success","El usuario ha sido AGREGADO correctamente!");
            this.onShowAlert();
        })
        .catch((error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                this.configAlertParams("danger","Ese email no pertenece a un usuario del sistema!");
                this.onShowAlert();
            }
            this.setState({miembroCandidato: ''});
        });
    }

    eliminarMiembro(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/member/'+ls("token")+'/'+ls("id_orga")+"/"+this.state.miembroCandidato;
        axios.delete(URL)
      //Recordar que definiendo las funciones asi puedo usar el THIS.SETSTATE bien
      .then((response) => {
        console.log(response);
        var indiceMiembro = this.state.miembros.indexOf(this.state.miembroCandidato);
        var indiceModerador = this.state.moderadores.indexOf(this.state.miembroCandidato);
        this.setState({miembros: this.state.miembros.filter((elemento, i) => i !== indiceMiembro)});
        if ( indiceModerador !== -1) {
            this.setState({moderadores: this.state.moderadores.filter((elemento, i) => i !== indiceModerador)});    
        }
        this.setState({miembroCandidato: ''});
        this.actualizarEstadoPrivilegios();
        this.configAlertParams("warning","El usuario ha sido ELIMINADO correctamente!");
        this.onShowAlert();
      })
      .catch((error) => {
        console.log(error);
        this.setState({miembroCandidato: ''});
      });
    }

    puedoAscender(){
        //ES un usuario que esta en la organizacion y no es el Dueño
        return (this.state.miembros.includes(this.state.miembroCandidato) && !this.state.duenios.includes(this.state.miembroCandidato)) &&
        //Yo soy el duenio o un moderador 
        ((this.state.duenios.includes(ls("email"))) || (this.state.moderadores.includes(ls("email"))))
        //El usuario candidato todavia no es moderador
         && (!this.state.moderadores.includes(this.state.miembroCandidato));
    }

    puedoDegradar(){
        //Solo puedo degradar siendo dueño porque los moderadores no pueden degradar a otros moderadores
        //El usuario a degradar pertenece a la organizacion y no es el Dueño
        return (this.state.miembros.includes(this.state.miembroCandidato) && !this.state.duenios.includes(this.state.miembroCandidato)) &&
        //Yo soy el dueño O
        (this.state.duenios.includes(ls("email"))) && this.state.moderadores.includes(this.state.miembroCandidato);
    }

    puedoEliminar(){
        //El usuario a eliminar pertenece a la organizacion y no es el Dueño
        return (this.state.miembros.includes(this.state.miembroCandidato) && !this.state.duenios.includes(this.state.miembroCandidato)) &&
        //Yo soy el dueño O
        (this.state.duenios.includes(ls("email"))  ||
        //Soy moderador y el usuario a eliminar no es moderador
        (this.state.moderadores.includes(ls("email"))  && !this.state.moderadores.includes(this.state.miembroCandidato)));
    }

    puedoAgregar(){
        //El usuario a agregar no pertenece a la organizacion
        var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return ls("tengoPrivilegios") && (!this.state.miembros.includes(this.state.miembroCandidato)) && (re.test(String(this.state.miembroCandidato).toLowerCase()));
    }

    render() { 
        return (
            <React.Fragment>
            <BarraNavegacion/>
            <BarraOrganizaciones/>
            <div className="organizacion-data"> 
                <h1>Miembros de la organización:</h1>
                <div className="tabla-palabras">
                {(this.state.miembros.length === 0) ? (
                    <p>No Hay miembros en la organizacion!</p>
                ) : (
                    <Table size="sm" bordered dark>
                    <thead>
                        <tr>
                        <th>Usuario</th>
                        <th>Rol</th>
                     </tr>
                    </thead>
                    <tbody>
                        { this.state.duenios.map((duenio,index) =>(<tr key={index}>
                            <td>{duenio}</td>
                            <td>Owner</td>
                        </tr>))}
                        { this.state.moderadores.map((moderador,index) =>(<tr key={this.state.duenios.length + index + 1}>
                            <td>{moderador}</td>
                            <td>Moderador</td>
                        </tr>))}
                        {this.state.miembros.map((miembro,index) => (<tr key={this.state.duenios.length + this.state.moderadores.length + index + 1}>
                            {
                               ((this.state.duenios.includes(miembro)) || (this.state.moderadores.includes(miembro))) ? 
                                    (null) :
                                    (
                                        <React.Fragment>
                                        <td>{miembro}</td>
                                        <td>Sin Rol</td>
                                        </React.Fragment>
                                    )
                            }
                        </tr>))}
                    </tbody>
                    </Table>)}
                    </div>
                    <div className="gestion-usuarios">
                    <InputGroup>
                    <Input name="miembroCandidato" type="email" placeholder="Ingrese el email de un usuario..." onChange={this.handleChange} value={this.state.miembroCandidato}/>
                    <InputGroupAddon addonType="append">
                        <Button color="primary"  disabled={!this.puedoAscender()} onClick={this.ascenderMiembro}>ASCENDER MIEMBRO</Button>
                        <Button color="warning" disabled={!this.puedoDegradar()} onClick={this.degradarMiembro}>DEGRADAR MIEMBRO</Button>
                        <Button color="success"  disabled={!this.puedoAgregar()} onClick={this.agregarMiembro}>AGREGAR MIEMBRO</Button>
                        <Button color="danger" disabled={!this.puedoEliminar()} onClick={this.eliminarMiembro}>ELIMINAR MIEMBRO</Button>
                    </InputGroupAddon>
                    </InputGroup>
                </div>
                <div>
                    <AlertApp color={this.state.colorAlerta} show={this.state.mostrarAlerta}>
                        {this.state.mensajeAlerta}
                    </AlertApp>
                </div>
            </div>
            </React.Fragment>
         );
    }
}
 
export default Miembros;