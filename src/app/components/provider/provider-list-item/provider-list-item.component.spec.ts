import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderListItemComponent } from './provider-list-item.component';

describe('ProviderListItemComponent', () => {
  let component: ProviderListItemComponent;
  let fixture: ComponentFixture<ProviderListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
