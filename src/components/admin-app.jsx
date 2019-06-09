import React, { Component } from 'react';
import FormularioLogin from './formularioLogin';
import TituloDeLaApp from './titulo';

class AdminWeb extends Component {

    render() { 
        return (
            <div>
                <TituloDeLaApp/> 
                <FormularioLogin/>
            </div>
            
        );
    }
}
 
export default AdminWeb;