import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterDetailsComponent } from './toaster-details.component';

describe('ToasterDetailsComponent', () => {
  let component: ToasterDetailsComponent;
  let fixture: ComponentFixture<ToasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToasterDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
