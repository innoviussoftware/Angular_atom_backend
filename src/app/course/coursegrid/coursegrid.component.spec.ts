import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursegridComponent } from './coursegrid.component';

describe('CoursegridComponent', () => {
  let component: CoursegridComponent;
  let fixture: ComponentFixture<CoursegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
