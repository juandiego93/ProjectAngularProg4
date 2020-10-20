import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.model'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  DBUsers: any = []
  isLogginSubject = new BehaviorSubject<boolean>(this.hasToken())
  JWT: string
  server: string = 'http://localhost:3000'

  constructor(private router: Router, private http: HttpClient) {
    this.loadDBUsers()
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token')
  }

  async login(user: UserModel) {
    try {
      const searchUser = this.searchUserForLogin(user)
      if (searchUser) {
        alert(`Bienvenido`)
        const send = { id: user.username, email: user.email, pass: user.password }
        this.JWT = this.createToken(send)
        localStorage.setItem('token', `${this.JWT}`)
        localStorage.setItem('nameUser', `${searchUser.nameUser}`)
        this.isLogginSubject.next(true)
        setTimeout(() => { this.router.navigate(['/user']) }, 1000)
      } else {
        alert('Usuario no registrado o Credenciales inválidas')
      }
    } catch (error) {
      this.logout()
      console.log(error);
    }
  }

  searchUserForLogin(userLogin) {
    const arrayUsers = this.DBUsers

    let findUser = arrayUsers.find(user => {
      if (userLogin.email == user.email || userLogin.password == user.password) {
        return user
      }
    })
    return findUser
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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

  loadDBUsers() {
    this.http.get(`${this.server}/loadUsers`)
      .subscribe(
        resp => {
          this.DBUsers = resp
        })
      , err => {
        console.log(err);
      }
  }

  loadDBGames() {
    this.http.get(`${this.server}/loadUsers`)
      .subscribe(
        resp => {
          this.DBUsers = resp
        })
      , err => {
        console.log(err);
      }
  }

  registerUser(user) {
    try {
      this.http.post(`${this.server}/createUser`, user)
        .subscribe(
          resp => {
            if (resp['status']) {
              alert(resp['message'])
              this.router.navigate(['/login'])
            }
          })
        , err => {
          console.log(err);
        }
    } catch (error) {
      console.log(error);
    }
  }

}
