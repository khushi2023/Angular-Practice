import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspLookupComponent } from './isp-lookup.component';

describe('IspLookupComponent', () => {
  let component: IspLookupComponent;
  let fixture: ComponentFixture<IspLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IspLookupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IspLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
