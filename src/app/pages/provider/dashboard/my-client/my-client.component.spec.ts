import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClientComponent } from './my-client.component';

describe('MyClientComponent', () => {
  let component: MyClientComponent;
  let fixture: ComponentFixture<MyClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
