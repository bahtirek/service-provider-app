import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundProviderComponent } from './found-provider.component';

describe('FoundProviderComponent', () => {
  let component: FoundProviderComponent;
  let fixture: ComponentFixture<FoundProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoundProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
