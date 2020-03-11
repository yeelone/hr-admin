import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { HealthService } from 'src/app/service/health.service';
@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.css']
})
export class RamComponent implements OnInit {

  status = '';

  constructor(private healthService: HealthService) { }

   // Pie
   public pieChartOptions: ChartOptions = {
    responsive: false,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex] ;
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Total'], ['Used']];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

  ngOnInit() {
     setTimeout(() => {
       this.getData();
     });
  }

  getData(): void {
    this.healthService.getRAM()
     .subscribe(response => {
      if (response['code'] !== 200 ) {
        return ;
      } else {
        this.pieChartData.push(response['data']['ram']['totalGB']);
        this.pieChartData.push(response['data']['ram']['usedGB']);

        this.status = response['data']['ram']['usedMB'] + 'MB (' +
            response['data']['ram']['usedGB'] + 'GB ) / ' +
            response['data']['ram']['totalMB'] + 'MB (' +
            response['data']['ram']['totalGB']  + 'GB ) |  ' +
            response['data']['ram']['usedPercent']  + '%';
      }
     });
  }

}
