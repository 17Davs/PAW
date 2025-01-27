import { Component, OnInit } from '@angular/core';
import { Rule } from '../../models/rule';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-point-rules',
  templateUrl: './point-rules.component.html',
  styleUrls: ['./point-rules.component.css'],
})
export class PointRulesComponent implements OnInit {
  pointRules: Rule[] = [];

  constructor(public rest: RestService) {}

  ngOnInit() {
    this.getPointRules();
  }

  getPointRules() {
    this.rest.getRules().subscribe((data: Rule[]) => {
      console.log(data);
      this.pointRules = data;
    });
  }
}
