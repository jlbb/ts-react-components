beforeEach(() => {
    // Fetch fixtures.
    cy.fixture('getToDoList').as('getToDoListQuery');
    cy.fixture('addToDo').as('addToDoQuery');
    cy.fixture('addToDoItem').as('addToDoItemQuery');
    cy.fixture('removeToDo').as('removeToDoQuery');
    cy.fixture('removeToDoItem').as('removeToDoItemQuery');
});

context('ToDo App - Elements creations', () => {
    beforeEach(function() {
        cy.mockGraphQL([this.getToDoListQuery, this.addToDoQuery, this.addToDoItemQuery]);

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

    it('it should focus and create a new ToDo item for a list', () => {
        const text = 'ToDo item inside a ToDo list';

        cy.get('.toDoApp > .toDoApp__toDoContainer')
            .first()
            .find('[data-testid="inputForm-textInput-add"]')
            .focus()
            .type(text)
            .should('have.value', text);

        cy.get('.toDoApp > .toDoApp__toDoContainer')
            .first()
            .find('[data-testid="inputForm-submitButton-add"]')
            .click();

        cy.get('.toDoApp > .toDoApp__toDoContainer')
            .first()
            .contains('.toDoList li', text)
            .should('contain', text);
    });
});

context('ToDo app - Elements removal', () => {
    beforeEach(function() {
        cy.mockGraphQL([this.getToDoListQuery, this.removeToDoQuery, this.removeToDoItemQuery]);

        cy.visit('/');
    });

    // https://on.cypress.io/interacting-with-elements

    it('it should remove a ToDo list', () => {
        const text = 'ToDo List 1';

        cy.get('.toDoApp > .toDoApp__toDoContainer .toDoApp__toDoControl').within(cont => {
            const container = cont.filter((key, value) => {
                return value.querySelector('.title').innerText.includes(text);
            });

            cy.wrap(container)
                .find('[data-testid=toDoApp-removeToDo]')
                .click();
        });

        cy.get('.toDoApp > .toDoApp__toDoContainer .title').should('not.contain', text);
    });

    it('it should remove a ToDo item from a list', () => {
        const text = 'Rats';

        cy.get('.toDoApp > .toDoApp__toDoContainer').within(cont => {
            const container = cont.filter((key, value) => {
                return value.querySelector('.title').innerText.includes('Favourite Animals');
            });

            cy.wrap(container)
                .contains('.toDoList li', text)
                .find('[data-testid="toDoList-removeToDoItem"]')
                .click();

            cy.wrap(container)
                .find('.toDoList li')
                .should('not.contain', text);
        });
    });
});
