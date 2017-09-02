import React from 'react';

import Home from './components/Home';
import Chat from './components/Chat/Chat';
import Menu from './components/Menu';
import Contacto from './components/Contacto';
import Comunicacion from './components/Comunicacion';
import Historias from './components/Historias/Historias';
import VerHistorias from './components/Historias/VerHistorias';
import CargarHistoria from './components/Historias/CargarHistoria';
import CargarHistoriaTexto from './components/Historias/CargarHistoriaTexto';
import CargarHistoriaAudio from './components/Historias/CargarHistoriaAudio';
import Notificacion from './components/Monitoreo/Notificacion';
import Evento from './components/Eventos/CrearEvento';
import Perfil from './components/Perfil/CrearPerfil';
import Catalogo from './components/Catalogo/Catalogo';
import VerCatalogo from './components/Catalogo/VerCatalogo';
import CargarCatalogo from './components/Catalogo/CargarCatalogo';

import {
    Platform
} from 'react-native';

import {
    Router,
    Scene,
} from 'react-native-router-flux';

class App extends React.Component{
    render(){
        return(
            <Router>
                <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64 : 54}}>
                    <Scene key='home' component={Home} title='INICIO' hideNavBar={true} style={{paddingTop: Platform.OS === 'ios' ? 64 : 0}} />
                    <Scene key='menu' component={Menu} title='MENÚ' hideNavBar={false}/>
                    <Scene key='comunicacion' component={Comunicacion} title='COMUNICACIÓN'/>
                    <Scene key='chat' component={Chat} title='CHAT'/>
                    <Scene key='historias' component={Historias} title='HISTORIAS'/>
                    <Scene key='contacto' component={Contacto} title='CONTACTOS'/>
                    <Scene key='verHistorias' component={VerHistorias} title='VER HISTORIAS'/>
                    <Scene key='cargarHistoria' component={CargarHistoria} title='CARGAR HISTORIA'/>
                    <Scene key='cargarHistoriaTexto' component={CargarHistoriaTexto} title='HISTORIA EN TEXTO'/>
                    <Scene key='cargarHistoriaAudio' component={CargarHistoriaAudio} title='HISTORIA EN AUDIO'/>
                    <Scene key='notificacion' component={Notificacion} title='NOTIFICACIONES '/>
                    <Scene key='evento' component={Evento} title='CREAR EVENTOS'/>
                    <Scene key='perfil' component={Perfil} title='PERFIL'/>
                    <Scene key='catalogo' component={Catalogo} title='CATALOGO'/>
                    <Scene key='verCatalogo' component={VerCatalogo} title='VER CATALOGO'/>
                    <Scene key='cargarCatalogo' component={CargarCatalogo} title='CARGAR CATALOGO'/>
                </Scene>
            </Router>
        );
    }
}

export default App;