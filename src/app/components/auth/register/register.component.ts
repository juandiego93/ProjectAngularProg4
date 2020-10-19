import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  registerForm: FormGroup

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      nameUser: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.min(4)])],
    })
  }


  onSubmit() {
    if (this.registerForm.status === 'INVALID') {
      alert('Campos inválidos, revise cada uno')
      return false
    }
    this.authService.registerUser(this.registerForm.value);
  }

}
