import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn: boolean

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn()
      .subscribe(resp => {
        this.isLoggedIn = resp
      }, err => {
        console.log(err)
      })

  }

  canActivate(): boolean {
    if (!this.isLoggedIn) {
      alert('Debe iniciar sesión')
      this.router.navigate(['login']);
      return false
    }
    return true
  }

}
