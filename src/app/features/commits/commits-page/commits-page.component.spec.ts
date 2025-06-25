import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsPage } from './commits-page.component';

describe('CommitsPage', () => {
  let component: CommitsPage;
  let fixture: ComponentFixture<CommitsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CommitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
