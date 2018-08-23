import { HttpClient, HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(private http: HttpClient) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log(`TokenInterceptor - ${req.url}`);

        let jsonReq: HttpRequest<any> = req.clone({
            setHeaders: {
                Authorization : `Bearer ${localStorage.getItem("access_token")}`
            }
        });

        return next.handle(jsonReq);
    }
}