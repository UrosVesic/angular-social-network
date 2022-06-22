import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTopicsComponent } from './list-topics.component';

describe('ListTopicsComponent', () => {
  let component: ListTopicsComponent;
  let fixture: ComponentFixture<ListTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTopicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
