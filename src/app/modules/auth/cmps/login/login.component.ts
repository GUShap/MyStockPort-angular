import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: Router,
  ) { }

  info = {
    email: '',
    password: ''
  }
  logTriesCount: number
  isPasswordVisible: boolean

  ngOnInit(): void {
    this.userService.loadUsers()
    this.logTriesCount = 0
    this.isPasswordVisible = false
  }


  loginUser() {
    this.logTriesCount++
    const user = this.userService.login(this.info)
    user ? this.route.navigate(['']) : this.failToLogin()
  }

loginDemo(){
  this.userService.demoLog()
  this.route.navigate([''])
}

  failToLogin() {

  }
}
