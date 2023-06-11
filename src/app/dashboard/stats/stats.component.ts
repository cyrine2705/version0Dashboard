import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Emotions Chart for the employye Nedra',
        font: {
          size: 16
        }
      }
    }
  };
  public barChartLabels: BaseChartDirective["labels"] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataset[] = [];

  constructor(private db: AngularFireDatabase) {}
  ngOnInit() {
    // Retrieve the data from the Firebase Realtime Database
    this.db
      .object('cyrine')
      .valueChanges()
      .subscribe((data: any) => {
        // Clear previous data
        this.barChartLabels = [];
        this.barChartData = [];
  
        // Extract unique emotions
        const emotionsSet = new Set<string>();
        Object.values(data).forEach((emotions: any) => {
          Object.keys(emotions).forEach((emotion) => {
            emotionsSet.add(emotion);
          });
        });
        const emotionsList = Array.from(emotionsSet);
  
        // Map the data to chart format
        Object.keys(data).forEach((date) => {
          this.barChartLabels.push(date);
          const emotions = data[date];
  
          emotionsList.forEach((emotion) => {
            const chartData = this.barChartData.find((dataset) => dataset.label === emotion);
            if (chartData) {
              chartData.data.push(emotions[emotion]);
            } else {
              this.barChartData.push({
                data: [emotions[emotion]],
                label: emotion
              });
            }
          });
        });
      });
  }
  
  
}
