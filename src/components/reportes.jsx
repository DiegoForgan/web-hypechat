import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';


class Reportes extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <h1>Reportes Page</h1>
            </React.Fragment>
          );
    }
}
 
export default Reportes;