import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

interface LiveTripMapProps {
  pickupCoords?: [number, number];
  dropCoords?: [number, number];
  isDeviated?: boolean;
}

export const LiveTripMap: React.FC<LiveTripMapProps> = ({
  pickupCoords = [12.9750, 77.6000],
  dropCoords = [12.9352, 77.6245],
  isDeviated = false,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const carMarkerRef = useRef<L.Marker | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const deviationPolylineRef = useRef<L.Polyline | null>(null);

  const [carProgress, setCarProgress] = useState(0.45); // 0 to 1

  // Waypoints for normal route
  const normalRoute: [number, number][] = [
    pickupCoords,
    [12.9670, 77.6060],
    [12.9580, 77.6120],
    [12.9480, 77.6180],
    [12.9400, 77.6210],
    dropCoords,
  ];

  // Waypoints for deviation route
  const deviationRoute: [number, number][] = [
    [12.9580, 77.6120],
    [12.9550, 77.6020], // diverted west by 700m
    [12.9500, 77.5980],
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const centerLat = (pickupCoords[0] + dropCoords[0]) / 2;
    const centerLng = (pickupCoords[1] + dropCoords[1]) / 2;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 13,
      zoomControl: true,
      attributionControl: false,
    });
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Green Pickup Icon
    const greenPickupIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="background-color: #2E7D32; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; font-size: 14px;">
          📍
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Red Drop Icon
    const redDropIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="background-color: #D32F2F; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; font-size: 14px;">
          🏢
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Blue Car Icon
    const blueCarIcon = L.divIcon({
      className: 'custom-leaflet-car-marker',
      html: `
        <div style="background: linear-gradient(135deg, #1976D2, #0D47A1); color: white; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(25,118,210,0.5); border: 2.5px solid white; font-size: 18px; transform: rotate(15deg);">
          🚗
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });

    // Add Pickup & Drop markers
    L.marker(pickupCoords, { icon: greenPickupIcon })
      .addTo(map)
      .bindPopup('<b>Pickup Point</b><br/>Richmond Circle, 08:30 AM');

    L.marker(dropCoords, { icon: redDropIcon })
      .addTo(map)
      .bindPopup('<b>Drop Point</b><br/>Acme Tech Park Tower B');

    // Add Route Polyline
    const routeLine = L.polyline(normalRoute, {
      color: '#1976D2',
      weight: 5,
      opacity: 0.85,
      lineCap: 'round',
    }).addTo(map);
    routePolylineRef.current = routeLine;

    // Calculate initial car position
    const carPos: [number, number] = isDeviated
      ? [12.9550, 77.6020]
      : [12.9580, 77.6120];

    const carMarker = L.marker(carPos, { icon: blueCarIcon })
      .addTo(map)
      .bindPopup('<b>Sneha Rao (Driver)</b><br/>Baleno · 42 km/h · ETA 8 mins');
    carMarkerRef.current = carMarker;

    // If deviated, add red dashed deviation line
    if (isDeviated) {
      const devLine = L.polyline(deviationRoute, {
        color: '#E91E63',
        weight: 4,
        dashArray: '6, 8',
        opacity: 0.9,
      }).addTo(map);
      deviationPolylineRef.current = devLine;
    }

    map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [pickupCoords, dropCoords, isDeviated]);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Real-time map badges */}
      <div className="absolute top-3 left-3 z-[400] flex flex-col gap-2">
        <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>GPS Live: 42 km/h · Inner Ring Road</span>
        </div>

        {isDeviated && (
          <div className="bg-rose-50 border border-rose-300 text-rose-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 animate-bounce-subtle">
            <span>⚠️</span>
            <span>Route Deviation Detected: +700m Off Path</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-3 right-3 z-[400] bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#1976D2]" />
        <span>Blue Line: Approved Office Corridor</span>
      </div>
    </div>
  );
};
