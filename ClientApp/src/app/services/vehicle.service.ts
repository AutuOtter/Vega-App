import { SaveVehicle } from './../models/vehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) { }

  // LOOK UP this.http.get<VehicleService>('/api/features'); 
  // vs this.http.get('/api/features');
  getFeatures() {
    return this.http.get('/api/features');
  }

  getMakes() {
    return this.http.get('/api/makes');
  }

  create(vehicle) {
    return this.http.post('/api/vehicles', vehicle);
  }

  getVehicle(id) {
    return this.http.get('/api/vehicles/' + id);
  }

  update(vehicle: SaveVehicle) {
    return this.http.put('/api/vehicles/' + vehicle.id, vehicle)
  }

  delete(id) {
    return this.http.delete('/api/vehicles/' + id)
  }
}
