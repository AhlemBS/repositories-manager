import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposPageComponent } from './repos-page.component';

describe('ReposPageComponent', () => {
  let component: ReposPageComponent;
  let fixture: ComponentFixture<ReposPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReposPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReposPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
