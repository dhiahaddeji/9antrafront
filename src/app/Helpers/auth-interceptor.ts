import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserAuthService } from "../MesServices/user-auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: UserAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('No-Auth') === 'True') {
      return next.handle(request.clone({ headers: request.headers.delete('No-Auth') }));
    }

    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request);
  }
}