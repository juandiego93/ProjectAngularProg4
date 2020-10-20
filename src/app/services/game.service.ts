import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  server: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAllGamesByIdUser(idUser): Promise<any> {
    return this.http.post(`${this.server}/getAllGamesByIdUser`, { id: idUser }).toPromise()
  }

  createNewGame(game): Promise<any> {
    return this.http.post(`${this.server}/createNewGame`, { game }).toPromise()
  }

  editGameByIdUser(form): Promise<any> {
    console.log(form);
    
    return this.http.post(`${this.server}/editGameByUser`, form).toPromise()
  }
}
