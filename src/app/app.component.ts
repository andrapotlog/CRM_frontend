import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { Store } from '@ngrx/store';
import { loadUser } from './service/user-service/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CRM';

  constructor(
    private authService: AuthService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.authService.initAuthListener();
    if (localStorage.getItem('isAuth') === 'yes')
      this.store.dispatch(loadUser());
  }
}
