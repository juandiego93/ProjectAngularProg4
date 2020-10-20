import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs'
import { UserModel } from '../models/User.model';
const _fs = require('browserify-fs');
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  DBUsers: any = []
  isLogginSubject = new BehaviorSubject<boolean>(this.hasToken())
  JWT: string

  constructor(private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token')
  }

  login(user: UserModel): void {
    try {
      if (this.searchUser(user)) {
        const send = { email: user.email, pass: user.password }
        this.JWT = this.createToken(send)
        localStorage.setItem('token', `${this.JWT}`)
        this.isLogginSubject.next(true)
        setTimeout(() => { this.router.navigate(['/user']) }, 1000)
      }
    } catch (error) {
      this.logout()
      console.log(error);
    }
  }

  searchUser(userLogin): boolean {
    const arrayUsers = this.DBUsers
    const findUser = arrayUsers.find(user => {
      return userLogin.email == user.email && userLogin.password == user.password
    })
    return findUser ? true : false
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

  loadDB() {
    try {
      this.DBUsers = require('../../assets/DB/dataUsers.json')
    } catch (error) {
      console.log(error);
      this.DBUsers = []
    }
  }

  saveDB() {
    let data = JSON.stringify(this.DBUsers)
    // fs.mkdir('', () => {
    fs.writeFileSync('/db/dataUsers1.txt', 'Hola mundo', { encoding: 'utf8' })
    // })
  }

  registerUser(user) {
    try {
      this.loadDB()
      this.DBUsers.push(user)
      this.login(user)
      this.saveDB()
    } catch (error) {
      console.log(error);
    }
  }

}
