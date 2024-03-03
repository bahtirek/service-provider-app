import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProviderComponent } from './my-provider.component';

describe('MyProviderComponent', () => {
  let component: MyProviderComponent;
  let fixture: ComponentFixture<MyProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
