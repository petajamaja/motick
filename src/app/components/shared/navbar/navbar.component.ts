import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  routerLinks = {
    home: '/',
    expenses: '/expenses',
    settings: '/settings'
  };

  routerUrl: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.routerUrl = this.router.url;
  }

  switchBetweenPages() {
    let page = '';
    switch (this.router.url) {
      case this.routerLinks.home:
        page = this.routerLinks.settings;
        break;
      case this.routerLinks.settings:
        page = this.routerLinks.expenses;
        break;
      case this.routerLinks.expenses:
        page = this.routerLinks.home;
        break;
      default: break;
    }
    this.routerUrl = page;
    this.router.navigate([page]);
    return false;
  }


}
