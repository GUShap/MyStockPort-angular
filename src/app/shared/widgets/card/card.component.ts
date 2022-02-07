import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'
import HC_exporting from 'highcharts/modules/exporting'

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  label: string = '';
  percentage!: number;

  @Input() chartData: any

  Highcharts = Highcharts
  chartOptions = {}
  constructor() { }

  ngOnInit(): void {
    const { stockData, name } = this.chartData
    const slicedData = stockData.value.slice(0, 7).reverse()
    const slicedDates = stockData.date.slice(0, 7).reverse()


    this.label = name
    this.percentage = +((slicedData[slicedData.length - 1] - slicedData[0]) / slicedData[0] * 100).toFixed(2)


    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: null,
        borderWidth: 0,
        margin: [2, 2, 2, 2],
        height: 60
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      tooltip: {
        outside: true,
        valuePrefix: '$',
        pointFormat: '<b>{point.y}</b><br/>',

      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false //remove credits line
      },
      exporting: {
        enables: false,//enables download as pdf and such
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      },
      xAxis: {
        categories: slicedDates,
        title: {
          text: null
        },
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
      },
      series: [{
        data:  slicedData
      }]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      ), 300
    })
  }

}
