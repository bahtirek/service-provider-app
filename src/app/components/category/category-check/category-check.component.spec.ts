import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCheckComponent } from './category-check.component';

describe('CategoryCheckComponent', () => {
  let component: CategoryCheckComponent;
  let fixture: ComponentFixture<CategoryCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
