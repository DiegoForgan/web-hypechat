import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';

class DetalleOrganizacion extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <h1>Soy una Organizacion</h1>
            </React.Fragment>
         );
    }
}
 
export default DetalleOrganizacion;