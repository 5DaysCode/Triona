import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JESTTestComponent } from './jesttest.component';

describe('JESTTestComponent', () => {
  let component: JESTTestComponent;
  let fixture: ComponentFixture<JESTTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JESTTestComponent]
    });
    fixture = TestBed.createComponent(JESTTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
