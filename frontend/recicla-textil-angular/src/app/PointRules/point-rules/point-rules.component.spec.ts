import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointRulesComponent } from './point-rules.component';

describe('PointRulesComponent', () => {
  let component: PointRulesComponent;
  let fixture: ComponentFixture<PointRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PointRulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
