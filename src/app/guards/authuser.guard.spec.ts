import { AuthuserGuard } from './authuser.guard';
import { TestBed } from '@angular/core/testing';



describe('AuthuserGuard', () => {
  let guard: AuthuserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthuserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
