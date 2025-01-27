import { Component, OnInit } from '@angular/core';
import { Rule } from '../../models/rule';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.css'],
})
export class RuleListComponent implements OnInit {
  rules: Rule[] = [];
  selectedRule?: Rule;

  constructor(public rest: RestService) {}

  ngOnInit(): void {
    this.getRules();
  }

  getRules() {
    this.rest.getRules().subscribe((data: Rule[]) => {
      console.log(data);
      this.rules = data;
    });
  }

  selectRule(index: number) {
    this.selectedRule = this.rules[index];
  }
}
