import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import FormularioLogin from './formularioLogin';
import TituloDeLaApp from './titulo';

class AdminWeb extends Component {

    render() { 
        return (
            <div>
                <BarraNavegacion/>
                <TituloDeLaApp/>
                <FormularioLogin/>
            </div>
            
        );
    }
}
 
export default AdminWeb;