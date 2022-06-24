import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionComponent } from './reaction.component';

describe('ReactionComponent', () => {
  let component: ReactionComponent;
  let fixture: ComponentFixture<ReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
