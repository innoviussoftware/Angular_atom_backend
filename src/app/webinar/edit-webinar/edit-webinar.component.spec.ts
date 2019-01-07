import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebinarComponent } from './edit-webinar.component';

describe('EditWebinarComponent', () => {
  let component: EditWebinarComponent;
  let fixture: ComponentFixture<EditWebinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWebinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
