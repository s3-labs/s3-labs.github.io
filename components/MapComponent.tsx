'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapComponent() {
  useEffect(() => {
    // Prevent map from initializing on server
    if (typeof window === 'undefined') return

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const mapElement = document.getElementById('map')
      if (!mapElement) return

      // Create map
      const map = L.map('map').setView([21.2461, 81.318], 15)

      // Add tile layer from OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      // Create custom marker with blue color
      const markerIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDMyIDQwIj48cGF0aCBmaWxsPSIjMWU0MGFmIiBkPSJNMTYgMEM3LjIgMCAwIDcuMiAwIDE2YzAgOC44IDcuMiAxNiAxNiAxNmM0LjQgMCA4LjgtMS42IDEyLTQuOEMzMS4yIDMwIDMyIDI4IDMyIDE2YzAtOC44LTcuMi0xNi0xNi0xNnoiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI2IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
      })

      // Add marker at the location
      L.marker([21.2461, 81.318], { icon: markerIcon })
        .bindPopup('<div style="text-align:center;"><strong>S3 Lab</strong><br/>IIT Bhilai<br/>21.2461°N, 81.3180°E</div>')
        .addTo(map)
        .openPopup()

      return () => {
        map.remove()
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      id="map"
      className="w-full h-full rounded-2xl"
      style={{ height: '100%', width: '100%' }}
    />
  )
}
