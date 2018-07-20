import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class FeatureService {

  constructor(private http: HttpClient) { }

  getFeatures(): Observable<FeatureService> {
    return this.http.get<FeatureService>('/api/features');
  }

}
