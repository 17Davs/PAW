import { Component, Input } from '@angular/core';
import { Rule } from '../../models/rule';

@Component({
  selector: 'app-rule-details',
  templateUrl: './rule-details.component.html',
  styleUrls: ['./rule-details.component.css'],
})
export class RuleDetailsComponent {
  @Input() rule?: Rule;
}
