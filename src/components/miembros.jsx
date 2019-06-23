import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import '../css/organizacion.css';

class Miembros extends Component {
    constructor(props){
        super(props);
        this.state = {
            miembros: []
        };
    }
    render() { 
        return (
            <React.Fragment>
            <BarraNavegacion/>
            <BarraOrganizaciones/>
            <div className="organizacion-data"> 
                <h1>Pagina de Miembros de una organizacion</h1>
            </div>
            </React.Fragment>
         );
    }
}
 
export default Miembros;