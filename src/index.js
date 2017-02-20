'use strict';

var storage = {};

module.exports = {
    load: function (_vm, flag, _resolve) {
        var resolve = _resolve;
        var vm = _vm;
        if (!storage[flag]) {
            this.register(flag);
        }
        storage[flag].loaded = true;

        return function () {
            var arg = arguments;

            // setTimeout(function () {
            storage[flag].loaded = true;
            resolve.apply(vm, arg);

            if (storage[flag].caught && storage[flag].remedy) {
                if (!storage[flag].remedy()) {
                    if (typeof storage[flag].prepared === 'function') {
                        storage[flag].prepared();
                    }
                }
            }
            // }, 2000);
        };
    },

    register: function (flag) {
        storage[flag] = {
            loaded: false,
            caught: false,
            remedy: null
        };
    },

    find: function (flag, handles) {
        if (!storage[flag]) {
            this.register(flag);
        }

        storage[flag].remedy = handles.remedy;
        storage[flag].prepared = handles.prepared;

        if (storage[flag].loaded) {
            if (typeof handles.prepared === 'function') {
                handles.prepared();
            }
        } else {
            storage[flag].caught = true;
            if (typeof handles.caught === 'function') {
                handles.caught();
            }
        }
    }
};
