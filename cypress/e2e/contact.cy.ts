describe('Check Contact App functionality', () => {
  it('opens the application', () => {
    cy.visit('/');
  });
  it('should show the contact page', () => {
    cy.get('h2').contains('Contacts');
    cy.get('input[type="search"]').should('be.visible');
    cy.get('li').should('have.length.above', 0);
  });

  it('should be able to create a new contact', () => {
    cy.get('button').click();
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="birthday"]').type('2000-01-01');
    cy.get('input[name="avatar"]').type(
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1055.jpg'
    );
    cy.get('button').contains('Create').click();
  });

  it('should show new contact in list', () => {
    cy.get('li').contains('Test User');
  });

  it('should be able to view new contact', () => {
    cy.get('input[type="search"]').type('Test User');
    cy.get('li').contains('Test User').click();
    cy.location('pathname').should('include', '/contacts/');
  });

  it('should show contact details', () => {
    cy.get('h2').contains('Test User');
    cy.get('a')
      .contains('test@test.test')
      .should('have.attr', 'href')
      .and('include', 'mailto:test@test.test');
    cy.get('a')
      .contains('1234567890')
      .should('have.attr', 'href')
      .and('include', 'tel:1234567890');
    cy.get('p').contains('01/01/2000');
  });

  it('should be able to edit contact', () => {
    cy.get('button').eq(1).click();
    cy.get('input[name="name"]').clear().type('Test User 2');
    cy.get('input[name="email"]').clear().type('test2@test2.test2');
    cy.get('input[name="phone"]').clear().type('0987654321');
    cy.get('input[name="birthday"]').clear().type('1999-01-01');
    cy.get('button').contains('Update').click();
  });

  it('should show updated contact on page', () => {
    cy.get('h2').contains('Test User 2');
    cy.get('a')
      .contains('test2@test2.test2')
      .should('have.attr', 'href')
      .and('include', 'mailto:test2@test2.test2');
    cy.get('a')
      .contains('0987654321')
      .should('have.attr', 'href')
      .and('include', 'tel:0987654321');
    cy.get('p').contains('01/01/1999');
  });

  it('should be able to delete contact', () => {
    cy.get('button').eq(0).click();
    cy.get('button').contains('Delete').click();
  });

  it('should redirect to contacts list page', () => {
    cy.location('pathname').should('equal', '/');
  });

  it('should not show deleted contact on page', () => {
    cy.get('li').should('not.contain', 'Test User 2');
  });
});
