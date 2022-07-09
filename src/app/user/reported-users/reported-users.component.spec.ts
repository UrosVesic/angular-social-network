import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedUsersComponent } from './reported-users.component';

describe('ReportedUsersComponent', () => {
  let component: ReportedUsersComponent;
  let fixture: ComponentFixture<ReportedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportedUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
