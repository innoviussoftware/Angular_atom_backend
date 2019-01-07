import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebinarComponent } from './add-webinar.component';

describe('AddWebinarComponent', () => {
  let component: AddWebinarComponent;
  let fixture: ComponentFixture<AddWebinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWebinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
