import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { filter, Observable, } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public isAuthenticated$: Observable<boolean>;
  public user$: Observable<User>;
  public activeLinkText: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // These can also be put inside the `ngOnInit()`
    this.isAuthenticated$ = this.authService.isLoggedIn();
    this.user$ = this.authService.getCurrentUser();
  }

  public ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => { this.updateActiveLinkText() });
  }

  public logout(): void {
    this.authService.logout().subscribe(
      () => window.location.href = '/auth'
    );
  }

  private updateActiveLinkText(): void {
    const activeLink = this.router.url;

    switch (activeLink) {
      case '/members':
        this.activeLinkText = 'Members';
        break;
      default:
        this.activeLinkText = 'Readings';
    }
  }
}
