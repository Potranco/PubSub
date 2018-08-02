var expect = require('chai').expect
var PubSub = require('../src/index.js')

var events = new PubSub()
var eventHandler = function (callback) {
  callback()
}
var obj = {
  num: 0
}

describe('Pubsub', function () {
  it('Loaded', function () {
    expect(typeof PubSub).to.not.equal('undefined')
  })
  it('Create event', function () {
    events.on('Custom', eventHandler)
    expect(typeof events.callbacks['Custom']).to.not.equal('undefined')
  })
  it('Execute event', function (done) {
    events.emit('Custom', done)
  })
  it('Execute event not params', function (done) {
    events.on('Custom2', function () { obj.num = 1})
    events.emit('Custom2')
    setTimeout(function () {
      return expect(obj.num).to.equal(1) && done()
    }, 1)
  })
  it('Remove event', function () {
    events.remove('Custom')
    expect(typeof events.callbacks['Custom']).to.equal('undefined')
  })
  it('Remove all events', function () {
    events.removeAll()
    expect(typeof events.callbacks['Custom2']).to.equal('undefined')
  })
})
