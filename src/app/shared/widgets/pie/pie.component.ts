import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @Input() chartData: any

  pieData: Object[] = []
  walletWorth!: Number

  Highcharts = Highcharts
  chartOptions = {}
  constructor() { }

  ngOnInit(): void {
    this.chartData.forEach((stock: { name: any; amount: any }) => {
      this.pieData.push({
        name: stock.name,
        y: stock.amount,
      })
    })

    this.walletWorth = +this.chartData.reduce((a: any, b: any) => {
      return a + (b.amount * b.data[b.data.length - 1])
    }, 0).toFixed(2)

    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'My Portfolio'
      },
      subtitle: {
        text: `Worth:<br><br> $${this.walletWorth}`,
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'of Portfolio',
        colorByPoint: true,
        data: this.pieData
      }]
    },
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      ), 300
    })
  }

}
