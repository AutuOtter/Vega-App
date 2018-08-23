import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // Pie
  public pieChartLabels:string[] = ['A', 'B', 'C'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  constructor() { }

  ngOnInit() {
  }

  // Events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
