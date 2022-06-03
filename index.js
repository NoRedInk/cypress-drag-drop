const dataTransfer = new DataTransfer()

function omit (object = {}, keys = []) {
  return Object.entries(object).reduce((accum, [ key, value ]) => key in keys ? accum : { ...accum, [key]: value }, {})
}

const DragSimulator = {
  targetSelector: null,
  sourceElement: null,
  options: null,
  createDefaultOptions (allOptions) {
    const commonOptions = omit(allOptions, [ 'source', 'target' ])
    const sourceOptions = { ...commonOptions, ...allOptions.source }
    const targetOptions = { ...commonOptions, ...allOptions.target }
    return { sourceOptions, targetOptions }
  },
  dragstart ({ clientX, clientY } = {}) {
    return cy.wrap(this.sourceElement)
      .trigger('pointerdown', {
        which: 1,
        button: 0,
        clientX,
        clientY,
        eventConstructor: 'PointerEvent',
        ...this.options.sourceOptions
      })
      .trigger('mousedown', {
        which: 1,
        button: 0,
        clientX,
        clientY,
        eventConstructor: 'MouseEvent',
        ...this.options.sourceOptions
      })
      .trigger('dragstart', {
        dataTransfer,
        eventConstructor: 'DragEvent',
        ...this.options.sourceOptions
      })
  },
  drop ({ clientX, clientY } = {}) {
    return cy.get(this.targetSelector)
      .trigger('drop', {
        dataTransfer,
        eventConstructor: 'DragEvent',
        ...this.options.targetOptions
      })
      .then(() => {
        cy.get('html').then($html => {
          if ($html.find(this.targetSelector).length > 0) {
            cy.get(this.targetSelector)
              .trigger('mouseup', {
                which: 1,
                button: 0,
                clientX,
                clientY,
                eventConstructor: 'MouseEvent',
                ...this.options.targetOptions
              }).then(() => {
                cy.get('html').then($html => {
                  if ($html.find(this.targetSelector).length > 0) {
                    cy.get(this.targetSelector)
                      .trigger('pointerup', {
                        which: 1,
                        button: 0,
                        clientX,
                        clientY,
                        eventConstructor: 'PointerEvent',
                        ...this.options.targetOptions
                      })
                  }
                })
              })
          }
        })
      })
  },
  dragover ({ clientX, clientY } = {}) {
    let ret
    for (let i = 0; i < 5; i++) {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      ret = cy.get(this.targetSelector)
        .trigger('dragover', {
          dataTransfer,
          eventConstructor: 'DragEvent',
          ...this.options.targetOptions
        })
        .trigger('mousemove', {
          clientX,
          clientY,
          eventConstructor: 'MouseEvent',
          ...this.options.targetOptions
        })
        .trigger('pointermove', {
          clientX,
          clientY,
          eventConstructor: 'PointerEvent',
          ...this.options.targetOptions
        })
        .wait(100)
    }
    return ret
  },
  dragend () {
    cy.get('html').then($html => {
      if ($html.find(this.targetSelector).length > 0) {
        cy.get(this.targetSelector)
          .trigger('dragend', {
            dataTransfer,
            eventConstructor: 'DragEvent',
            ...this.options.targetOptions
          })
      }
    })
  },
  init (sourceElement, targetSelector, options = {}) {
    this.options = this.createDefaultOptions(options)
    this.sourceElement = sourceElement
    this.targetSelector = targetSelector
    return cy.get(this.targetSelector).should('exist')
  },
  drag (sourceWrapper, targetSelector, options) {
    this.init(sourceWrapper, targetSelector, options)
      .then(() => this.dragstart())
      .then(() => this.dragover())
      .then(() => this.drop())
      .then(() => this.dragend())
  },
  move (sourceWrapper, options) {
    const { deltaX, deltaY } = options
    const { top, left } = sourceWrapper.offset()
    const finalCoords = { clientX: top + deltaX, clientY: left + deltaY }
    this.init(sourceWrapper, sourceWrapper, options)
      .then(() => this.dragstart({ clientX: top, clientY: left }))
      .then(() => this.dragover(finalCoords))
      .then(() => this.drop(finalCoords))
      .then(() => this.dragend())
  }
}

function addChildCommand (name, command) {
  Cypress.Commands.add(name, { prevSubject: 'element' }, (...args) => command(...args))
}

addChildCommand('drag', DragSimulator.drag.bind(DragSimulator))
addChildCommand('move', DragSimulator.move.bind(DragSimulator))
