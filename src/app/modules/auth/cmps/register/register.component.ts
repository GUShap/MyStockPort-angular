import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: Router,) { }

  info = {
    username: '',
    email: '',
    password: ''
  }
  logTriesCount: number
  isPasswordVisible: boolean
  invalidEmail: string

  ngOnInit(): void {
    this.logTriesCount = 0
    this.isPasswordVisible = false
  }

  checkValidEmail() {
    var email = this.info.email
    setTimeout(() => {
      if (!email || email.length < 3) {
        this.invalidEmail = ''
        return
      }
      if (email.includes('@')) {
        this.userService.checkValidEmail(email)
          ? this.invalidEmail = ''
          : this.invalidEmail = 'email already in use'

      }
      else this.invalidEmail = 'email must contain @'
    }, 1500)
  }

  registerUser() {
    if (!this.userService.checkValidEmail(this.info.email)) {
      this.invalidEmail = 'email already registered'
      return
    }
    this.userService.register(this.info)
    this.route.navigate([''])
  }

  emailInputClass() {
    var email = this.info.email

    if (!email) return ''
    if (this.invalidEmail) return 'invalid'
    if (this.userService.checkValidEmail(email)) return 'valid'
  }

}
