import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {

  constructor(private http: HttpClient) { }

  getPhotos(vehicleId) {
    return this.http.get(`/api/vehicles/${vehicleId}/photos`)
  }

  upload(vehicleId, photo) {
    /* I used code from Mosh, but I also used code from
     * stuartaccent/file-uploader.component.html on GitHub
     * 
     * This probably doesn't follow proper conventions
     * and is definintly flawed. This also lacks validation.
     * You've been warned.....
    */

    var formData = new FormData();
    formData.append('file', photo);
    
    const req  = new HttpRequest('POST', `/api/vehicles/${vehicleId}/photos`, formData, {
      reportProgress: true
    });

    this.http.request(req).subscribe(
      (event: any) => {this.getEventMessage(event, photo)}
    );
    
    return;
  }

  getEventMessage(event, photo) {
    switch (event.type) {
      case HttpEventType.Sent:
        return;

      case HttpEventType.UploadProgress:
        var percentDone = Math.round(event.loaded / event.total * 100);
        console.log(`Your file is ${percentDone}% uploaded of ${event.total} bytes total.`);
        return;

      case HttpEventType.ResponseHeader:
      case HttpEventType.DownloadProgress:
        return;

      case HttpEventType.Response:
        console.log(`Your file was completely uploaded!`);
        return;

      default:
        console.log(`Your file had a surprising upload event: ${event.type}.`);
        return;
    }
  }
}
