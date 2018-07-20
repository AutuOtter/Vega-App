import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class MakeService {

  constructor(private http: HttpClient) { }

  getMakes(): Observable<MakeService> {
    return this.http.get<MakeService>('/api/makes');
  }
}
