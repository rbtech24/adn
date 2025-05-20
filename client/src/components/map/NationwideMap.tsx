import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, MapPin } from 'lucide-react';

// Fix for default marker icons in react-leaflet
// This is needed because the default markers reference assets that aren't properly bundled
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Define a custom icon
const customIcon = new Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Interface for location data
interface LocationData {
  lat: number;
  lng: number;
  city: string;
  state: string;
  userCount: number;
}

// Sample data for community locations
const sampleLocations: LocationData[] = [
  { lat: 40.7128, lng: -74.0060, city: "New York", state: "NY", userCount: 248 },
  { lat: 34.0522, lng: -118.2437, city: "Los Angeles", state: "CA", userCount: 186 },
  { lat: 41.8781, lng: -87.6298, city: "Chicago", state: "IL", userCount: 142 },
  { lat: 29.7604, lng: -95.3698, city: "Houston", state: "TX", userCount: 98 },
  { lat: 33.4484, lng: -112.0740, city: "Phoenix", state: "AZ", userCount: 76 },
  { lat: 39.9526, lng: -75.1652, city: "Philadelphia", state: "PA", userCount: 68 },
  { lat: 32.7767, lng: -96.7970, city: "Dallas", state: "TX", userCount: 65 },
  { lat: 37.7749, lng: -122.4194, city: "San Francisco", state: "CA", userCount: 59 },
  { lat: 47.6062, lng: -122.3321, city: "Seattle", state: "WA", userCount: 52 },
  { lat: 39.7392, lng: -104.9903, city: "Denver", state: "CO", userCount: 43 },
  { lat: 36.1699, lng: -115.1398, city: "Las Vegas", state: "NV", userCount: 38 },
  { lat: 30.2672, lng: -97.7431, city: "Austin", state: "TX", userCount: 36 },
  { lat: 39.2904, lng: -76.6122, city: "Baltimore", state: "MD", userCount: 29 },
  { lat: 35.2271, lng: -80.8431, city: "Charlotte", state: "NC", userCount: 27 },
  { lat: 25.7617, lng: -80.1918, city: "Miami", state: "FL", userCount: 24 }
];

export default function NationwideMap() {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user's location using geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Get city and state from coordinates using a reverse geocoding API
            // For demo purposes, we'll find the closest city from our sample data
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // Find the closest city in our sample data
            let closestCity = sampleLocations[0];
            let closestDistance = calculateDistance(
              userLat, userLng, 
              closestCity.lat, closestCity.lng
            );
            
            sampleLocations.forEach(location => {
              const distance = calculateDistance(
                userLat, userLng, 
                location.lat, location.lng
              );
              
              if (distance < closestDistance) {
                closestDistance = distance;
                closestCity = location;
              }
            });
            
            // Set the user location to the closest city
            // In a real app, we would use a geocoding service to get the exact city
            setUserLocation({
              lat: userLat,
              lng: userLng,
              city: closestDistance < 100 ? closestCity.city : "Your Location",
              state: closestDistance < 100 ? closestCity.state : "",
              userCount: 1
            });
          } catch (error) {
            console.error("Error getting location details:", error);
            setLocationError("Failed to get your city information.");
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError("Unable to access your location. Please enable location services.");
          setIsLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  }, []);

  // Helper function to calculate distance between two points (haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  return (
    <Card className="w-full shadow-md mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl flex items-center">
          <MapPin className="mr-2 h-6 w-6 text-primary" />
          Auto Detailing Nation Community Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        {locationError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription>
              {locationError}
            </AlertDescription>
          </Alert>
        )}
        
        <div style={{ height: '400px', width: '100%', position: 'relative' }}>
          <MapContainer 
            center={[39.8283, -98.5795]} // Center of USA
            zoom={4} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Display community member locations */}
            {sampleLocations.map((location, index) => (
              <Marker 
                key={index} 
                position={[location.lat, location.lng]}
                icon={customIcon}
              >
                <Popup>
                  <strong>{location.city}, {location.state}</strong>
                  <br />
                  {location.userCount} community {location.userCount === 1 ? 'member' : 'members'}
                </Popup>
              </Marker>
            ))}
            
            {/* Display user location if available */}
            {userLocation && (
              <Marker 
                position={[userLocation.lat, userLocation.lng]}
                icon={customIcon}
              >
                <Popup>
                  <strong>Your Location</strong>
                  <br />
                  {userLocation.city}{userLocation.state ? `, ${userLocation.state}` : ''}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">
          Our community spans across the nation with over 1,000 detailing enthusiasts. 
          Join detailers in your area or connect with professionals nationwide.
        </p>
      </CardContent>
    </Card>
  );
}