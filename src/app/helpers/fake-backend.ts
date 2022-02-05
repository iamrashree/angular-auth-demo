import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJyYWpAZ21haWwuY29tIiwicGFzc3dvcmQiOjEyMzQsImFkbWluIjpmYWxzZX0.nKg0d4V1RjPA537vxtQl95KsZ1qeciKsfm42E0yCeOc';
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJyYWpAZ21haWwuY29tIiwicGFzc3dvcmQiOjEyMzQsImFkbWluIjp0cnVlfQ.rfANN029pjJjypB-N7vWwt6S9UcV-WIZZgGb7T9GMiM';

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/orders') && method === 'GET':
                    return orders();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function orders() {
            const user = body
            if (isLoggedIn()) {
                return ok([1, 2, 3]);
            } else {
                return ok({ status: 401 });
            }
        }

        function authenticate() {
            const body = JSON.parse(request.body);
            if (body.email === 'raj@gmail.com' && body.password === '1234') {
                return ok({
                    status: 200,
                    token: token
                });
            } else {
                return ok({
                    status: 200
                });
            }
        }

        // helper functions

        function ok(body?: any | undefined) {
            return of(new HttpResponse({ body: body }));
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer ' + token;
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};