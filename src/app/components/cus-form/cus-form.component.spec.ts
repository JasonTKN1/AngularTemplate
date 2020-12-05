import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusFormComponent } from './cus-form.component';

describe('CusFormComponent', () => {
  let component: CusFormComponent;
  let fixture: ComponentFixture<CusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
