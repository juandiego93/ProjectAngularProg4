import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggeIn: Observable<boolean>

  constructor(public authService: AuthService) {
    this.isLoggeIn = authService.isLoggedIn()
  }

  ngOnInit(): void {
  }

  search(text) {
    console.log(text.value)
  }

}
