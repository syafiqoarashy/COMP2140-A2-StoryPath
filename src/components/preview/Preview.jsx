import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {BackgroundGradient} from "@/components/ui/background-gradient";
import {CardContent} from "@/components/ui/card";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/**
 * Preview component displays project details and a map of locations.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.project - Project details.
 * @param {Array} props.locations - List of locations.
 * @returns {JSX.Element} The rendered component.
 */
const Preview = ({ project, locations }) => {
    const [currentLocation, setCurrentLocation] = useState('homescreen');
    const [score, setScore] = useState(0);
    const [visitedLocations, setVisitedLocations] = useState(new Set());
    const maxScore = locations.reduce((sum, loc) => sum + loc.score_points, 0);

    /**
     * Handles the change of the selected location.
     *
     * @param {string} locationId - The ID of the selected location.
     */
    const handleLocationChange = (locationId) => {
        if (locationId !== 'homescreen' && !visitedLocations.has(locationId)) {
            const location = locations.find(loc => loc.id === locationId);
            setScore(prevScore => prevScore + location.score_points);
            setVisitedLocations(prev => new Set(prev).add(locationId));
        }
        setCurrentLocation(locationId);
    };

    /**
     * Renders the map with valid locations.
     *
     * @returns {JSX.Element} The rendered map or a message if no valid locations.
     */
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

    /**
     * Renders the content based on the current location.
     *
     * @returns {JSX.Element} The rendered content for the current location.
     */
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
        <div className="preview-container flex flex-col items-center justify-center p-4 pb-20 h-fit bg-grid-white/[0.05]">
            <Select
                onValueChange={handleLocationChange}
                defaultValue="homescreen"
            >
                <SelectTrigger className="w-[280px] mb-4">
                    <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="homescreen">Homescreen</SelectItem>
                    {locations.sort((a, b) => a.location_order - b.location_order).map(location => (
                        <SelectItem key={location.id} value={location.id}>
                            {location.location_name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <BackgroundGradient className="w-[320px] rounded-3xl h-fit overflow-hidden shadow-xl bg-zinc-900">
                <CardContent className="p-0">
                    <div className="bg-black text-white p-2 text-center">
                        <span className="text-sm font-medium">{project.title}</span>
                    </div>
                    <ScrollArea className="p-4">
                        {renderContent()}
                    </ScrollArea>
                    <div className="text-black bg-gray-200 p-4 flex justify-between items-center bottom-0">
                        <span>Points: <span className="font-semibold">{score}/{maxScore}</span></span>
                        <span>Visited: <span className="font-semibold">{visitedLocations.size}/{locations.length}</span></span>
                    </div>
                </CardContent>
            </BackgroundGradient>
        </div>
    );
};

export default Preview;