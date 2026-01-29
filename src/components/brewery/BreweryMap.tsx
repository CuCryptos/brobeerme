"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Brewery } from "@/lib/types";
import Link from "next/link";

// Custom amber marker icon
const breweryIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div style="
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    border: 3px solid #fbbf24;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <span style="transform: rotate(45deg); font-size: 14px;">🍺</span>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const activeIcon = new L.DivIcon({
  className: "custom-marker-active",
  html: `<div style="
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    border: 3px solid #fff;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <span style="transform: rotate(45deg); font-size: 18px;">🍺</span>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function FlyToBrewery({ brewery }: { brewery: Brewery | null }) {
  const map = useMap();
  useEffect(() => {
    if (brewery) {
      map.flyTo([brewery.location.lat, brewery.location.lng], 14, {
        duration: 1,
      });
    }
  }, [brewery, map]);
  return null;
}

interface BreweryMapProps {
  breweries: Brewery[];
  activeBrewery?: Brewery | null;
  onMarkerClick?: (brewery: Brewery) => void;
  className?: string;
}

export function BreweryMap({
  breweries,
  activeBrewery = null,
  onMarkerClick,
  className = "",
}: BreweryMapProps) {
  const center: [number, number] = [30.2672, -97.7431]; // Austin, TX

  return (
    <div className={`overflow-hidden rounded-2xl ${className}`}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%", minHeight: 400 }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <FlyToBrewery brewery={activeBrewery} />
        {breweries.map((brewery) => (
          <Marker
            key={brewery.id}
            position={[brewery.location.lat, brewery.location.lng]}
            icon={
              activeBrewery?.id === brewery.id ? activeIcon : breweryIcon
            }
            eventHandlers={{
              click: () => onMarkerClick?.(brewery),
            }}
          >
            <Popup>
              <div className="min-w-[200px] p-1">
                <h3 className="mb-1 text-base font-bold text-stone-900">
                  {brewery.name}
                </h3>
                <p className="mb-1 text-xs text-stone-600">
                  {brewery.location.address}, {brewery.location.city}
                </p>
                <div className="mb-2 flex items-center gap-1">
                  <span className="text-amber-500">★</span>
                  <span className="text-sm font-medium text-stone-700">
                    {brewery.rating}
                  </span>
                  <span className="text-xs text-stone-500">
                    ({brewery.reviewCount})
                  </span>
                </div>
                <Link
                  href={`/breweries/${brewery.slug}`}
                  className="text-xs font-semibold text-amber-600 hover:text-amber-700"
                >
                  View Details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
