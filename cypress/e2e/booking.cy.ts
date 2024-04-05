describe('Booking tests', () => {

    it('Can get all booking ids', () => {
        cy.log('Call the booking Endpoint')
            .then(() => {
                const options = {
                    method: 'GET',
                    url: `/booking?firstname=sally&lastname=brown`,
                    body: {
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
                        Cypress._.each(response.body, (booking) => {
                            expect(booking).to.have.property('bookingid');
                            expect(booking.bookingid).to.be.a('number');
                        });
                    });
            });
    });

    it('Can get booking ids by name', () => {
        cy.log('Call the booking Endpoint')
            .then(() => {
                const options = {
                    method: 'GET',
                    url: `/booking`,
                    body: {
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
                        Cypress._.each(response.body, (booking) => {
                            expect(booking).to.have.property('bookingid');
                            expect(booking.bookingid).to.be.a('number');
                        });
                    });
            });
    });

    it('Can get booking ids by check in and check out dates', () => {
        cy.log('Call the booking Endpoint')
            .then(() => {
                const options = {
                    method: 'GET',
                    url: `/booking?checkin=2014-03-13&checkout=2014-05-21`,
                    body: {
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
                        Cypress._.each(response.body, (booking) => {
                            expect(booking).to.have.property('bookingid');
                            expect(booking.bookingid).to.be.a('number');
                        });
                    });
            });
    });

    it('Can get booking info for a specific id', () => {
        cy.log('Call the booking Endpoint')
            .then(() => {
                const options = {
                    method: 'GET',
                    url: `/booking/1`,
                    body: {
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
                        // because the data for the site is generated randomly, 
                        // we can't make any assumptions about the values so I
                        // am just validating that the fields are present and 
                        // of the correct type
                        expect(response.body.firstname).to.be.a('string');
                        expect(response.body.lastname).to.be.a('string');
                        expect(response.body.totalprice).to.be.a('number');
                        expect(response.body.depositpaid).to.be.a('boolean');
                        expect(response.body.bookingdates.checkin).to.be.a('string');
                        expect(response.body.bookingdates.checkout).to.be.a('string');
                        // not every booking has an additionalneeds field based on the rules
                        // for generating the data
                        if (response.body.additionalneeds !== undefined) {
                            expect(response.body.additionalneeds).to.be.a('string');
                        }
                    });
            });
    });

    it('Can create a booking', () => {
        cy.log('Call the booking Endpoint')
            .then(() => {
                const options = {
                    method: 'POST',
                    url: `/booking/`,
                    body: {
                        firstname: 'David',
                        lastname: 'Grandfield',
                        totalprice: 123,
                        depositpaid: true,
                        bookingdates: {
                            checkin: '2014-03-13',
                            checkout: '2014-05-21'
                        },
                        additionalneeds: 'Ferarri'
                    },
                    headers: {
                        Accept: `application/json`,
                        "Content-Type": "application/json"
                    }
                };
                cy.request(options)
                    .then((response) => {
                        cy.log('response', response);
                        expect(response.status).to.be.equal(200);
                        expect(response.statusText).to.be.equal('OK');
                        // because the data for the site is generated randomly, 
                        // we can't make any assumptions about the values so I
                        // am just validating that the fields are present and 
                        // of the correct type
                        expect(response.body.bookingid).to.be.a('number'),
                            expect(response.body.booking.firstname).to.equal('David');
                        expect(response.body.booking.lastname).to.equal('Grandfield');
                        expect(response.body.booking.totalprice).to.equal(123);
                        expect(response.body.booking.depositpaid).to.equal(true);
                        expect(response.body.booking.bookingdates.checkin).to.equal('2014-03-13');
                        expect(response.body.booking.bookingdates.checkout).to.equal('2014-05-21');
                        expect(response.body.booking.additionalneeds).to.equal('Ferarri');
                    });
            });
    });

    it('Can update a booking', () => {
        let token = '';
        cy.log('Call the auth Endpoint')
            .then(() => {
                const authoptions = {
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
                cy.request(authoptions)
                    .then((authResponse) => {
                        cy.log('Response', authResponse);
                        expect(authResponse.status).to.be.equal(200);
                        expect(authResponse.statusText).to.be.equal('OK');
                        expect(authResponse.body).to.have.property('token');
                        token = authResponse.body.token;
                    });
            });
        cy.log('Call the booking Endpoint')
            .then(() => {
                const options = {
                    method: 'PUT',
                    url: `/booking/1`,
                    body: {
                        firstname: 'Arthur',
                        lastname: 'Ramsey',
                        totalprice: 321,
                        depositpaid: false,
                        bookingdates: {
                            checkin: '2024-03-13',
                            checkout: '2024-05-21'
                        },
                        additionalneeds: 'Jeaunneu 47'
                    },
                    headers: {
                        Accept: `application/json`,
                        "Content-Type": "application/json",
                        "Cookie": `token=${token}`,
                        // Authorization: `Basic ${token}`
                    }
                };
                cy.request(options)
                    .then((response) => {
                        cy.log('response', response);
                        expect(response.status).to.be.equal(200);
                        expect(response.statusText).to.be.equal('OK');
                        expect(response.body.firstname).to.equal('Arthur');
                        expect(response.body.lastname).to.equal('Ramsey');
                        expect(response.body.totalprice).to.equal(321);
                        expect(response.body.depositpaid).to.equal(false);
                        expect(response.body.bookingdates.checkin).to.equal('2024-03-13');
                        expect(response.body.bookingdates.checkout).to.equal('2024-05-21');
                        expect(response.body.additionalneeds).to.equal('Jeaunneu 47');
                    });
            });            
    });

    // requires the site to be brought down and back up to reset the data
    it('Can delete a booking', () => {
        let token = '';
        cy.log('Call the auth Endpoint')
            .then(() => {
                const authoptions = {
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
                cy.request(authoptions)
                    .then((authResponse) => {
                        cy.log('Response', authResponse);
                        expect(authResponse.status).to.be.equal(200);
                        expect(authResponse.statusText).to.be.equal('OK');
                        expect(authResponse.body).to.have.property('token');
                        token = authResponse.body.token;
                    });
            });
        cy.log('Call the booking Endpoint')
            .then(() => {
                const options = {
                    method: 'DELETE',
                    url: `/booking/1`,
                    body: {
                    },
                    headers: {
                        Accept: `application/json`,
                        "Content-Type": "application/json",
                        "Cookie": `token=${token}`,
                        // Authorization: `Basic ${token}`
                    }
                };
                cy.request(options)
                    .then((response) => {
                        cy.log('response', response);
                        expect(response.status).to.be.equal(201);
                        expect(response.statusText).to.be.equal('Created');
                    });
            });            
    });
});