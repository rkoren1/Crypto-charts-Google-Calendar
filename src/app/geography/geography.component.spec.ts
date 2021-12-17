/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GeographyComponent } from './geography.component';

describe('GeographyComponent', () => {
  let component: GeographyComponent;
  let fixture: ComponentFixture<GeographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
