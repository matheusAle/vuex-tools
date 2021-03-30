/*!
 * vuex-tools v1.0.0-beta
 * (c) [authorFullName]
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Vue = require('vue');
var Vuex = require('vuex');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
var Vuex__default = /*#__PURE__*/_interopDefaultLegacy(Vuex);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var actionCreator = function (moduleName, type) { return function (payload) { return ({
    type: moduleName() ? moduleName() + "/" + type : type,
    payload: payload,
}); }; };
function overrideActionContext(store) {
    return __assign(__assign({}, store), { commit: function (type) { return store.commit(type, { root: true }); } });
}
/**
 * Create and {@see ModuleBuilder} instance.
 *
 * ```ts
 * import { createModule } from 'vuex-tools';
 *
 * const module = createModule('counter', { count: 1 });
 * ```
 *
 * @param initialState
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function createModule(initialState) {
    var mutations = [];
    var actions = [];
    var getters = [];
    var moduleName;
    var getModuleName = function () { return moduleName; };
    return {
        mutation: function (type, fn) {
            fn.toString = function () { return "" + type; };
            mutations.push(fn);
            return actionCreator(getModuleName, type);
        },
        action: function (type, fn) {
            fn.toString = function () { return "" + type; };
            actions.push(fn);
            return actionCreator(getModuleName, type);
        },
        getter: function (type, fn) {
            fn.toString = function () { return "" + type; };
            getters.push(fn);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return function (getter) {
                return getter[moduleName + "/" + type] || getter[type];
            };
        },
        getModule: function (name) {
            if (name === void 0) { name = ''; }
            moduleName = name;
            return {
                name: moduleName,
                namespaced: true,
                state: initialState,
                actions: actions.reduce(function (acc, action) {
                    acc[action.toString()] = function (store, _a) {
                        var _b = _a.payload, payload = _b === void 0 ? null : _b;
                        action(overrideActionContext(store), payload);
                    };
                    return acc;
                }, {}),
                mutations: mutations.reduce(function (acc, mutation) {
                    acc[mutation.toString()] = function (store, _a) {
                        var payload = _a.payload;
                        return mutation(store, payload);
                    };
                    return acc;
                }, {}),
                getters: getters.reduce(function (acc, getter) {
                    acc[getter.toString()] = getter;
                    return acc;
                }, {}),
            };
        },
    };
}

/**
 * create an instance of {@see Store} and build {@see ModuleBuilder} objects.
 *
 * ```ts
 * const module1 = createModule({ prop1: 1 });
 * const module2 = createModule({ prop2: 2 });
 *
 * const store = createStore({
 *   moduleBuilders: {
 *     module1,
 *     module2,
 *   }
 * })
 * ```
 *
 * @param options {@see Options} an extended {@see StoreOptions} that includes moduleBuilders Record.
 */
function createStore(options) {
    Vue__default['default'].use(Vuex__default['default']);
    var modules = Object.entries(options.moduleBuilders || {});
    return new Vuex.Store(__assign(__assign({}, options), { modules: __assign(__assign({}, ((options === null || options === void 0 ? void 0 : options.modules) || {})), modules.reduce(function (acc, _a) {
            var name = _a[0], builder = _a[1];
            var _m = builder.getModule(name);
            acc[_m.name] = _m;
            return acc;
        }, {})) }));
}

exports.createModule = createModule;
exports.createStore = createStore;
//# sourceMappingURL=index.cjs.map
