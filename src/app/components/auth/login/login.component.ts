import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import * as $ from 'jquery'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  loginForm: FormGroup

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    })

    this.clearFieldsForm()
  }

  onSubmit() {

    if (this.loginForm.controls.email.status === 'INVALID' || this.loginForm.controls.password.status === 'INVALID') {
      alert('Credenciales inválidas, verifique los campos')
      return false
    }
    this.authService.login(this.loginForm.value);
  }

  clearFieldsForm() {
    $('#email_').val('')
    $('#pass_').val('')
  }

}
