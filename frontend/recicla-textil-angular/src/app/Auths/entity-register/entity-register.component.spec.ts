import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityRegisterComponent } from './entity-register.component';

describe('EntityRegisterComponent', () => {
  let component: EntityRegisterComponent;
  let fixture: ComponentFixture<EntityRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
