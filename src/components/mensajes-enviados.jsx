import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import axios from 'axios';
import '../css/organizacion.css';
import { HorizontalBar } from 'react-chartjs-2';
import ls from 'local-storage';
import ModalApp from './modal-app';


class MensajesEnviados extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            chartData:{
                labels: [],
                datasets: [
                    {
                        label: "Cantidad de Mensajes Enviados",
                        data:[],
                        backgroundColor: [],
                    }]
            }
        }
    };

    //{total: 0, organizations: [{total: 0, name: "nombre", channels: [{total: 0, name:"canal"}]}]}
    ///messages/:token
    componentDidMount(){
        const URL = 'https://secure-plateau-18239.herokuapp.com/messages/' + ls("token");
        axios.get(URL)
        .then((response) => {    
            console.log(response);
            var arrayOrganizaciones = response.data;

            for (let indiceOrganizacion = 0; indiceOrganizacion < arrayOrganizaciones.length; indiceOrganizacion++) {
                const organizacion = arrayOrganizaciones[indiceOrganizacion];
                if (organizacion === {}) continue;
                this.setState({chartData: {
                    labels: [...this.state.chartData.labels, "ORGANIZACION " + organizacion.name],
                    datasets: [
                        {
                            label: "Cantidad de Mensajes Enviados",
                            data: [...this.state.chartData.datasets[0].data, organizacion.total],
                            backgroundColor: [...this.state.chartData.datasets[0].backgroundColor, this.generarColorAleatorio()],
                        }
                    ]
                    }
                });
                var arrayCanales = organizacion.canales;
                for (let indiceCanal = 0; indiceCanal < arrayCanales.length; indiceCanal++) {
                    const canal = arrayCanales[indiceCanal];
                    this.setState({chartData: {
                        labels: [...this.state.chartData.labels,"CANAL " + canal.name],
                        datasets:[
                            {
                                label: "Cantidad de Mensajes Enviados",
                                data: [...this.state.chartData.datasets[0].data, canal.total],
                                backgroundColor: [...this.state.chartData.datasets[0].backgroundColor, this.generarColorAleatorio()],
                            }
                        ]   
                    }});
                    
                }
            }
        })
        .catch((error) => {
            console.log(error);
            this.toggleModal();
        });
    }

    generarColorAleatorio(){
        var stringDeColor = 'rgba(' + Math.floor((Math.random() * 255) + 0).toString() + ',' + Math.floor((Math.random() * 255) + 0).toString() + ','
        + Math.floor((Math.random() * 255) + 0).toString() + ', 1.0)' ;
        return stringDeColor; 
    }

    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }


    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
                <ModalApp show={this.state.isOpen}
                onClose={this.toggleModal}
                titulo="Error de Reportes">
                    Ocurrio un error al querer ver el reporte!
                </ModalApp>
                <div className="organizacion-data"> 
                <h1>Reporte: Mensajes Enviados</h1>
                <HorizontalBar
                width={300}
                height={300}
                data={this.state.chartData}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    title:{
                        display: true,
                        text: 'Cantidad de Mensajes Enviados por Canal',
                        fontSize: 25
                    }
                }}
                />
                </div>
            </React.Fragment>
         );
    }
}
 
export default MensajesEnviados;