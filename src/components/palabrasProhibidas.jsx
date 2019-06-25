import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import BarraOrganizaciones from './barra-organizaciones';
import axios from 'axios';
import  ls  from 'local-storage' ;
import '../css/organizaciones.css'
import { Table, Input, InputGroup, Button, InputGroupAddon } from 'reactstrap';

class PalabrasProhibidas extends Component {
    constructor(props){
        super(props);
        this.state = {
            palabras: [],
            cantidad: 0,
            palabraNueva: '',
            palabraBorrar: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.agregarPalabra = this.agregarPalabra.bind(this);
        this.borrarPalabra = this.borrarPalabra.bind(this);
    }


    componentDidMount(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/organization/restrictedWords/' + ls("id_orga") + '/' + ls("token");
        axios.get(URL)
        .then((response) =>{
            this.setState({palabras: response.data.restrictedWords, cantidad: response.data.restrictedWords.length});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    agregarPalabra(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/organization/restrictedWords/'+ls("id_orga")+'/'+ls("token");
        console.log(URL);
        axios.put(URL,{
            restrictedWords: this.state.palabraNueva
        })
        .then(response => {
            this.setState({palabras: response.data.restrictedWords, cantidad: response.data.restrictedWords.length, palabraNueva: ''});
        })
        .catch(error => {
            console.log(error);
        })
    }

    borrarPalabra(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/organization/restrictedWords/'+ls("id_orga")+'/'+ls("token");
        axios.delete(URL, {  data: { restrictedWords: this.state.palabraBorrar } })
        .then(response => {
            this.setState({palabras: response.data.restrictedWords, cantidad: response.data.restrictedWords.length, palabraBorrar: ''});
        })
        .catch(error => {
            console.log(error);
        })

    }

    palabraValidaParaAgregar(){
        return this.state.palabraNueva.length > 3 && !this.state.palabras.includes(this.state.palabraNueva);
    }

    palabraValidaParaBorrar(){
        return this.state.palabras.includes(this.state.palabraBorrar);
    }

    render() { 
        return ( 
            <React.Fragment>
            <BarraNavegacion/>
            <BarraOrganizaciones/>
            <div className="organizacion-data">
            <h1>Esta es la lista de las palabras prohibidas:</h1>
            <div className="tabla-palabras">
            {(this.state.cantidad === 0) ? (
                <p>No Hay palabras prohibidas para esta organizacion!</p>
            ) : (
                <Table bordered dark>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Palabra Prohibida</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.palabras.map((palabra,index) =>(<tr key={index}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{palabra}</td></tr>)
                    )}
                </tbody>
                </Table>
            )}
            <div className="botones-palabras">
            <InputGroup className="boton-palabras">
                <Input name="palabraNueva" type="text" placeholder="Ingrese una palabra..." onChange={this.handleChange} value={this.state.palabraNueva}/>
                <InputGroupAddon addonType="append"><Button color="success" onClick={this.agregarPalabra} disabled={!this.palabraValidaParaAgregar()}>Agregar Palabra</Button></InputGroupAddon>
            </InputGroup>
            <InputGroup className="boton-palabras">
                <Input name="palabraBorrar" type="text" placeholder="Ingrese una palabra..." onChange={this.handleChange} value={this.state.palabraBorrar}/>
                <InputGroupAddon addonType="append"><Button color="danger" onClick={this.borrarPalabra} disabled={!this.palabraValidaParaBorrar()}>Eliminar Palabra</Button></InputGroupAddon>
            </InputGroup>
            </div>
            </div>
            </div>
            </React.Fragment>
         );
    }
}
 
export default PalabrasProhibidas;