import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { HealthService } from 'src/app/service/health.service';

@Component({
  selector: 'app-disk',
  templateUrl: './disk.component.html',
  styleUrls: ['./disk.component.css']
})
export class DiskComponent implements OnInit {
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
      backgroundColor: ['#c8e6c9', '#b2ebf2'],
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
    this.healthService.getDisk()
     .subscribe(response => {
      if (response['code'] !== 200 ) {
        return ;
      } else {
        this.pieChartData.push(response['data']['disk']['totalGB']);
        this.pieChartData.push(response['data']['disk']['usedGB']);

        this.status = response['data']['disk']['usedMB'] + 'MB (' +
            response['data']['disk']['usedGB'] + 'GB ) / ' +
            response['data']['disk']['totalMB'] + 'MB (' +
            response['data']['disk']['totalGB']  + 'GB ) |  ' +
            response['data']['disk']['usedPercent']  + '%';
      }
     });
  }
}
