import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/library-page/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userLogoLink;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userLogoLink = "assets/images/userLogo.png";
  }

  toUserProfile(): void {
    window.location.pathname = '/user-profile';
  }

  logout() : void {
    this.authService.logout();
  }

  getUserName(): string {
    return this.authService.getUserName();
  }
}
