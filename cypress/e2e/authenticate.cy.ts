describe('Authentication tests', () => {
  it('can get an authentication token', () => {
    cy.log('Call the auth Endpoint')
      .then(() => {
        const options = {
          method: 'POST',
          url: `/auth`,
          body: {
            username: 'admin',
            password: 'password123',
          },
          headers: {
            Accept: `*/*`,
          }
        };
        cy.request(options)
          .then((response) => {
            cy.log('response', response);
            expect(response.status).to.be.equal(200);
            expect(response.statusText).to.be.equal('OK');
            expect(response.body).to.have.property('token');
          });
      });
  })

  it('returns error when password is invalid', () => {
    cy.log('Call the auth Endpoint')
      .then(() => {
        const options = {
          method: 'POST',
          url: `/auth`,
          body: {
            username: 'admin',
            password: 'password12345',
          },
          headers: {
            Accept: `*/*`,
          }
        };
        cy.request(options)
          .then((response) => {
            cy.log('response', response);
            // would recommend that the source be updated to return a 4xx status code
            expect(response.status).to.be.equal(200);
            expect(response.statusText).to.be.equal('OK');
            expect(response.body.reason).to.equals('Bad credentials');
          });
      });
  })
})