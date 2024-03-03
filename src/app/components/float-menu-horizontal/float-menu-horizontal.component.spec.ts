import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatMenuHorizontalComponent } from './float-menu-horizontal.component';

describe('FloatMenuHorizontalComponent', () => {
  let component: FloatMenuHorizontalComponent;
  let fixture: ComponentFixture<FloatMenuHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatMenuHorizontalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloatMenuHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
