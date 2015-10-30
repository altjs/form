import fluxForm, { getActionCreators } from 'flux-form'

export const isRequired = (data) => {
  if (!data) throw new Error('Field is required')
}

export { getActionCreators }

export default (namespace, alt, opts) => {
  const state = opts.state || {}

  const {
    changed,
    saved,
    canceled,
    validationFailed,
    focused,
    blurred,
  } = getActionCreators(namespace)

  const store = alt.createUnsavedStore({
    state: {
      errors: null,
      focused: null,
      state,
    },
    bindListeners: {
      change: [changed, saved, canceled],
      fail: validationFailed,
      focus: focused,
      blur: blurred,
    },
    fail(invalidState) {
      this.setState({ errors: invalidState })
    },
    change(state) {
      this.setState({ errors: null, state })
    },
    focus(key) {
      this.setState({
        focused: key
      })
    },
    blur() {
      this.setState({ focused: null })
    }
  })

  let form = null

  // getProps takes some state and merges it with the store's state
  // this is so you can pass in state during render time and have it be picked
  // up automatically by the form
  const getProps = (state) => {
    form = fluxForm(namespace, alt, {
      ...opts,
      state: { ...state, ...store.getState().state },
    })

    return form
  }

  const validate = (cb, v) => form ? form.validate(cb, v) : Promise.reject()
  const save = cb => form ? form.save(cb) : Promise.reject()
  const normalize = () => form ? form.normalize() : null

  return {
    store,
    state,
    getProps,
    validate,
    save,
  }
}
