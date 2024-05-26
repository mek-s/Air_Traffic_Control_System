// src/MapComponent.js
import React, { useRef, useEffect, useState } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import mapboxgl, { LngLat } from 'mapbox-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import fetchPlanesData from './planesData'; 
import { toast } from 'react-toastify';
const mapboxToken = 'pk.eyJ1IjoiaGV5aGVsbG8yIiwiYSI6ImNsd2tnOGlqODBtc2Yycm56MTNpZWxsbWYifQ.5N9Boh0pp-L0my9M3_ilDg';
    const MapComponent = () => {
      const [planes, setPlanes] = useState([]);
      const [error, setError] = useState(null);
      useEffect(() => {
        const getData = async () => {
          try {
            const data = await fetchPlanesData();
            setPlanes(data);
          } catch (error) {
            setError(error.message);
            toast.error(error.message);
          }
        };
    
        getData();
      }, []);

        const [viewport, setViewport] = useState({
            latitude: 36.7372,
            longitude: 3.0877,
            zoom: 9,
            width: '100%',
            height: '100%'
          });
            
        const getCircleCoordinates = (center, radius) => {
            const numSegments = 100;
            const coordinates = [];
            for (let i = 0; i < numSegments; i++) {
              const angle = (i / numSegments) * Math.PI * 2;
              const dx = radius * Math.cos(angle);
              const dy = radius * Math.sin(angle);
              const lng = center[0] + (dx / (111.32 * Math.cos(center[1] * Math.PI / 180)));
              const lat = center[1] + (dy / 111.32);
              coordinates.push([lng, lat]);
            }
            return coordinates;
          };
        
          const circleCenter = [3.208993132681371, 36.7372];
          const circleRadiusKm = 30;
          const circleCoordinates = getCircleCoordinates(circleCenter, circleRadiusKm);
          const [selectedPlane, setSelectedPlane] = useState(null);
          const handlePointClick = (event) => {
            const { lngLat } = event;
            console.log(event);
            console.log(LngLat);
            if (!lngLat) return;
            const clickedCoordinates = [lngLat.lng, lngLat.lat];
            console.log(clickedCoordinates);
            const nearestPlane = planes.reduce((nearest, plane) => {
              const distance = plane.path.reduce((min, point) => {
                const pointDistance = Math.sqrt(
                  Math.pow(point.lng - clickedCoordinates[0], 2) +
                  Math.pow(point.lat - clickedCoordinates[1], 2)
                );
                return Math.min(min, pointDistance);
              }, Infinity);
              return distance < nearest.distance ? { plane, distance } : nearest;
            }, { plane: null, distance: Infinity }).plane;
            console.log(nearestPlane.id);
            setSelectedPlane(nearestPlane ? nearestPlane : null);

          };
        
        return (
            <>
            <div className=' w-full h-screen '>
          <MapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/light-v10"
            mapboxAccessToken={mapboxToken}
            onViewportChange={(newViewport) => setViewport(newViewport)}
            onClick={handlePointClick}
          >
      <Source id="circle" type="geojson" data={{
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [circleCoordinates]
        }
      }}>
        <Layer
          id="circle"
          type="fill"
          source="circle"
          paint={{
            'fill-color': '#f2cc73',
            'fill-opacity': 0.2
          }}
          
        />
      </Source>
      {planes.map(plane => (
          <Source
            key={plane.id}
            id={plane.id}
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: plane.path.map(point => ({
                type: 'Feature',
                properties: { id: plane.id },
                geometry: {
                  type: 'Point',
                  coordinates: [point.lng, point.lat]
                },
              }))
            }}
          >
            <Layer
              id={plane.id}
              type="circle"
              source={plane.id}
              paint={{
                'circle-color': plane.color,
                'circle-radius': 4
              }}
            />
          </Source>
      ))};
      </MapGL>
      {selectedPlane && (
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'white', padding: 20 , borderRadius: 15 , color:selectedPlane.color }}>
          <p>Name: {selectedPlane.name}</p>
          <p>Speed: {selectedPlane.speed}</p>
          <p>Actual Position : [{selectedPlane.path[selectedPlane.path.length - 1 ].lat} ,  {selectedPlane.path[selectedPlane.path.length - 1 ].lng} ]</p>
        </div>
      )}
      </div>
    </>
  );
};
export default MapComponent;