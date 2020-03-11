import { Component, OnInit, ViewChild } from '@angular/core';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { HealthService } from 'src/app/service/health.service';

class UserData {
  date: string;
  count: number;
}

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['disk', 'total'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 100], label: 'disk' },
  ];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private healthService: HealthService) { }

  ngOnInit() {
     setTimeout(() => {
       this.getHealth();
     });
  }

  getHealth(): void {
    this.healthService.getHealth()
     .subscribe(response => {
      if (response['code'] !== 200 ) {
        return ;
      } else {
        // this.messages = response['data'].split(';');
        console.log(response);
      }
     });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
}
