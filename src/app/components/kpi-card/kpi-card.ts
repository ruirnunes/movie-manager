import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css',
})

export class KpiCard {
  
  // KPI card title
  @Input() title!: string;

  // KPI numeric value
  @Input() value!: number;
}