import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnevelopeComponent } from './enevelope.component';

describe('EnevelopeComponent', () => {
  let component: EnevelopeComponent;
  let fixture: ComponentFixture<EnevelopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnevelopeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnevelopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
