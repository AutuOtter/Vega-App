import { SaveVehicle } from './../models/vehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';
  private readonly featuresEndpoint = '/api/features';
  private readonly makesEndpoint = '/api/makes';

  constructor(private http: HttpClient) { }

  // LOOK UP this.http.get<VehicleService>('/api/features'); 
  // vs this.http.get('/api/features');
  getFeatures() {
    return this.http.get(this.featuresEndpoint);
  }

  getMakes() {
    return this.http.get(this.makesEndpoint);
  }

  create(vehicle) {
    return this.http.post(this.vehiclesEndpoint, vehicle);
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + '/' + id);
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
  }

  delete(id) {
    return this.http.delete(this.vehiclesEndpoint + '/' + id)
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  toQueryString(obj) {
    var parts = [];

    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }
}
