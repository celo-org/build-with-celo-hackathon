import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsDocsComponent } from './campaigns-docs.component';

describe('CampaignsDocsComponent', () => {
  let component: CampaignsDocsComponent;
  let fixture: ComponentFixture<CampaignsDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignsDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
