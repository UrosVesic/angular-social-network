import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedPostComponent } from './reported-post.component';

describe('ReportedPostComponent', () => {
  let component: ReportedPostComponent;
  let fixture: ComponentFixture<ReportedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportedPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
