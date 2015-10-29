# alt-form

Manages your forms with alt. Uses [`flux-form`](https://github.com/goatslacker/flux-form) for all the heavy lifting.

```js
const form = altForm('Company', alt, {
  fields: [ 'name' ],
})

class EditName extends React.Component {
  constructor(props) {
    super(props)

    this.state = form.getProps({
      name: props.initialName
    })
  }
  
  // Please don't connect stores yourself, use something like
  // https://github.com/altjs/react which connects your stores automatically
  componentDidMount() {
    this.unlisten = form.store.listen(state => this.setState(state))
  }
  
  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    return (
      <div>
        <label className="quarter" htmlFor="Company Name">Company Name</label>
        <input
          type="input"
          placeholder="Name"
          {...this.state.props.name}
        />

        <input type="button" onClick={this.state.save} />
      </div>
    )
  }
}

export default EditName
```

```js
<EditName initialName="Jane" />
```

This allows you to edit a name. `altForm` will return you an Alt store which
keeps track of all the edits made and handles listening to the actions for you.
