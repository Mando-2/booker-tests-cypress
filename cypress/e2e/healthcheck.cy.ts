describe('Healthcheck Tests', () => {
    it('performs a healthcheck', () => {
        cy.log('Call the ping Endpoint')
      .then(() => {
        const options = {
          method: 'GET',
          url: `/ping`,
          body: {            
          },
          headers: {
            Accept: `*/*`,
          }
        };
        cy.request(options)
          .then((response) => {
            cy.log('response', response);
            // documentation states that the response should be 200 OK and 201 Created for the healthcheck
            // documentation is unclear on the expected response for the ping endpoint
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal('Created');            
          });
      });
    });
});