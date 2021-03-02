import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: User;

  constructor(
    private fireAuth: AngularFireAuth
  ) {
    console.log('call constructor');
    // Validar si hay un usuario que realizo el login.
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.setUser(user);
      }
    });
  }

  setUser(user: User): void {
    this.user = user;
  }

  get isLoggedIn(): boolean {
    return (this.user !== undefined);
  }

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    return this.fireAuth.signOut();
  }
}
