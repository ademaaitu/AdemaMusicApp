import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-country-fan-chart',
  templateUrl: './artist-country-fan-chart.component.html',
  styleUrls: ['./artist-country-fan-chart.component.scss']
})
export class ArtistCountryFanChartComponent implements OnInit {
  @Input() data = [
    {
      'name': 'Germany',
      'value': 40632
    }
  ];


  view: any[] = [400, 200];

  // options
  showLegend = false;

  colorScheme = {
    domain: ['#FDD835', '#3F51B5', '#009688', '#EF6C00', '#7aa3e5', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() {

  }

  onSelect(event) {
    
  }

  ngOnInit() {
  }

}
