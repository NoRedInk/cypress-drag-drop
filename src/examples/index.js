import path from 'path'
import Vue from 'vue'

/**
 * automatically loads all examples
 * and initializes according components in Vue.
 * See https://goo.gl/NqtXNE
 */

function resolveComponents (components) {
  return components.keys().map((fileName) => {
    // get component config
    const component = components(fileName)

    // get PascalCase name of component
    const name = path.basename(fileName).replace('.vue', '')

    // look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    return { component: component.default || component, name, fileName }
  })
}

const requireLocalComponents = require.context(
  // the relative path of the components folder
  './',
  // whether or not to look in subfolders
  true,
  // the regular expression used to match base component filenames
  /\.(vue)$/
)

const registeredComponents = Object.keys(Vue.options.components)

// register local components globally
resolveComponents(requireLocalComponents).forEach(({ name, component, fileName }) => {
  if (registeredComponents.includes(name)) {
    const errorMessage = `Naming clash: The component under ${fileName} could not be registered, because there is already a component with the same name registered.`
    throw new Error(errorMessage)
  }
  Vue.component(name, component)
})
