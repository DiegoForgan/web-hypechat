import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';

class DetalleCanal extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
            <BarraNavegacion/>
            <BarraOrganizaciones/>
            <div className="organizacion-data"> 
            <h1>{this.props.match.params.id_canal}</h1>
            </div>
            </React.Fragment>
          );
    }
}
 
export default DetalleCanal;