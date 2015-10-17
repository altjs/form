import fluxForm, { getActionCreators } from 'flux-form'

export const isRequired = (data) => {
  if (!data) throw new Error('Field is required')
}

export default (namespace, alt, opts) => {
  const state = opts.state || {}

  const { changed, saved, canceled, failed } = getActionCreators(namespace)

  const store = alt.createUnsavedStore({
    state: {
      errors: null,
      state,
    },
    bindListeners: {
      change: [changed, saved, canceled],
      fail: failed,
    },
    fail(invalidState) {
      this.setState({ errors: invalidState })
    },
    change(state) {
      this.setState({ errors: null, state })
    },
  })

  // getProps takes some state and merges it with the store's state
  // this is so you can pass in state during render time and have it be picked
  // up automatically by the form
  const getProps = (state) => {
    return fluxForm(namespace, {
      dispatch(res) {
        const { namespace, name } = res.meta

        const details = {
          id: res.type,
          namespace,
          name,
        }

        alt.dispatch(res.type, res.payload, details)
      }
    }, {
      ...opts,
      state: { ...state, ...store.getState().state },
    })
  }

  return { store, state, getProps }
}
