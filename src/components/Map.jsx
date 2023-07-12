import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

export default function Map(){

    const [markers, setMarkers] = useState()

    useEffect(() => {
        async function getData(){
            const {id} = JSON.parse(localStorage.getItem('user'))
            const url = `http://localhost:3000/profiles/${id}`
            const response = await axios.get(url)

            const travel = response.data.destinations

            setMarkers(travel)
        } 

        getData()
    }, [])

    return(
        <ComposableMap>
            <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/v1/topojson-maps/world-50m.json">
                {({ geographies }) =>
                    geographies.map((geo) => <Geography fill='#f4f4f5' key={geo.rsmKey} geography={geo} />)
                }
            </Geographies>
            {
                markers && (markers.map((marker, index) => {
                    return (
                        <Marker coordinates={marker.coordinates} name={marker.destination} key={index}>
                            <circle r={8} fill="#F00" />
                        </Marker>
                    )
                }))
            }
            
        </ComposableMap>
    )
}