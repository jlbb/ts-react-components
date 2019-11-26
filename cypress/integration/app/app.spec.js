beforeEach(() => {
    // Fetch fixtures.
    cy.fixture('getToDoList').as('getToDoListQuery');
    cy.fixture('addToDo').as('addToDoQuery');
});

context('ToDo App', () => {
    beforeEach(function() {
        cy.mockGraphQL([this.getToDoListQuery, this.addToDoQuery]);

        cy.visit('/');
    });

    // https://on.cypress.io/interacting-with-elements

    it('it should focus and create a ToDo list', () => {
        const text = 'Cypress list test';

        cy.get('[data-testid="inputForm-textInput-create"]')
            .focus()
            .type(text)
            .should('have.value', text);

        cy.get('[data-testid="inputForm-submitButton-create"]').click();

        cy.get('.toDoApp > .toDoApp__toDoContainer .title').should('contain', text);
    });
});
