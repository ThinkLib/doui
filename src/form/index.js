/**
 * 各种表单元素组件
 * @authors yutent (yutent@doui.cc)
 * @date    2018-06-12 13:08:41
 * @version $Id$
 */

import 'css/form.scss'
const log = console.log

Anot.ui.form = '0.1.0'
// 按钮
Anot.component('button', {
  __init__(props, state, next) {
    state.text = this.text()
    state.style = { 'border-radius': props.radius }
    this.classList.add('do-fn-noselect')
    this.classList.add('do-button')
    this.classList.add(props.color || 'grey')
    this.setAttribute(':click', 'onClick')
    this.setAttribute(':class', '{disabled: disabled}')
    this.setAttribute(':css', 'style')

    if (props.size) {
      this.classList.add(props.size)
    }
    if (props.hasOwnProperty('disabled')) {
      state.disabled = true
    }
    delete props.disabled
    delete props.color
    delete props.size

    next()
  },
  render(slots) {
    let icon = ''
    if (this.props.icon) {
      icon = `<i class="do-button__icon do-icon-${this.props.icon}"></i>`
    }
    return `${icon}<span class="do-button__text" :text="text"></span>`
  },
  state: {
    text: '',
    disabled: false,
    style: {}
  },
  props: {
    click: Anot.PropsTypes.isFunction()
  },
  skip: ['style'],

  watch: {},
  methods: {
    onClick() {
      if (this.disabled) {
        return
      }
      if (typeof this.props.click === 'function') {
        this.props.click(this.props.prop)
      }
    }
  }
})

// 单选按钮
Anot.component('radio', {
  __init__(props, state, next) {
    if (props.hasOwnProperty('disabled')) {
      state.disabled = true
    }
    if (props.hasOwnProperty('checked')) {
      if (state.value === null) {
        state.value = props.label
      }
    }

    state.text = this.text()
    state.checked = state.value === props.label

    this.classList.add('do-radio')
    this.classList.add('do-fn-noselect')
    this.classList.add(props.color || 'grey')
    this.setAttribute(':class', '{disabled: disabled, checked: checked}')
    this.setAttribute(':click', 'onClick')

    delete props.disabled
    delete props.color

    next()
  },
  render() {
    return `
      <span class="do-radio__box"></span>
      <span class="do-radio__text" :text="text"></span>
    `
  },
  state: {
    value: null,
    text: '',
    checked: false,
    disabled: false
  },
  props: {
    label: ''
  },
  watch: {
    value(val) {
      this.checked = this.props.label === val
    }
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return
      }
      if (!this.checked) {
        this.checked = true
        this.value = this.props.label
      }
    }
  }
})

// 开关
Anot.component('switch', {
  __init__(props, state, next) {
    if (props.hasOwnProperty('disabled')) {
      state.disabled = true
    }
    if (props.hasOwnProperty('checked')) {
      if (state.value === null) {
        state.value = true
      }
    }
    state.value = !!state.value

    this.classList.add('do-switch')
    this.classList.add('do-fn-noselect')
    this.classList.add(props.color || 'grey')
    this.setAttribute(':class', '{disabled: disabled, checked: value}')
    this.setAttribute(':click', 'onClick')

    delete props.disabled
    delete props.color
    next()
  },
  render() {
    return `
      <span class="do-switch__label"><i class="do-switch__dot"></i></span>
    `
  },
  state: {
    value: null,
    disabled: false
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return
      }
      this.value = !this.value
    }
  }
})

// 多选
Anot.component('checkbox', {
  __init__(props, state, next) {
    if (!Array.isArray(state.value)) {
      this.parentNode.removeChild(this)
      Anot.error('多选框的传入值必须一个数组', TypeError)
    }
    if (props.hasOwnProperty('disabled')) {
      state.disabled = true
    }
    if (props.hasOwnProperty('checked')) {
      Anot.Array.ensure(state.value, props.label)
    }

    state.text = this.text()
    state.checked = state.value.indexOf(props.label) > -1

    this.classList.add('do-checkbox')
    this.classList.add('do-fn-noselect')
    this.classList.add(props.color || 'grey')
    this.setAttribute(':class', '{disabled: disabled, checked: checked}')
    this.setAttribute(':click', 'onClick')

    delete props.disabled
    delete props.color
    next()
  },
  render() {
    return `
      <span class="do-checkbox__box">
        <i class="do-icon-get" :visible="checked"></i>
      </span>
      <span class="do-checkbox__text" :text="text"></span>
    `
  },
  state: {
    value: [],
    text: '',
    checked: false,
    disabled: false
  },
  props: {
    label: ''
  },
  watch: {
    'value.*'(val, old, k, kk) {
      this.checked = this.value.indexOf(this.props.label) > -1
    },
    'value.length'(val, old, k, kk) {
      this.checked = this.value.indexOf(this.props.label) > -1
    },
    value(val, old, k, kk) {
      this.checked = this.value.indexOf(this.props.label) > -1
    }
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return
      }
      let { label } = this.props
      let list = this.value.$model
      for (let i in list) {
        if (list[i] === label) {
          this.checked = false
          this.value.removeAt.call(this.value, i)
          return
        }
      }
      this.checked = true
      this.value.push(label)
    }
  }
})

// 文本输入框
Anot.component('input', {
  __init__(props, state, next) {
    if (props.hasOwnProperty('disabled')) {
      state.disabled = true
    }
    if (props.iconR) {
      state.pos = 'right'
      props.icon = props.iconR
      delete props.iconR
    }
    this.classList.add('do-input')
    this.classList.add('do-fn-noselect')
    this.classList.add(props.color || 'grey')
    if (props.icon) {
      this.classList.add('icon-' + state.pos)
    }
    this.setAttribute(':class', '{disabled: disabled, active: active}')
    this.setAttribute(':css', '{width: props.width}')

    delete props.disabled
    delete props.color
    next()
  },
  render() {
    let { icon, placeholder } = this.props
    let holder = `
      <span 
        class="do-input__holder"
        :class="{visible: !value || active}"
        :text="props.placeholder"></span>`
    let input = `
      <input 
        class="do-input__input"
        :attr="{disabled: disabled, type: props.type }"
        :duplex="value" 
        :keyup="onKeyup"
        :blur="onBlur"
        :focus="onFocus" />`
    let ico = icon ? `<i class="do-input__icon do-icon-${icon}"></i>` : ''

    return holder + input + ico
  },
  state: {
    pos: 'left', // icon position
    value: '',
    disabled: false,
    active: false
  },
  skip: ['pos'],
  props: {
    type: 'text',
    width: 180,
    placeholder: '',
    default: '',
    submit: Anot.PropsTypes.isFunction() // on key `ENTER`
  },
  methods: {
    onFocus() {
      this.active = true
    },
    onBlur() {
      this.active = false
    },
    onKeyup(ev) {
      if (this.disabled) {
        return
      }
      if (ev.keyCode === 13) {
        if (typeof this.props.submit === 'function') {
          this.props.submit()
        }
      }
    }
  }
})

export default Anot
