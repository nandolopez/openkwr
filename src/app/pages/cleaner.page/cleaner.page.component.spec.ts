import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerPageComponent } from './cleaner.page.component';

describe('CleanerPageComponent', () => {
  let component: CleanerPageComponent;
  let fixture: ComponentFixture<CleanerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleanerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CleanerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
