import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, RouterState } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  mobile_menu_visible: any = 0;
  private _router: Subscription;
  public isTeacher = false;
  public isLogin = true;

  constructor(
    private router: Router,
    private element: ElementRef,
    private route: ActivatedRoute,
  ) {
    this.sidebarVisible = false;
    router.events.subscribe(val => {
      const state: RouterState = router.routerState
      if (!state.snapshot.url.includes('login')) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
      
      if (state.snapshot.url.includes('teacher')) {
        this.isTeacher = true;
      } else {
        this.isTeacher = false;
      }

    })
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.sidebarClose();
    });
  }

  sidebarOpen() {
      const toggleButton = this.toggleButton;
      const body = document.getElementsByTagName('body')[0];
      setTimeout(function() {
          toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');

      this.sidebarVisible = true;
  }

  sidebarClose() {
      const body = document.getElementsByTagName('body')[0];
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
  }
  
  sidebarToggle() {
    const body = document.getElementsByTagName('body')[0];
      if (this.sidebarVisible === false) {
          this.sidebarOpen();
          const $layer = document.createElement('div');
          $layer.setAttribute('class', 'close-layer');
          if (body.querySelectorAll('.wrapper-full-page')) {
              document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
          } else if (body.classList.contains('off-canvas-sidebar')) {
              document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
          }
          setTimeout(function() {
              $layer.classList.add('visible');
          }, 100);
          $layer.onclick = function() { // asign a function
            body.classList.remove('nav-open');
            this.mobile_menu_visible = 0;
            $layer.classList.remove('visible');
            this.sidebarClose();
          }.bind(this);

          body.classList.add('nav-open');
      } else {
        document.getElementsByClassName('close-layer')[0].remove();
          this.sidebarClose();
      }
  }
}
