var EventEmitter = require('generate-js-events');

function assertType(variable, type) {
    if (typeof variable !== type) {
        throw new Error('Expected ' + type + ' but found ' + typeof variable);
    }
}

var Bindable = EventEmitter.generate(function Bindable(data) {
    var _ = this;

    _.defineProperties({
        _data: {}
    });

    for (var key in data) {
        _._data[key] = data[key];
    }
});

Bindable.definePrototype({
    get: function get(property) {
        var _ = this;

        var overWrittenGetter = _['get'+property.slice(0, 1).toUpperCase()+property.slice(1)];
        if (typeof overWrittenGetter === 'function') {
            return overWrittenGetter.call(_);
        }

        return _._data[property];
    },
    set: function set(property, newValue, changer) {
        changer = typeof changer === 'object' ? changer : null;

        var _ = this;

        var overWrittenSetter = _['set'+property.slice(0, 1).toUpperCase()+property.slice(1)];
        if (typeof overWrittenSetter === 'function') {
            return overWrittenSetter.call(_, newValue, changer);
        }

        var oldValue = _.get(property);
        _._data[property] = newValue;

        _.change(property, oldValue, newValue, changer);
    },

    bind: function bind(property, listener, observer) {
        assertType(property, 'string');
        assertType(listener, 'function');
        assertType(observer, 'object');

        var _ = this;

        _.on(property, listener, observer);

        var value = _.get(property);

        listener.call(_, value, value, false);
    },
    bindOnce: function bindOnce(property, listener, observer) {
        assertType(property, 'string');
        assertType(listener, 'function');
        assertType(observer, 'object');

        var _ = this;

        _.once(property, listener, observer);

        var onceListener = function onceListener(oldValue, newValue, changer) {
            _.unbind(property, onceListener);
            listener.call(_, oldValue, newValue, changer);
        };

        _.on(property, onceListener, observer);
    },
    unbind: function unbind(property, listener, Observer) {
        this.off(property, listener, Observer);
    },
    change: function change(property, oldValue, newValue, changer) {
        assertType(property, 'string');
        assertType(changer, 'object');

        var _ = this;

        var bindings = _.__events[property];

        if (!bindings || !bindings.length) {
            return false;
        }

        var length = bindings.length;

        for (var i = 0; i < length; i++) {
            if (bindings[i].observer !== changer) {
                bindings[i].listener.call(_, oldValue, newValue, changer);
            }
        }

        return true;
    },
});

module.exports = Bindable;
