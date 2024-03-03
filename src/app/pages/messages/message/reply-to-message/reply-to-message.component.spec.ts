import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyToMessageComponent } from './reply-to-message.component';

describe('ReplyToMessageComponent', () => {
  let component: ReplyToMessageComponent;
  let fixture: ComponentFixture<ReplyToMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyToMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReplyToMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
