import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotPermittedComponent } from './page-not-permitted.component';

describe('PageNotPermittedComponent', () => {
  let component: PageNotPermittedComponent;
  let fixture: ComponentFixture<PageNotPermittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotPermittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotPermittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
