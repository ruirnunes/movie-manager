import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Watchedlist } from './watchedlist';

describe('Watchedlist', () => {
  let component: Watchedlist;
  let fixture: ComponentFixture<Watchedlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Watchedlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Watchedlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
