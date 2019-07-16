
class Application {

  state = {
    brands: {},
    models: {},
    selected: {
      brand: null,
      model: null,
      keywords: null
    }
  }

  $broker = $({})
  components = {}

  get brands() {
    return this.state.brands
  }

  set brands(data) {
    this.state.brands = data
  }

  get models() {
    return this.state.models
  }

  set models(data) {
    this.state.models = data
  }

  get selectedbrands() {
    return this.state.selected.brand
  }

  set selectedbrands(id) {
    if(id == 0) {
      this.state.selected.brand = null
      this.state.selected.model = null
      this.$broker.trigger('reset:models')
    } else if(id !== this.state.selected.brand && id != 0) {
      this.state.selected.brand = id
      this.$broker.trigger('selected:brand')
    }
  }

  get selectedmodels() {
    return this.state.selected.model
  }

  set selectedmodels(id) {
    if(id == 0) {
      this.state.selected.model = null
      this.$broker.trigger('reset:keywords')
    } else {
      this.state.selected.model = id
      this.$broker.trigger('selected:model')
    }
  }

  get selectedkeywords() {
    return this.state.selected.keywords
  }

  set selectedkeywords(value) {
    if(!value.length) {
      this.state.selected.keywords = null
      this.$broker.trigger('reset:submit')
    } else {
      this.state.selected.keywords = value
      this.$broker.trigger('selected:keywords')
    }
  }

  constructor() {

    const comps = document.querySelectorAll('[data-component="form-control"]')
    comps.forEach((comp) => {
      this.components[comp.name] = comp
    })

    this.request('brands').done(() => this.populate('brands'))

    this.$broker.on('selected:brand', (event) => {
      this.request('models').done(() => this.populate('models'))
    })

    this.$broker.on('reset:models', () => this.resetModels('models'))

    this.attachElementListeners()
    this.validator()
  }

  validator() {
    this.$broker.on(
      'selected:brand selected:model selected:keywords reset:models reset:keywords reset:submit',
    (event) => {
      if(this.selectedbrands) {
        this['enable']('submit')
        this['enable']('models')
      } else if(this.selectedkeywords) {
        this['enable']('submit')
      } else {
        this['disable']('submit')
        this['disable']('models')
      }
    })
  }

  enable(name) {
    this.components[name].removeAttribute('disabled')
    this.components[name].classList.remove('disabled')
  }

  disable(name) {
    this.components[name].setAttribute('disabled', 'disabled')
    this.components[name].classList.add('disabled')
  }

  attachElementListeners() {
    for(let key in this.components) {
      const el = this.components[key]
      $(el).on('change', (event) => {
        if(event.target.type !== 'text') {
          return this[`selected${key}`] = el.options[el['selectedIndex']].value
        }

        this.selectedkeywords = event.target.value
      })
    }
  }

  request(type) {
    const $def = $.Deferred()
    let url = `/api/cars/${type}`

    if(this.selectedbrands) {
      url = `${url}?brand_id=${this.selectedbrands}`
    }

    $.get(url).done((data) => {
      this[type] = data
      $def.resolve(data)
    })

    return $def
  }

  resetModels(name) {
    this.components[name].options.length = 0
    let firstOption = document.createElement("option")
    firstOption.setAttribute('value', 0)
    firstOption.text = `-- All ${name} --`
    this.components[name].add(firstOption)
  }

  populate(name) {

    if(this.selectedbrands) {
      this.resetModels(name)
    }

    this[name].forEach((item) => {
      let option = document.createElement("option")
      option.setAttribute('value', item._id)
      option.text = item.text
      this.components[name].add(option)
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let app
  const applicationElement = document.querySelector('[data-component="application"]')
  if(applicationElement) new Application()
})
