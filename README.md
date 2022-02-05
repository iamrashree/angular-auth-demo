# Auth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Development server

Run `npm install` and `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Key Points - Authentication And Authorization
- Used JWTs (Json Web Tokens) to implement authentication and authorization in angular application
- JWTs have a header, payload & a digistal signature, i.e based on combination of header and payload and it is generated based on the secret, this secret is known only on the server
- jwt.io, where we have JWT debugger as well as library, we can use based on the client and te server.
- NPM - @auth0/angular-jwt

# Client side
- Show/Hide various elements on a page depending on the authentication status of the user wheather they are logged in or not or may be logged in but they are not part of the specific route
- we used ngIf directive to hide /show various part of the page, BTW we should never ever have sensitive information on the client, because malicious user can look into DOM and get hidded data.
- protect routes using guards

# Server side
- Protect API endpoints for un authorized access, once again to do that we can use JWT
- So on these API endpoint we should expect Authorization header with valid JWT in the request header
