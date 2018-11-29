import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPasterComponent } from './item-paster.component';

describe('ItemPasterComponent', () => {
  let component: ItemPasterComponent;
  let fixture: ComponentFixture<ItemPasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
