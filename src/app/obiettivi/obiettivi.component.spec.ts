import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObiettiviComponent } from './obiettivi.component';

describe('ObiettiviComponent', () => {
  let component: ObiettiviComponent;
  let fixture: ComponentFixture<ObiettiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObiettiviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObiettiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
