import React, { Component } from 'react';

class FormularioLogin extends Component {
    state = {  }

    handleLogin(){
      console.log("Apretaste para loguearte al sistema");
    }

    render() { 
        return ( 
          <div class="col-sm-6 offset-sm-3">
        <form>
            <div className="form-group w-50">
              <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar dirección de email..."/>
              <small id="emailHelp" className="form-text text-muted">No compartiremos su dirección de email con nadie.</small>
            </div>
            <div className="form-group w-50">
              <label htmlFor="exampleInputPassword1">Contraseña</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Ingrese su contraseña..."/>
            </div>
            <div><button type="submit" className="btn btn-success" onClick={this.handleLogin}>Log In!</button></div>
            <div><button type="submit" className="btn btn-warning">Registrarse</button></div>
      </form> 
      </div>
          );
    }
}
 
export default FormularioLogin;