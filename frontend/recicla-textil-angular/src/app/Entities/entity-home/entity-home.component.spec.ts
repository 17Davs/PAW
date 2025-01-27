import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityHomeComponent } from './entity-home.component';

describe('EntityHomeComponent', () => {
  let component: EntityHomeComponent;
  let fixture: ComponentFixture<EntityHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
