import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import firebase from 'firebase';
import User = firebase.User;
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {

  iconDetails: object[];

  constructor(private authService: AuthService,
    private router: Router) { }

  get user(): User {
    return this.authService.user;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.iconDetails = [
      {
        label: 'Login',
        source: 'assets/icons/user.png',
        link: 'login',
      },
      {
        label: 'Logout',
        source: 'assets/icons/salir.svg'
      }
    ];
  }

  async logout(): Promise<any> {
    console.log('click logout');
    this.authService.logout().then(() => {
      this.authService.setUser(undefined);
      this.router.navigate(['/']);
      localStorage.setItem("user", null);
    });
  }

  alert(label: string): void {
    console.log('You clicked ', label);
  }

}
