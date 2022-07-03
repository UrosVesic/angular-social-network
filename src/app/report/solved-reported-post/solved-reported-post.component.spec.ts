import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvedReportedPostComponent } from './solved-reported-post.component';

describe('SolvedReportedPostComponent', () => {
  let component: SolvedReportedPostComponent;
  let fixture: ComponentFixture<SolvedReportedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolvedReportedPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolvedReportedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
