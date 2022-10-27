import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingHomeComponent } from './listing-home.component';

describe('ListingHomeComponent', () => {
  let component: ListingHomeComponent;
  let fixture: ComponentFixture<ListingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
