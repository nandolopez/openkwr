import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatenatorPageComponent } from './concatenator.page.component';

describe('ConcatenatorPageComponent', () => {
  let component: ConcatenatorPageComponent;
  let fixture: ComponentFixture<ConcatenatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcatenatorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConcatenatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
