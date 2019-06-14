import React from "react";
import { Route, Switch } from "react-router-dom";
import FormularioLogin from "./components/formularioLogin";
import Home from './components/home';
import Organizaciones from './components/organizaciones';
import MiPerfil from './components/mi-perfil';
import Reportes from './components/reportes';
import Registro from './components/registro';
import NotFound from './components/not-found';

export default () =>
  <Switch>
    <Route path="/" exact component={FormularioLogin} />
    <Route path="/home" exact component={Home}/>
    <Route path="/organizaciones" exact component={Organizaciones}/>
    <Route path="/reportes" exact component={Reportes}/>
    <Route path="/miperfil" exact component={MiPerfil}/>
    <Route path="/registro" exact component={Registro}/>
    <Route component={NotFound}/>
  </Switch>;