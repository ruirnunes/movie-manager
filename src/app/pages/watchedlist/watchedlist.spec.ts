import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedlistComponent } from './watchedlist';

describe('Watchedlist', () => {
  let component: WatchedlistComponent;
  let fixture: ComponentFixture<WatchedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchedlistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchedlistComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
