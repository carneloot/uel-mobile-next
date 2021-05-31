import { Loader } from '@googlemaps/js-api-loader';
import { FunctionComponent, useEffect, useRef } from 'react';

import styles from '@styles/components/GoogleMaps.module.scss';

interface GoogleMapsProps {
    className?: string;
    centerName?: string;
    center: google.maps.LatLngLiteral;
}

const GoogleMaps: FunctionComponent<GoogleMapsProps> = (props) => {
    const mapRef = useRef<HTMLDivElement>();
    const markers: google.maps.Marker[] = [];
    let map: google.maps.Map;

    useEffect(() => {
        const loadMap = async () => {
            const mapElement = mapRef.current;

            const loader = new Loader({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY });
            await loader.load();

            map = new google.maps.Map(mapElement, {
                center: props.center,
                zoom: 18,
                disableDefaultUI: true,
                draggable: true,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: false,
                mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
            });

            addMarker(props.center, props.centerName)

        }

        loadMap();
    });

    const addMarker = (position: google.maps.LatLngLiteral, title = '') => {
        const marker = new google.maps.Marker({
            position,
            map,
            animation: google.maps.Animation.DROP,
            title,
        });

        markers.push(marker);
    }

    const removeMarker = (index: number) => {
        markers[index].setMap(null);
        markers.splice(index, 1);
    }

    return <div className={[props.className ?? '', styles.map].join(' ')} ref={mapRef}></div>;
}

export default GoogleMaps;
