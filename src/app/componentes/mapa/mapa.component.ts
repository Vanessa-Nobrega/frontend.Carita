import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-mapa',
  standalone: true,
  template: `<div id="map" style="height: 100vh;"></div>`,
})
export class MapaComponent implements AfterViewInit {
  private map!: L.Map;
  private userMarker!: L.Marker;
  private routingControl: any;

  // Simulação de pontos de doação ( buscar do backend depois)
  pontosDoacao = [
    { nome: 'ONG Esperança', lat: -23.5629, lng: -46.6544 },
    { nome: 'Centro Animal', lat: -23.567, lng: -46.649 },
    { nome: 'DoaPet SP', lat: -23.559, lng: -46.661 }
  ];

  ngAfterViewInit(): void {
    this.initMap();
    this.getUserLocation();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-23.5445, -47.4376], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const userLatLng = L.latLng(pos.coords.latitude, pos.coords.longitude);

        this.userMarker = L.marker(userLatLng, {
          icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          })
        }).addTo(this.map).bindPopup('Você está aqui').openPopup();

        this.map.setView(userLatLng, 14);

        this.mostrarPontosDeDoacao(userLatLng);
      });
    }
  }

  private mostrarPontosDeDoacao(userLatLng: L.LatLng): void {
    this.pontosDoacao.forEach(ponto => {
      const marker = L.marker([ponto.lat, ponto.lng])
        .addTo(this.map)
        .bindPopup(ponto.nome)
        .on('click', () => {
          this.tracarRota(userLatLng, L.latLng(ponto.lat, ponto.lng));
        });
    });
  }

  private tracarRota(origem: L.LatLng, destino: L.LatLng): void {
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    this.routingControl = L.Routing.control({
      waypoints: [origem, destino],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
      }),
      show: false,
      addWaypoints: false,
      routeWhileDragging: false
    }).addTo(this.map);
  }
}
