import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSearchToolbarComponent } from './provider-search-toolbar.component';

describe('ProviderSearchToolbarComponent', () => {
  let component: ProviderSearchToolbarComponent;
  let fixture: ComponentFixture<ProviderSearchToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderSearchToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderSearchToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
