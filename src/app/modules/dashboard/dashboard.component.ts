import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserStock } from 'src/app/models/user';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscribe: Subscription
  currUser$: User;
  chartData$: UserStock[];

  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
    private cf: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    this.subscribe = this.userService.currUser$.subscribe(res => { this.currUser$ = res; })
    await this.dashboardService.dashboardData(this.currUser$)
    this.subscribe = this.dashboardService.dashBoardData$.subscribe(res => { this.chartData$ = res })
  }


  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }




}
