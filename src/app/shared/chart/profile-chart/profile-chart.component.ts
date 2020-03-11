import { Component, OnInit,ViewChild  } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { StatisticsService } from 'src/app/service/statistics.service';

class UserData {
  date: string;
  count: number;
}
@Component({
  selector: 'app-profile-chart',
  templateUrl: './profile-chart.component.html',
  styleUrls: ['./profile-chart.component.css']
})
export class ProfileChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: '员工增长情况' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(0,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: '#009688',
      pointBackgroundColor: '#303F9F',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00BCD4'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  isLoadingResults = false;
  data: UserData[];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
     setTimeout(() => {
       this.getMonthData();
     });
  }

  getMonthData(): void {
    this.isLoadingResults = true  ;
    this.statisticsService.getProfileIncreaseMonth(12)
      .subscribe(
        response => {
          this.isLoadingResults = false  ;
          this.data = response['data']['data'];
          let dataset = [];
          let levelset = [];
          this.data.forEach((item) => {
            dataset.push(item['count']);
            levelset.push(item['date'].slice(5, 8));
          });

          this.lineChartData = [
                { data: dataset, label: '最近12个月用户增长情况' }, ];
          this.lineChartLabels = levelset;
        }
      );
  }

  getDayData(): void {
    this.isLoadingResults = true  ;
    this.statisticsService.getProfileIncreaseDay(7)
      .subscribe(
        response => {
          this.isLoadingResults = false  ;

          this.data = response['data']['data'];
          let dataset = [];
          let levelset = [];
          this.data.forEach((item) => {
            dataset.push(item['count']);
            levelset.push(item['date'].slice(5, 10));
          });

          this.lineChartData = [
                { data: dataset, label: '近七日用户增长情况' }, ];
          this.lineChartLabels = levelset;
        }
      );
  }

  getYearData(): void {
    this.isLoadingResults = true  ;
    this.statisticsService.getProfileIncreaseYear(10)
      .subscribe(
        response => {
          this.isLoadingResults = false  ;

          this.data = response['data']['data'];
          let dataset = [];
          let levelset = [];
          this.data.forEach((item) => {
            dataset.push(item['count']);
            levelset.push(item['date'].slice(5, 10));
          });

          this.lineChartData = [
                { data: dataset, label: '近10年用户增长情况' }, ];
          this.lineChartLabels = levelset;
        }
      );
  }

  // queryData():void{
  //   this.isLoadingResults = true  ;
  //   this.dataSubscription = this.apollo.watchQuery({
  //     query: ServiceGQl.queryUsersStatisticsGQL,
  //     })
  //   .valueChanges
  //   .subscribe((result) => { 
  //       this.isLoadingResults = false  ;
  //       this.data = result.data['usersStatistics']['newUsersCount'];

  //       let dataset = [];
  //       let levelset = [];
  //       this.data.forEach((item) => {
  //         dataset.push(item['count']);
  //         levelset.push(item['date'].slice(5, 10));
  //       });

  //       this.lineChartData = [
  //             { data: dataset, label: '每月新增用户' }, ];
  //       this.lineChartLabels = levelset;
  //   }, (error) => {
  //     this.isLoadingResults = false  ;
  //     alert('error:' + error);
  //   });
  // }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }

}
