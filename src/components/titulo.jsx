import React, { Component } from 'react';
import '../css/titulo-pagina-web.css'


class TituloDeLaApp extends Component {
    state = {  }
    render() { 
        return (
            <div className="titulo-pagina-web">
                <img className="logo-hypechat" src={require('../img/logo.png')} alt="Logo de Hypechat"></img> 
                <h2>Admin Website</h2>
            </div>
         );
    }
}
 
export default TituloDeLaApp;