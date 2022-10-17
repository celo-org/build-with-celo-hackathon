import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenMintDocsComponent } from './token-mint-docs.component';

describe('TokenMintDocsComponent', () => {
  let component: TokenMintDocsComponent;
  let fixture: ComponentFixture<TokenMintDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenMintDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenMintDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
