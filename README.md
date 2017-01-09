# Generate-JS-Bindings

[![GitHub release](https://img.shields.io/github/release/Mike96angelo/Generate-JS-Bindings.svg?maxAge=21600)](https://github.com/Mike96Angelo/Generate-JS-Bindings)
[![npm version](https://img.shields.io/npm/v/generate-js-bindings.svg?maxAge=21600)](https://www.npmjs.com/package/generate-js-bindings)
[![npm downloads](https://img.shields.io/npm/dm/generate-js-bindings.svg?maxAge=604800)](https://www.npmjs.com/package/generate-js-bindings)
[![npm downloads](https://img.shields.io/npm/dt/generate-js-bindings.svg?maxAge=604800)](https://www.npmjs.com/package/generate-js-bindings)

## Table of Contents

* [ Bindable ](#event-emitter)
    * [ Inherits: EventEmitter::Generation ](https://github.com/Mike96Angelo/Generate-JS-events#class-generation)
    * [ new Bindable() ](#bindable-create)
    * [ Bindable.generate(create) ](#bindable-generate)
    * [ CLass: Generation ](#class-generation)
        * [ Inherits: EventEmitter::Generation ](https://github.com/Mike96Angelo/Generate-JS-events#class-generation)
    * [ Class: Creation ](#class-creation)
        * [ Inherits: EventEmitter::Creation ](https://github.com/Mike96Angelo/Generate-JS-events#class-creation)
        * [ Creation.bind(property, listener[, observer]) ](#creation-bind)
        * [ Creation.bindOnce(property, listener[, observer]) ](#creation-bind-once)
        * [ Creation.unbind([property][, listener][, observer]) ](#creation-unbind)
        * [ Creation.change(property, oldValue, newValue, changer) ](#creation-change)

<a name="event-emitter"></a>
Bindable
========

A generator for Bindable, lets you create an objects that you can bind functions to property changes, or generate a new generator that inherits from Bindable.

### Install:
```
$ npm install generate-js-bindings
```

<a name="bindable-create"></a>
## new Bindable()

* *return*: `Object` A new object that inherits from **Bindable**.

Creates a new object that inherits from **Bindable**.

<a name="bindable-generate"></a>
## Bindable.generate(create)

* *create* `Function` Create method that gets called when creating a new object that inherits from **Bindable**.
* *return*: `Generator` A new generator that inherits from **Bindable**.

Returns a new generator that inherits from **Bindable**.

<a name="class-generation"></a>
## Class: Generation

A new generator that inherits from the generator that generated it using the [ Bindable.generate(create) ](#bindable-generate) method.

<a name="class-creation"></a>
## Class: Creation

A new object that inherits from the generator that created it using the [ Bindable.create() ](#bindable-create) method.

<a name="creation-bind"></a>
## Creation.bind(property, listener[, observer])

* *property* `String` Name of property.
* *listener* `Function` Property change handler function.
* *observer* `Object` Object reference for binding.
* *return*: `Object` *This* object.

Adds a 'listener' on 'property' change to *this* Bindable instance.

<a name="creation-bind-once"></a>
## Creation.bindOnce(property, listener[, observer])

* *property* `String` Name of property.
* *listener* `Function` Property change handler function.
* *observer* `Object` Object reference for binding.

* *return*: `Object` *This* object.

Adds a 'listener' on 'property' change to *this* Bindable instance which is removed after one 'property' change.

<a name="creation-unbind"></a>
## Creation.unbind([property][, listener][, observer])

* *property* `String` Name of property.
* *listener* `Function` Property change handler function.
* *observer* `Object` Object reference for binding.
* *return*: `Object` *This* object.

Removes a 'listener' on 'property', or all listeners on 'property', or all listeners from *this* Bindable instance.

<a name="creation-change"></a>
## Creation.change(property, oldValue, newValue, changer)

* *property* `String` Name of property.
* *oldValue* `Any` Old value of property.
* *newValue* `Any` New value of property.
* *return*: `Object` *This* object.

Emits an 'property' with 'args' on *this* Bindable instance.
