import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from '../../../node_modules/rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) { }

  getFeatures() {
    return this.http.get<VehicleService>('/api/features');
  }

  getMakes() {
    return this.http.get<VehicleService>('/api/makes');
  }

  create(vehicle) {
    return this.http.post('/api/vehicles', vehicle);
  }
}
