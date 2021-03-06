import React, {useEffect, useState} from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import mapIcon from '../utils/mapIcon'

import mapMarkerImg from '../images/map-marker.svg';
import {Link} from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import '../styles/pages/orphanages-map.css'
import api from '../services/api';

interface Orphanage{
    id: number,
    latitude: number,
    longitude: number,
    name: string,
}
function OrphanagesMap(){

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    //qual ação executar e quando executar
    useEffect(()=>{
        api.get('orphanages')
        .then(response =>{
            setOrphanages(response.data)
        })
    },[]);


    return(
       <div id="page-map">
           <aside>
               <header>
                   <img src={mapMarkerImg} alt="Happy"/>
                   <h2>Escolha um orfanato no mapa</h2>
                   <p>Muitas crianças estão esperando a sua visita :)</p>
               </header>
               <footer>
                <strong>Curitiba</strong>
                <span>Paraná</span>
               </footer>
           </aside>
           <Map 
           center={[-25.4932835,-49.2537338]}
            zoom={15}
            style={{width:'100%', height:'100%'}}>
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>

                {orphanages.map(orphanage =>{
                    return(                
                    <Marker 
                        position={[orphanage.latitude, orphanage.longitude]} 
                        icon = {mapIcon}
                        key= {orphanage.id}
                        
                        >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup"> 
                          {orphanage.name}
                          <Link to={`orphanages/${orphanage.id}`}>
                              <FiArrowRight size={32} color="#FFF"/>
                          </Link>
                        </Popup> 
  
                  </Marker>
                  )

                })}



            </Map>

           <Link to='/orphanages/create' className="create-orphanage">
               <FiPlus size={32} color="#FFF"/>
           </Link>
       </div>
    );
}

export default OrphanagesMap;