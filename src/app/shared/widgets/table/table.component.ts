import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { StocksService } from 'src/app/services/stocks/stocks.service';

@Component({
  selector: 'app-widget-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {
  @Input() chartData: any
  columnsToDisplay = ['Symbol', 'Name', 'Country', 'Sector'];
  expandedElement: any

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      ), 300
    })
  }
}