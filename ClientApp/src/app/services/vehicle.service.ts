import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) { }

  getFeatures(): Observable<VehicleService> {
    return this.http.get<VehicleService>('/api/features');
  }
  getMakes(): Observable<VehicleService> {
    return this.http.get<VehicleService>('/api/makes');
  }
}
