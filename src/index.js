class PubSub {
  constructor () {
    this.callbacks = {}
  }
  on (name, callback) {
    this.callbacks[name] = (this.callbacks[name] || []).concat(callback)
  }
  emit (name, ...args) {
    return Promise.all(
      this.callbacks[name]
        .map((fnc) => Promise.resolve(fnc.apply(this, args)))
    )
  }
  remove (name) {
    this.callbacks[name] = []
  }
  removeAll (name) {
    this.callbacks = {}
  }
}

module.exports = PubSub
