import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Preview = ({ project, locations }) => {
    const [currentLocation, setCurrentLocation] = useState('homescreen');
    const [score, setScore] = useState(0);
    const [visitedLocations, setVisitedLocations] = useState(new Set());

    const handleLocationChange = (locationId) => {
        if (locationId !== 'homescreen' && !visitedLocations.has(locationId)) {
            const location = locations.find(loc => loc.id === locationId);
            setScore(prevScore => prevScore + location.score_points);
            setVisitedLocations(prev => new Set(prev).add(locationId));
        }
        setCurrentLocation(locationId);
    };

    const renderMap = () => {
        const validLocations = locations.filter(loc => {
            const [lat, lng] = loc.location_position.replace(/[()]/g, '').split(',').map(coord => parseFloat(coord.trim()));
            return !isNaN(lat) && !isNaN(lng);
        });

        if (validLocations.length === 0) {
            return <div>No valid locations to display on the map</div>;
        }

        const centerLat = validLocations.reduce((sum, loc) => {
            const [lat] = loc.location_position.replace(/[()]/g, '').split(',').map(coord => parseFloat(coord.trim()));
            return sum + lat;
        }, 0) / validLocations.length;

        const centerLng = validLocations.reduce((sum, loc) => {
            const [, lng] = loc.location_position.replace(/[()]/g, '').split(',').map(coord => parseFloat(coord.trim()));
            return sum + lng;
        }, 0) / validLocations.length;

        return (
            <MapContainer center={[centerLat, centerLng]} zoom={13} style={{ height: '300px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {validLocations.map(location => {
                    const [lat, lng] = location.location_position.replace(/[()]/g, '').split(',').map(coord => parseFloat(coord.trim()));
                    return (
                        <Marker key={location.id} position={[lat, lng]}>
                            <Popup>{location.location_name}</Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        );
    };

    const renderContent = () => {
        if (currentLocation === 'homescreen') {
            return (
                <div>
                    <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
                    <p className="mb-4">{project.instructions}</p>
                    {project.homescreen_display === 'Display initial clue' && <p className="italic">{project.initial_clue}</p>}
                    {project.homescreen_display === 'Display all locations' && (
                        <ul className="list-disc list-inside">
                            {locations.map(location => (
                                <li key={location.id}>{location.location_name}</li>
                            ))}
                        </ul>
                    )}
                    {project.homescreen_display === 'Display map' && renderMap()}
                </div>
            );
        } else {
            const location = locations.find(loc => loc.id === currentLocation);
            return (
                <div>
                    <h2 className="text-xl font-bold mb-4">{location.location_name}</h2>
                    <div className="mb-4" dangerouslySetInnerHTML={{ __html: location.location_content }} />
                    {location.clue && <p className="italic">Clue: {location.clue}</p>}
                </div>
            );
        }
    };

    return (
        <div className="preview-container flex flex-col items-center justify-center p-4 pb-20 h-fit">
            <Select
                onValueChange={handleLocationChange}
                defaultValue="homescreen"
            >
                <SelectTrigger className="w-[280px] mb-4">
                    <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="homescreen">Homescreen</SelectItem>
                    {locations.map(location => (
                        <SelectItem key={location.id} value={location.id}>
                            {location.location_name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Card className="w-[320px] h-fit overflow-hidden shadow-xl">
                <CardContent className="p-0">
                    <div className="bg-black text-white p-2 text-center">
                        <span className="text-sm">{project.title}</span>
                    </div>
                    <ScrollArea className="p-4">
                        {renderContent()}
                    </ScrollArea>
                    <div className="bg-gray-200 p-2 flex justify-between items-center bottom-0">
                        <span>Points: {score}</span>
                        <span>Visited: {visitedLocations.size}/{locations.length}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Preview;