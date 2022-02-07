import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { StocksService } from 'src/app/services/stocks/stocks.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  subscribe: Subscription
  currUser$: User;
  stockDetails$ = null;
  contactId: string | number;

  constructor(
    private userService: UserService,
    private stockService: StocksService,
  ) { }

  ngOnInit(): void {
    this.subscribe = this.userService.currUser$.subscribe(res => { this.currUser$ = res; })
  }

  async stockDetails(stock) {
    this.contactId = stock.userId
    delete this.stockDetails$
    this.stockDetails$ = await this.stockService.stockDetails(stock.symbol)    
  }
}
