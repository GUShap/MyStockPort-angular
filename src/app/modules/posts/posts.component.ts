import {Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { StocksService } from 'src/app/services/stocks/stocks.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  subscribe: Subscription
  chartData: Object[];
  // currStock$: Object;
  currUser$: User
  constructor(
    private dashboardService: DashboardService,
    private stockService: StocksService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.stockService.stockOverview()
    this.subscribe = this.userService.currUser$.subscribe(res => { this.currUser$ = res })
    this.subscribe = this.stockService.trendingOverview$.subscribe(res => { this.chartData = res })    
    // this.chartData = this.dashboardService.trendingStocks()
    // this.currStock$ = this.stockService.stockOverview()

  }

}
