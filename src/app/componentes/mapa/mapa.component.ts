import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const map = L.map('map').setView([51.505, -0.09], 13); // Latitude e Longitude iniciais

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adicionando um marcador
    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('Um marcador em Londres!')
      .openPopup();
  }
}
