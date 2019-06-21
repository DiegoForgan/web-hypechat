import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/barraOrga.css';
import ls from 'local-storage';


class BarraOrganizaciones extends Component {
    state = {  }
    render() { 
        return (
            <div className="barra"> 
            <Nav>
                <NavItem>
                    <NavLink tag={Link} to={`/organizaciones/${ls("id_orga")}`}><font color="#f1faff">Informacion General</font></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={`/organizaciones/${ls("id_orga")}/miembros`}><font color="#f1faff">Miembros</font></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={`/organizaciones/${ls("id_orga")}/canales`}><font color="#f1faff">Canales</font></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={`/organizaciones/${ls("id_orga")}/palabrasProhibidas`}><font color="#f1faff">Palabras Prohibidas</font></NavLink>
                </NavItem>
            </Nav>
            </div>
         );
    }
}
 
export default BarraOrganizaciones;