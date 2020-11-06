import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosDiariosComponent } from './libros-diarios.component';

describe('LibrosDiariosComponent', () => {
  let component: LibrosDiariosComponent;
  let fixture: ComponentFixture<LibrosDiariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrosDiariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosDiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
