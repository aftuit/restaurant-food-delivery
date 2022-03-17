import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: 41.311081,
    lng: 69.240562
};

const mapAPIKey = "AIzaSyBg33f-iEoZaA1wEVVqKiPquhdWacg3Dh0";

function GoogleMapContent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapAPIKey
    })

    const [, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={20}
            onLoad={onLoad}
            onUnmount={onUnmount}
            initialCenter={center}
        >
            <Marker position={{lat: 41.311081, lng: 69.240562}}>
                {/* <img src="/assets/icn/location.svg" alt="" /> */}
            </Marker>
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(GoogleMapContent)