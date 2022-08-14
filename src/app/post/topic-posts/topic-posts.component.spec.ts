import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPostsComponent } from './topic-posts.component';

describe('TopicPostsComponent', () => {
  let component: TopicPostsComponent;
  let fixture: ComponentFixture<TopicPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
