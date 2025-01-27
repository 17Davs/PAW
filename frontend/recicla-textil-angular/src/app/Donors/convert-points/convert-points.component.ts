import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RestService } from '../../rest.service';
import { Rule } from '../../models/rule';
import { Donor } from '../../models/donor';

@Component({
  selector: 'app-convert-points',
  templateUrl: './convert-points.component.html',
  styleUrls: ['./convert-points.component.css'],
})
export class ConvertPointsComponent {
  @Input() userId!: string;
  @Input() userPoints!: number;
  @Output() donorUpdated = new EventEmitter<Donor>();
  qtd: number = 0;
  rules: Rule[] = [];

  constructor(private rest: RestService) {
    this.loadRules();
  }

  loadRules() {
    this.rest.getRules().subscribe((data: Rule[]) => {
      this.rules = data.filter((rule) => rule.type === 'pointsConversion');
    });
  }

  convertPoints() {
    if (this.userId && this.qtd > 0 && this.userPoints >= this.qtd) {
      this.rest
        .convertDonorPoints(this.userId, this.qtd)
        .subscribe((updatedDonor: Donor) => {
          this.donorUpdated.emit(updatedDonor);
        });
    } else {
      alert('Invalid quantity of points.');
    }
  }
}
