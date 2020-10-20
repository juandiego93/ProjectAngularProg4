import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  server: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getUserById(idUser): Promise<any> {
    return this.http.post(`${this.server}/getUserById`, { id: idUser }).toPromise()
  }

}
