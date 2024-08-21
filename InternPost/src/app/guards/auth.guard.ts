import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  console.log(user);
  if (auth.isLogged()) {
    console.log(auth.isLogged())
    return true;
  } else {
    console.log(auth.isLogged())
    router.navigate(['/auth/login']);
    return false;
  }
};
