import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User, UserStock } from 'src/app/models/user';
import { StocksService } from '../stocks/stocks.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private stockService: StocksService,
  ) { }


  private isOpen = true
  private subscribe: Subscription
  
  private _sidebarOpen$ = new BehaviorSubject(this.isOpen)
  public sidebarOpen$ = this._sidebarOpen$.asObservable()

private _dashBoardData$ = new BehaviorSubject(null)
public dashBoardData$ = this._dashBoardData$.asObservable()

  toggleSidebar() {
    this.isOpen = !this.isOpen
    this._sidebarOpen$.next(this.isOpen)
  }

  async dashboardData(user:User) {
    var chartData= []
    var metaData= await this.stockService.loadStockDataDaily(user.portfolio) 
    
    user.portfolio.forEach(async (stock,idx) => {   
      chartData.push(
        {
          name: stock.symbol,
          amount: stock.amount,
          stockData: metaData[idx]
        });
    })
    this._dashBoardData$.next(chartData)
    
    return chartData
  }

}
