import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteLeyesComponent } from './asistente-leyes.component';

describe('AsistenteLeyesComponent', () => {
  let component: AsistenteLeyesComponent;
  let fixture: ComponentFixture<AsistenteLeyesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenteLeyesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenteLeyesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
