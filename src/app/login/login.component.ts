import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, exhaustMap, fromEvent, Observable, of } from 'rxjs';

// declare const $: any;

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    public formLogin: FormGroup;

    constructor(
        private element: ElementRef,
        private fb: FormBuilder,
        private router: Router,
        // private logSer: LoginService,
    ) { }

    ngOnInit() {
        this.showAndAnimateLoginCard();
        this.setUpFrom();
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }

    ngAfterViewInit() {

        this.createObservableFormSubmitEvent().subscribe();

    }

    setUpFrom() {
        this.formLogin = this.fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        }, { updateOn: 'submit' });
    }

    private createObservableFormSubmitEvent(): Observable<any> {

        const formElement = document.querySelector('form');
        return fromEvent(formElement, 'submit')
            .pipe(
                exhaustMap((e: Event) => {
                    if (this.formLogin.valid) {
                    }
                    return of(null);
                }),
                catchError((error) => {
                    return of(null);
                })
            );

    }

    private showAndAnimateLoginCard() {

        const navbar: HTMLElement = this.element.nativeElement;
        const toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        const recover = document.getElementsByClassName('recover-link')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
            recover.classList.remove('recover-hidden');
        }, 700);

    }

    get username(): FormControl {
        return this.formLogin.get('username') as FormControl;
    }
    get password(): FormControl {
        return this.formLogin.get('password') as FormControl;
    }

}