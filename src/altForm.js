import fluxForm, { getActionCreators } from 'flux-form'

export default (namespace, alt, opts) => {
  const state = opts.state || {}

  const { changed, saved, canceled } = getActionCreators(namespace)

  const store = alt.createUnsavedStore({
    state: state,
    bindListeners: {
      change: [changed.id, saved.id, canceled.id],
    },
    change(state) {
      this.setState(state)
    }
  })

  // getProps takes some state and merges it with the store's state
  // this is so you can pass in state during render time and have it be picked
  // up automatically by the form
  const getProps = (state) => {
    return fluxForm(namespace, alt.dispatcher, {
      ...opts,
      state: { ...state, ...store.getState() },
    })
  }

  return { store, state, getProps }
}
