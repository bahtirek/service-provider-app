import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyToMessageDetailsComponent } from './reply-to-message-details.component';

describe('ReplyToMessageDetailsComponent', () => {
  let component: ReplyToMessageDetailsComponent;
  let fixture: ComponentFixture<ReplyToMessageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyToMessageDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReplyToMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
