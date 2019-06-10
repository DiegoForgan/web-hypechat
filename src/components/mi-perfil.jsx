import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import '../css/contenedor-perfil.css';
import { Form } from 'reactstrap';

class MiPerfil extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <div className="contenedor-perfil">
                <img src="" alt="PROFILE PHOTO"></img>
                <Form>

                </Form>
                </div>
            </React.Fragment>
          );
    }
}
 
export default MiPerfil;