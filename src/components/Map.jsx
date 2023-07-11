import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

export default function Map(){

    const markers = JSON.parse(localStorage.getItem('user')).destinations

    return(
        <ComposableMap>
            <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/v1/topojson-maps/world-50m.json">
                {({ geographies }) =>
                    geographies.map((geo) => <Geography fill='#f4f4f5' key={geo.rsmKey} geography={geo} />)
                }
            </Geographies>

            {
                markers.map((marker) => {
                    return (
                        <Marker coordinates={marker.coordinates}>
                            <circle r={8} fill="#F00" />
                        </Marker>
                    )
                })
            }
            
        </ComposableMap>
    )
}