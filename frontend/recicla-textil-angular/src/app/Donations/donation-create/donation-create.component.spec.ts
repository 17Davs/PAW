import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCreateComponent } from './donation-create.component';

describe('DonationCreateComponent', () => {
  let component: DonationCreateComponent;
  let fixture: ComponentFixture<DonationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonationCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
