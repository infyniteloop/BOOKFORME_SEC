import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
 
import { TokenStorageService } from './token-storage.service';
 
const TOKEN_HEADER_KEY = 'Authorization';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    constructor(private token: TokenStorageService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log(" \n>>>>>>>>>> AuthInterceptor / intercept");
        console.log(" \n Request Before Intercept: " + JSON.stringify(req));
        let authReq = req;
        console.log(" \n---------- : Calling getToken");
        const token = this.token.getToken();
        if (token != null) {
            console.log(" \n>>>>>>>>>> Token Present " + token);
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        else
        {
            console.log(" \n>>>>>>>>>> Token NULL");
        }
        console.log(" \n Request After Intercept: " + JSON.stringify(authReq));
        return next.handle(authReq);
    }
}
 
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];