import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { StocksService } from 'src/app/services/stocks/stocks.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  @Output() resize = new EventEmitter()

  subscribe: Subscription
  sideBarOpen$!: boolean;

  currUser$: User;

  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
    private route: Router) { }

  ngOnInit(): void {
    this.userService.getUser()
    this.userService.currUser$.subscribe(user => this.currUser$ = user)
    if (!this.currUser$) this.route.navigate(['login'])
    this.subscribe = this.dashboardService.sidebarOpen$.subscribe(res => this.sideBarOpen$ = res)
  }

  toggleSidebar() {
    this.dashboardService.toggleSidebar()
  }

  logout(){
    this.userService.logout()
    this.route.navigate(['login'])
  }
}
