import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import * as fromReducer from '../auth.reducer';

export const authGuard: CanActivateFn = (route, state): any => {
  const router = inject(Router);
  const store = inject(Store<fromReducer.State>);

  return store.select(fromReducer.getIsAuth).pipe(take(1));
};
