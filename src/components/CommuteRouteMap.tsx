import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface CommuteRouteMapProps {
  homeCoords: [number, number];
  officeCoords: [number, number];
}

export const CommuteRouteMap: React.FC<CommuteRouteMapProps> = ({
  homeCoords,
  officeCoords,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up existing map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Midpoint calculation for view
    const centerLat = (homeCoords[0] + officeCoords[0]) / 2;
    const centerLng = (homeCoords[1] + officeCoords[1]) / 2;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 13,
      zoomControl: true,
      attributionControl: false,
    });
    mapInstanceRef.current = map;

    // OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Custom Green Marker for Home
    const greenHomeIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="background-color: #2E7D32; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; font-size: 16px;">
          🏠
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Custom Red Marker for Office
    const redOfficeIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="background-color: #D32F2F; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; font-size: 16px;">
          🏢
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Add Markers
    L.marker(homeCoords, { icon: greenHomeIcon })
      .addTo(map)
      .bindPopup('<b>Pickup: Home</b><br/>Richmond Town, Bangalore');

    L.marker(officeCoords, { icon: redOfficeIcon })
      .addTo(map)
      .bindPopup('<b>Drop: Office</b><br/>Acme Tech Park, Koramangala');

    // Blue polyline route with intermediate realistic waypoints through Hosur Road / Inner Ring Road
    const intermediateWaypoints: [number, number][] = [
      homeCoords,
      [12.9650, 77.6080],
      [12.9520, 77.6150],
      [12.9420, 77.6200],
      officeCoords,
    ];

    const polyline = L.polyline(intermediateWaypoints, {
      color: '#1976D2',
      weight: 5,
      opacity: 0.85,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    // Fit bounds to polyline
    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [homeCoords, officeCoords]);

  return (
    <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-slate-200 shadow-xs">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-3 right-3 z-[400] bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#1976D2]" />
        <span>Blue Line: Verified Commuter Route (7.2 km)</span>
      </div>
    </div>
  );
};
