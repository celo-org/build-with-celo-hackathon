import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsHomeComponent } from './docs-home.component';

describe('DocsHomeComponent', () => {
  let component: DocsHomeComponent;
  let fixture: ComponentFixture<DocsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
