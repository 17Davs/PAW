import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertPointsComponent } from './convert-points.component';

describe('ConvertPointsComponent', () => {
  let component: ConvertPointsComponent;
  let fixture: ComponentFixture<ConvertPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConvertPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
