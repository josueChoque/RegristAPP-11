import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentificarService } from './Servicios/autentificar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AutentificarService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (route.url.toString().includes('profesor')) {
        // No requiere autenticación para la página del profesor
        return true;
      }

    if(this.auth.autentificado){
      return true;
    } else{
      this.router.navigate(['/login']);
      return false;
    }
    
      
  }
  
}
