import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogginSubject = new BehaviorSubject<boolean>(this.hasToken())
  JWT: string
  constructor(private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token')
  }

  login(email: string, pass: string): void {
    const user = { email, pass }
    this.JWT = this.createToken(user)
    localStorage.setItem('token', `${this.JWT}`)
    this.isLogginSubject.next(true)
    setTimeout(() => { this.router.navigate(['/user']) }, 1000)
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('auth_token')
    this.isLogginSubject.next(false)
    setTimeout(() => { this.router.navigate(['/']) }, 1000)
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogginSubject.asObservable()
  }

  private createToken(user): string {
    const KEY = new Date().getMilliseconds()
    const jwtBearerToken = jwt.sign({ user }, `${KEY}`)
    console.log(jwtBearerToken)
    return jwtBearerToken
  }

}
