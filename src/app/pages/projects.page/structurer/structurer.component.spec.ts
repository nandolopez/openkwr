import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructurerComponent } from './structurer.component';

describe('StructurerComponent', () => {
  let component: StructurerComponent;
  let fixture: ComponentFixture<StructurerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructurerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
