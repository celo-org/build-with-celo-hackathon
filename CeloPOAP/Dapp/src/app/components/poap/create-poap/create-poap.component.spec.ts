import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePoapComponent } from './create-poap.component';

describe('CreatePoapComponent', () => {
  let component: CreatePoapComponent;
  let fixture: ComponentFixture<CreatePoapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePoapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePoapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
