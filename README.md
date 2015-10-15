# alt-form

Manages your forms with alt. Uses [`flux-form`](https://github.com/goatslacker/flux-form) for all the heavy lifting.

```js
class EditName extends React.Component {
  render() {
    return (
      <div>
        <label className="quarter" htmlFor="Company Name">Company Name</label>
        <input
          type="input"
          placeholder="Name"
          {...this.props.form.props.name}
        />

        <input type="button" onClick={this.props.form.save} />
      </div>
    )
  }
}

export default connectToStores(EditName, () => {
  const form = altForm('Company', alt, {
    fields: [ 'name' ],
  })

  return {
    listenTo() {
      return [form.store]
    },

    getProps(props) {
      return {
        form: form.getProps({
          name: props.initialName
        })
      }
    },
  }
})

<EditName initialName="Jane" />
```

This allows you to edit a name. `altForm` will return you an Alt store which
keeps track of all the edits made and handles listening to the actions for you.
