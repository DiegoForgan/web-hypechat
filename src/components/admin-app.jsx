import React, { Component } from 'react';
import FormularioLogin from './formularioLogin';
import Registro from './registro';
import Home from './home';
import Reportes from './reportes';
import Organizaciones from './organizaciones';
import MiPerfil from './mi-perfil'
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

class AdminWeb extends Component {

    render() { 
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={FormularioLogin}/>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/registro" exact component={Registro}/>
                    <Route path="/reportes" exact component={Reportes}/>
                    <Route path="/organizaciones" exact component={Organizaciones}/>
                    <Route path="/miperfil" exact component={MiPerfil}/>
                </Switch>
            </Router>
        );
    }
}
 
export default AdminWeb;