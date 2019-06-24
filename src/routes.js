import React from "react";
import { Route, Switch } from "react-router-dom";
import FormularioLogin from "./components/formularioLogin";
import Home from './components/home';
import Organizaciones from './components/organizaciones';
import MiPerfil from './components/mi-perfil';
import Reportes from './components/reportes';
import Registro from './components/registro';
import NotFound from './components/not-found';
import DetalleOrganizacion from './components/DetalleOrganizacion';
import PalabrasProhibidas from "./components/palabrasProhibidas";
import Miembros from './components/miembros';
import Canales from './components/canales';
import UsuariosRegistrados from './components/usuarios-registrados';
import mensajesEnviados from './components/mensajes-enviados';
import DetalleCanal from './components/DetalleCanal';

export default () =>
  <Switch>
    <Route path="/" exact component={FormularioLogin} />
    <Route path="/home" exact component={Home}/>
    <Route path="/organizaciones" exact component={Organizaciones}/>
    <Route path="/organizaciones/:id_orga" exact component={DetalleOrganizacion}/>
    <Route path="/organizaciones/:id_orga/palabrasProhibidas" exact component={PalabrasProhibidas}/>
    <Route path="/organizaciones/:id_orga/miembros" exact component={Miembros}/>
    <Route path="/organizaciones/:id_orga/canales" exact component={Canales}/>
    <Route path="/organizaciones/:id_orga/canales/:id_canal" exact component={DetalleCanal}/>
    <Route path="/reportes" exact component={Reportes}/>
    <Route path="/reportes/usuariosRegistrados" exact component={UsuariosRegistrados}/>
    <Route path="/reportes/mensajesEnviados" exact component={mensajesEnviados}/>
    <Route path="/miperfil" exact component={MiPerfil}/>
    <Route path="/registro" exact component={Registro}/>
    <Route component={NotFound}/>
  </Switch>;