var EventEmitter = require('generate-js-events');

/**
 * A type assert method.
 * @param  {Any} variable
 * @param  {String} type
 * @return {void}
 */
function assertType(variable, type) {
    if (typeof variable !== type) {
        throw new Error('Expected ' + type + ' but found ' + typeof variable);
    }
}

var Bindable = EventEmitter.generate(
    /**
     * [Bindable description]
     * @param {Object} data
     */
    function Bindable(data) {
        var _ = this;

        _.defineProperties({
            _data: {}
        });

        for (var key in data) {
            _._data[key] = data[key];
        }
    }
);

Bindable.definePrototype({
    /**
     * [get description]
     * @param  {String} property
     * @return {Any}
     */
    get: function get(property) {
        var _ = this;

        var overWrittenGetter = _['get'+property.slice(0, 1).toUpperCase()+property.slice(1)];
        if (typeof overWrittenGetter === 'function') {
            return overWrittenGetter.call(_);
        }

        return _._data[property];
    },

    /**
     * [set description]
     * @param {String} property
     * @param {Any} newValue
     * @param {Object} changer
     */
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

    /**
     * [bind description]
     * @param  {String} property
     * @param  {Function} listener
     * @param  {Object} observer
     * @return {self}
     */
    bind: function bind(property, listener, observer) {
        assertType(property, 'string');
        assertType(listener, 'function');
        assertType(observer, 'object');

        var _ = this;

        _.on(property, listener, observer);

        var value = _.get(property);

        _.__initial__ = true;

        listener.call(_, value, value, false);

        _.__initial__ = false;

        return _;
    },

    /**
     * [bindOnce description]
     * @param  {String} property
     * @param  {Function} listener
     * @param  {Object} observer
     * @return {self}
     */
    bindOnce: function bindOnce(property, listener, observer) {
        assertType(property, 'string');
        assertType(listener, 'function');
        assertType(observer, 'object');

        var _ = this;

        _.once(property, listener, observer);

        var value = _.get(property);

        listener.call(_, value, value, false);

        return _;
    },

    /**
     * [unbind description]
     * @param  {String} [property]
     * @param  {Function} [listener]
     * @param  {Object} [observer]
     * @return {self}
     */
    unbind: function unbind(property, listener, observer) {
        return this.off(property, listener, observer);
    },

    /**
     * [change description]
     * @param {String} property
     * @param {Any} oldValue
     * @param {Any} newValue
     * @param {Object} changer
     * @return {Boolean}
     */
    change: function change(property, oldValue, newValue, changer, object) {
        assertType(property, 'string');
        assertType(changer, 'object');

        var _ = this;

        /**
         * Creates a closure around the listener 'func' and 'args'.
         * @param  {Function} func A listener.
         * @return {Function}      Closure function.
         */
        function emitOnFunc(func) {
            return function () {
                func.call(_, oldValue, newValue, changer, object);
            };
        }

        if (oldValue === newValue) return;

        object = object && typeof object === 'object' ? object : _;

        _.emit('changed', property, oldValue, newValue, changer, object);

        var bindings = _.__events[property];

        if (!bindings || !bindings.length) {
            return false;
        }

        var length = bindings.length;

        for (var i = 0; i < length; i++) {
            if (!changer || bindings[i].observer !== changer) {
                setTimeout(emitOnFunc(bindings[i].listener), 0);
            }
        }

        return true;
    }
});

module.exports = Bindable;
