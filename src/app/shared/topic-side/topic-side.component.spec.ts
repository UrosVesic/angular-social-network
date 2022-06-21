import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSideComponent } from './topic-side.component';

describe('TopicSideComponent', () => {
  let component: TopicSideComponent;
  let fixture: ComponentFixture<TopicSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
