This is a Personal Contacts App built with the following tech stack:

- Next.js
- TypeScript
- ChakraUI
- Jest/React Testing Library
- Cypress
- Knex
- SQLite

### Steps to run locally

1.  Clone repository
2.  Run `yarn`
3.  Migrate and seed the database with: `yarn knex migrate:latest` and `yarn knex seed:run`
4.  Run `yarn dev`

### Running Tests

**E2E**: Run cypress tests with `yarn cypress:open` (note that local instance will need to be running)
**Unit**: Run `yarn test`

### Notes for Reviewer

##### Functionality

**All requested functionality has been completed and tested:**

- [x] View list of Contacts
- [x] Search Contacts
- [x] Create new Contact
- [x] View individual details of contact
- [x] Update Contact Details
- [x] Delete Contact

**Other requirements also covered:**

- [x] Well structured testable code
- [x] Best practice RESTful CRUD API using appropriate status codes
- [x] Server side validation
- [x] Dependencies/devDependencies configured correctly
- [x] Usage of Next.js using new App Router
- [x] Consistent formatting
- [x] Fully Tested
- [x] Form Validation
- [x] TypeScript
- [x] Fully Responsive

**Not covered:**
Due to time constraints, the following requirement was not covered

- [ ] Analysis of Search algorithm using Big O Notation

##### Tech Stack Choices

As per the brief, the project was initialised using Next.js and TypeScript, and as recommended testing tooling Cypress and Jest/RTL were also included.

To enable data persistance, a SQLite database was configured and managed using the Knex library. This choice was made as a lightweight option to allow data persistance, but also allowing the database to be switched out in future for something more production suitable like Postgres. Knex was chosen as has a built in ORM, but also enabled database migrations and seeders for a better developer experience when setting up the project locally.

##### Testing approach

As per the brief, both Unit Test and E2E Cypress tests have been fully implemented. With the exception of frontend components which utilised the Dialog component. Difficulties were found interacting with the component causing unit tests to fail. In the interest of time saving, these tests were deferred. However the overall functioanlity was captured at a higher level in the E2E tests. Cypress tests were implemented as a single journey which in which the following flow is tested:

1. Load application and view Contacts
2. Create new Contact
3. Search for new Contact in list
4. View details of created Contact
5. Update details of Contact
6. Delete Contact

With more time, thorough integration tests would also have been implemented in the following manner:

- Page level component tests would have been implemented testing the integration of its child components
- API Endpoint tests would have been implemented integrated with a test database

##### With more time

Spending more time on the project, there are a few things i have identified I would have liked to spend more time on:

- [ ] Integration Tests
- [ ] Testing ChakraUIs Dialog component
- [ ] Testing Next.js async server components
- [ ] Inconsistent performance / How to better use Next.js Caching
- [ ] Cross Browser testing
- [ ] Accessibility compliant
- [ ] Configure development pipelines
- [ ] Deploy to environment
- [ ] Configure continuous deployment in pipelines
- [ ] Reconfigure Cypress tests to a more scalable structure
