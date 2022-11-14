import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/Designation', title: 'Designation',  icon: 'dashboard', class: '' },
    { path: '/employee-list', title: 'Employee List',  icon:'content_paste', class: '' },
    { path: '/attendance', title: 'Attendance',  icon:'library_books', class: '' },
    { path: '/payment', title: 'Payament',  icon:'bubble_chart', class: '' },
    
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
