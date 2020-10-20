import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { UserModel } from '../../../models/User.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  idUser: string
  user

  constructor(private http: HttpClient, private userService: UserService) {
    this.idUser = localStorage.getItem('nameUser')
  }

  ngOnInit(): void {
    console.log(this.idUser);
    const a = this.idUser
    this.getUserById(a)
  }

  getUserById(idUser: string) {
    this.userService.getUserById(idUser)
      .then(resp => {
        this.user = resp
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      })
  }

}
