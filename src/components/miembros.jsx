import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import '../css/organizacion.css';
import ls from 'local-storage';
import axios from 'axios';
import { Table, Input, InputGroup, Button, InputGroupAddon } from 'reactstrap';

class Miembros extends Component {
    constructor(props){
        super(props);
        this.state = {
            duenios: [],
            miembros: [],
            moderadores: [],
            miembroCandidato: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.ascenderMiembro = this.ascenderMiembro.bind(this);
        this.degradarMiembro = this.degradarMiembro.bind(this);
        this.eliminarMiembro = this.eliminarMiembro.bind(this);
    }

    componentDidMount(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/organization/'+ls("token")+'/'+ls("id_orga");
        axios.get(URL)
        .then((response) => {
            console.log(response);
            this.setState({ duenios: response.data.organization.owner, moderadores: response.data.organization.moderators, miembros: response.data.organization.members });
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
        console.log('vas a ascender a un miembro');
        console.log(this.state.miembroCandidato);
        this.setState({miembroCandidato: ''});
    }

    degradarMiembro(){
        console.log('vas a degradar a un miembro');
        console.log(this.state.miembroCandidato);
        this.setState({miembroCandidato: ''});
    }

    eliminarMiembro(){
        console.log('vas a eliminar a un miembro');
        console.log(this.state.miembroCandidato);
        this.setState({miembroCandidato: ''});
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
        (this.state.duenios.includes(ls("email")));
    }

    puedoEliminar(){
        //El usuario a eliminar pertenece a la organizacion y no es el Dueño
        return (this.state.miembros.includes(this.state.miembroCandidato) && !this.state.duenios.includes(this.state.miembroCandidato)) &&
        //Yo soy el dueño O
        (this.state.duenios.includes(ls("email"))  ||
        //Soy moderador y el usuario a eliminar no es moderador
        (this.state.moderadores.includes(ls("email"))  && !this.state.moderadores.includes(this.state.miembroCandidato)));
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
                    </tbody>
                    <tbody>
                        { this.state.moderadores.map((moderador,index) =>(<tr key={this.state.duenios.length + index + 1}>
                            <td>{moderador}</td>
                            <td>Moderador</td>
                        </tr>))}
                    </tbody>
                    <tbody>
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
                    <div>
                    <InputGroup>
                    <Input name="miembroCandidato" type="email" placeholder="Ingrese el email del miembro a degradar/ascender..." onChange={this.handleChange} value={this.state.miembroCandidato}/>
                    <InputGroupAddon addonType="append">
                        <Button color="success"  disabled={!this.puedoAscender()} onClick={this.ascenderMiembro}>Ascender Miembro</Button>
                        <Button color="warning" disabled={!this.puedoDegradar()} onClick={this.degradarMiembro}>Degradar Miembro</Button>
                        <Button color="danger" disabled={!this.puedoEliminar()} onClick={this.eliminarMiembro}>Eliminar Miembro</Button>
                    </InputGroupAddon>
                    </InputGroup>
                </div>  
            </div>
            </React.Fragment>
         );
    }
}
 
export default Miembros;