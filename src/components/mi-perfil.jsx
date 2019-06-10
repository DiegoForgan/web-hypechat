import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';

class MiPerfil extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <h1>Mi Perfil Page</h1>
            </React.Fragment>
          );
    }
}
 
export default MiPerfil;