import React, { Component } from 'react';
import BarraNavegacion from './barra-navegacion';
import axios from 'axios';
import '../css/organizacion.css';
import { HorizontalBar } from 'react-chartjs-2';
import ls from 'local-storage';


class MensajesEnviados extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ["Total Enviados"],
                datasets: [
                    {
                        label: "Cantidad de Mensajes Enviados",
                        data:[],
                    }]
            }
        }
    };

    //{total: 0, organizations: [{total: 0, name: "nombre", channels: [{total: 0, name:"canal"}]}]}
    ///messages/:token
    componentDidMount(){
        //const URL = 'https://secure-plateau-18239.herokuapp.com/messages/' + ls("token");
        //axios.get(URL)
        //.then((response) => {
            
            var response = {data:{
                    total: 10,
                    organizations:[
                        {total: 2, name:"orga1", channels: [
                            {total: 0, name:"general"},
                            {total: 2, name: "varios"}
                        ]},
                        {total: 8, name: "orga2", channels:[
                            {total: 7, name:"general"},
                            {total: 1, name:"varios"}
                        ]}
                    ]
                }
            }
            console.log(response);
            var estadoActual = {labels: ["Total Enviados"], datasets: [{
                    label: "Cantidad de Mensajes Enviados",
                    data:[response.data.total],
                    backgroundColor: [this.generarColorAleatorio()],
                }]}



            var arrayOrganizaciones = response.data.organizations;

            for (let index = 0; index < arrayOrganizaciones.length; index++) {
                const organizacion = arrayOrganizaciones[index];
                estadoActual.labels.push("ORGANIZACION " + organizacion.name);
                estadoActual.datasets[0].data.push(organizacion.total);
                estadoActual.datasets[0].backgroundColor.push(this.generarColorAleatorio());
                var arrayCanales = organizacion.channels;
                for (let index = 0; index < arrayCanales.length; index++) {
                    const canal = arrayCanales[index];
                    estadoActual.labels.push("CANAL " + canal.name);
                    estadoActual.datasets[0].data.push(canal.total);
                    estadoActual.datasets[0].backgroundColor.push(this.generarColorAleatorio());
                }
                
            }
            this.setState({chartData: estadoActual});
        //})
        //.catch((error) => {
        //    console.log(error);
        //});
    }

    generarColorAleatorio(){
        //rgba(255, 99, 132, 0.6)
        var stringDeColor = 'rgba(' + Math.floor((Math.random() * 255) + 0).toString() + ',' + Math.floor((Math.random() * 255) + 0).toString() + ','
        + Math.floor((Math.random() * 255) + 0).toString() + ', 0.6)' ;
        console.log(stringDeColor);
        return stringDeColor; 
    }


/*options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }*/
    render() { 
        return (
            <React.Fragment>
                <BarraNavegacion/>
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