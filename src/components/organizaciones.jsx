import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion'

class Organizaciones extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <h1>Organizaciones Page</h1>
            </React.Fragment>
          );
    }
}
 
export default Organizaciones;