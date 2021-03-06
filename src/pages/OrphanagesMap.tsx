import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import mapIcon from "../utils/mapIcon";

import mapMakerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import api from "../services/api";

interface Orphanage {
	id:number;
	latitude:number;
	longitude: number;
	name: string;
}


function OrphanagesMap() {

	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	useEffect(() => {
		api.get('orphanages').then(response => {
			setOrphanages(response.data);
		})
	}, [])

	return (
		<div id="page-map">
			<aside>
				<img src={mapMakerImg} alt="Happy"/>

				<h2>Escolha um orfanato no mapa</h2>
				<p>Muitas crianças estão esperarndo sua visita :)</p>

				<footer>
					<strong>Luziânia</strong>
					<span>Goiás</span>
				</footer>
			</aside>

			<Map
				center={[-16.2569051, -47.9515105]}
				zoom={15}
				style={{width: '100%', height: '100%'}}
			>
				<TileLayer
					url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
				/>
				{orphanages.map(orphanage => {
					return (

						<Marker
							key={orphanage.id}
							icon={mapIcon}
							position={[orphanage.latitude,orphanage.longitude]}
						>
							<Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
								{orphanage.name}
								<Link to={`/orphanages/${orphanage.id}`}>
									<FiArrowRight size={20} color="#fff"></FiArrowRight>
								</Link>
							</Popup>
						</Marker>
					)
				})}
			</Map>

			<Link to="/orphanages/create" className="create-orphanage">
				<FiPlus size={32} color="#fff"/>
			</Link>
		</div>
	)
}

export default OrphanagesMap;