beforeEach(() => {
    // Fetch fixtures
    cy.fixture('getToDoList').as('getToDoListQuery');
    cy.fixture('addToDo').as('addToDoQuery');
    cy.fixture('addToDoItem').as('addToDoItemQuery');
    cy.fixture('removeToDo').as('removeToDoQuery');
    cy.fixture('removeToDoItem').as('removeToDoItemQuery');
    cy.fixture('updateToDoItem').as('updateToDoItemQuery');
});

context('ToDo App - Add', () => {
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
            .within(cont => {
                cy.wrap(cont)
                    .find('[data-testid="inputForm-textInput-add"]')
                    .focus()
                    .type(text)
                    .should('have.value', text);

                cy.wrap(cont)
                    .find('.toDoList li')
                    .should('not.contain', text);

                cy.wrap(cont)
                    .find('[data-testid="inputForm-submitButton-add"]')
                    .click();

                cy.wrap(cont)
                    .find('.toDoList li')
                    .should('contain', text);
            });
    });
});

context('ToDo app - Remove', () => {
    beforeEach(function() {
        cy.mockGraphQL([this.getToDoListQuery, this.removeToDoQuery, this.removeToDoItemQuery]);

        cy.visit('/');
    });

    it('it should remove a ToDo list', () => {
        const listName = 'ToDo List 1';

        cy.get('.toDoApp > .toDoApp__toDoContainer .toDoApp__toDoControl').within(cont => {
            const container = cont.filter((key, value) => {
                return value.querySelector('.title').innerText.includes(listName);
            });

            cy.wrap(container)
                .find('[data-testid=toDoApp-removeToDo]')
                .click();
        });

        cy.get('.toDoApp > .toDoApp__toDoContainer .title').should('not.contain', listName);
    });

    it('it should remove a ToDo item from a list', () => {
        const listName = 'Favourite Animals';
        const text = 'Rats';

        cy.get('.toDoApp > .toDoApp__toDoContainer').within(cont => {
            const container = cont.filter((key, value) => {
                return value.querySelector('.title').innerText.includes(listName);
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

context('ToDo app - Update', () => {
    beforeEach(function() {
        cy.mockGraphQL([this.getToDoListQuery, this.updateToDoItemQuery]);

        cy.visit('/');
    });

    it('it should check a ToDo item as complete', () => {
        const listName = 'Favourite Animals';
        const text = 'Cats';

        cy.get('.toDoApp > .toDoApp__toDoContainer').within(cont => {
            const container = cont.filter((key, value) => {
                return value.querySelector('.title').innerText.includes(listName);
            });

            cy.wrap(container)
                .contains('.toDoList li', text)
                .find('[data-testid="toDoList-updateToDoItem"]')
                .check()
                .should('be.checked');
        });
    });

    it('it should uncheck a ToDo item', () => {
        cy.get('.toDoApp > .toDoApp__toDoContainer')
            .first()
            .find('[data-testid="toDoList-updateToDoItem"]')
            .first()
            .uncheck()
            .should('not.be.checked');
    });
});
