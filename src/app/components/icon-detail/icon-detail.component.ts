import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase';
import User = firebase.User;

@Component({
  selector: 'app-icon-detail',
  templateUrl: './icon-detail.component.html',
  styleUrls: ['./icon-detail.component.css']
})
export class IconDetailComponent implements OnInit {
  @Input() source: string;
  @Input() label: string;
  @Input() link: string;
  @Output() message = new EventEmitter<string>();

  constructor(
    private authService: AuthService
  ) {
    console.log('source of constructor', this.source);
  }

  get user(): User {
    return this.authService.user;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    console.log('source of ngOnInit', this.source);
  }

  emitEvent(label: string): void {
    this.message.emit(label);
  }
}
