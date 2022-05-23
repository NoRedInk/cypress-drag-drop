// ***********************************************************
// this example support/index.js is processed and
// loaded automatically before your test files.
//
// this is a great place to put global configuration and
// behavior that modifies Cypress.
//
// you can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// you can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'

Cypress.Screenshot.defaults({ screenshotOnRunFailure: false })

before(() => {
  // do not truncate assertion outputs of arrays and objects
  window.chai.config.truncateThreshold = 0
})
