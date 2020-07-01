import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                // case url.includes('question/questionbycategory') && method === 'GET':
                //     return getQuestionList('Programming');
                // case url.includes('/question') && method === 'GET':
                //     return getQuestion();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getQuestion() {
            return ok({
                id: 'abc',
                title: 'react fundamental',
                category: 'programming',
                author: 'phan quang huy',
                text: '<p>To add the fake backend provider to your Angular 8 app you need to import the <code>fakeBackendProvider</code> in your app module&nbsp;as shown below, and add the <code>fakeBackendProvider</code> to the list of providers in your app module.&nbsp;</p><p class="Normal">Khi được hỏi liệu Bắc Kinh đã tham vấn nhiều ý kiến khác nhau cho dự luật hay chưa, bà Tam cho rằng quan điểm của những người không chấp nhận các nguyên tắc cơ bản của luật an ninh Hong Kong là hoàn toàn không phù hợp.</p>',
                resultCode: 'A',
                level: 3,
                options: [
                    {code: 'A', text: 'Very hard'},
                    {code: 'B', text: 'Quite hard'},
                    {code: 'C', text: 'Extreamly hard'},
                    {code: 'D', text: 'Not hard'},
                ]
            });
        }

        function getQuestionList(category: string){
            let q = {
                id: 'abc',
                title: 'React fundamental',
                summary: 'To add the fake backend provider to your Angular 8 app you need to import',
                category: category,
                author: 'phan quang huy',
                text: '<p>To add the fake backend provider to your Angular 8 app you need to import the <code>fakeBackendProvider</code> in your app module&nbsp;as shown below, and add the <code>fakeBackendProvider</code> to the list of providers in your app module.&nbsp;</p><p class="Normal">Khi được hỏi liệu Bắc Kinh đã tham vấn nhiều ý kiến khác nhau cho dự luật hay chưa, bà Tam cho rằng quan điểm của những người không chấp nhận các nguyên tắc cơ bản của luật an ninh Hong Kong là hoàn toàn không phù hợp.</p>',
                resultCode: 'A',
                level: 3,
                options: [
                    {code: 'A', text: 'Very hard'},
                    {code: 'B', text: 'Quite hard'},
                    {code: 'C', text: 'Extreamly hard'},
                    {code: 'D', text: 'Not hard'},
                ]
            };

            let rs = [];
            for (let i = 0; i < 10; i++) {
                rs.push(q);          
            }
            return ok({data: rs, count: 100});
        }
        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};