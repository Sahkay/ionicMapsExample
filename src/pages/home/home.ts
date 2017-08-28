import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,
  HtmlInfoWindow
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps) {
  }
  
  ngAfterViewInit() {
    this.loadMap();
  }
  
  markers = [];
  
  loadMap() {
    let element: HTMLElement = document.getElementById('map');
    
    let map: GoogleMap = this.googleMaps.create(element);
    
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        let position: CameraPosition<LatLng> = {
          target: new LatLng(43.0741904, -89.3809802),
          zoom: 18
        };
        map.moveCamera(position);
        let marker1: MarkerOptions = {
          position: new LatLng(43.0742104, -89.3813811)
        }
        let infoWindow = new HtmlInfoWindow();
        infoWindow.setContent("Marker");
        map.addMarker(marker1).then((marker: Marker) => {
          marker.one(GoogleMapsEvent.MARKER_CLICK).then(() => {
            infoWindow.close();
            infoWindow.open(marker);
          });
          this.markers[this.markers.length] = marker;
        })
        let marker2: MarkerOptions = {
          position: new LatLng(43.0744161, -89.3814267)
        }
        map.addMarker(marker2).then((marker: Marker) => {
          marker.one(GoogleMapsEvent.MARKER_CLICK).then(() => {
            infoWindow.close();
            infoWindow.open(marker);
          });
          this.markers[this.markers.length] = marker;
        })
      }
    )
  }

}
