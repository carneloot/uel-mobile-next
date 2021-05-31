import { Loader } from '@googlemaps/js-api-loader';
import { FunctionComponent, useEffect, useRef } from 'react';

import { Local } from '@interfaces/categoria.interface';
import styles from '@styles/components/GoogleMaps.module.scss';

interface GoogleMapsProps {
    className?: string;

    local: Local;
    dest?: Local;
}

const GoogleMaps: FunctionComponent<GoogleMapsProps> = ({ local, className, dest }) => {
    const mapRef = useRef<HTMLDivElement>();
    const markers: google.maps.Marker[] = [];
    let map: google.maps.Map;
    let directionsService: google.maps.DirectionsService;
    let directionsDisplay: google.maps.DirectionsRenderer;

    useEffect(() => {
        let loader: Loader;
        const loadMap = async () => {
            const mapElement = mapRef.current;

            loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            });
            await loader.load();

            map = new google.maps.Map(mapElement, {
                center: local,
                zoom: 18,
                disableDefaultUI: true,
                draggable: true,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: false,
                mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
            });

            directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

            addMarker(local, local.titulo);

            if (dest) {
                addMarker(dest, dest.titulo);

                await setRoute({ lat: local.lat, lng: local.lng }, { lat: dest.lat, lng: dest.lng });
            }
        }

        loadMap();

        return () => {
            loader.deleteScript();
        }
    }, [local, dest]);

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

    const setRoute = async (from: google.maps.LatLngLiteral, to: google.maps.LatLngLiteral, travelMode = google.maps.TravelMode.WALKING) => {
        return new Promise<void>(resolve => {
            directionsService.route({
                origin: from,
                destination: to,
                travelMode,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                    return resolve();
                }

                console.log(status, result);
            });
        })
    }

    return <div className={[className ?? '', styles.map].join(' ')} ref={mapRef}></div>;
}

export default GoogleMaps;
