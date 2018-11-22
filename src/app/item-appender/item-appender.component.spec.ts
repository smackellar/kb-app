import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAppenderComponent } from './item-appender.component';

describe('ItemAppenderComponent', () => {
  let component: ItemAppenderComponent;
  let fixture: ComponentFixture<ItemAppenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAppenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAppenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
