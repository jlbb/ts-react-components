// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// --------------------------------------
// Mock GraphQL requests with stubs.
// --------------------------------------
Cypress.Commands.add('mockGraphQL', stubs => {
    cy.on('window:before:load', win => {
        cy.stub(win, 'fetch', (...args) => {
            console.log('Handling fetch stub', args, stubs);
            const [url, request] = args;
            const postBody = JSON.parse(request.body);
            let promise;

            if (url.indexOf('graphql') !== -1) {
                stubs.some(stub => {
                    if (postBody.operationName === stub.operation) {
                        console.log('STUBBING', stub.operation);
                        promise = Promise.resolve({
                            ok: true,
                            text() {
                                return Promise.resolve(JSON.stringify(stub.response));
                            },
                        });
                        return true;
                    }
                    return false;
                });
            }

            if (promise) {
                return promise;
            }

            console.log('Could not find a stub for the operation.');
            return false;
        });
    });
});
