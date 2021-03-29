/*!
 * vuex-tools v0.0.1
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

/* eslint-disable @typescript-eslint/no-explicit-any */
function buildStore(root, state, modules) {
    if (modules === void 0) { modules = []; }
    Vue__default['default'].use(Vuex__default['default']);
    var store = root.getModule(state);
    return new Vuex.Store({
        state: store.state,
        getters: store.getters,
        actions: store.actions,
        mutations: store.mutations,
        modules: modules.reduce(function (acc, m) {
            acc[m.name] = m;
            return acc;
        }, {}),
    });
}

var actionCreator = function (moduleName, type) { return function (payload) { return ({ type: moduleName ? moduleName + "/" + type : type, payload: payload }); }; };
function createModule(moduleName) {
    if (moduleName === void 0) { moduleName = ''; }
    var mutations = [];
    var actions = [];
    var getters = [];
    return {
        mutation: function (type, fn) {
            fn.toString = function () { return "" + type; };
            mutations.push(fn);
            return actionCreator(moduleName, type);
        },
        action: function (type, fn) {
            fn.toString = function () { return "" + type; };
            actions.push(fn);
            return actionCreator(moduleName, type);
        },
        getter: function (type, fn) {
            fn.toString = function () { return "" + type; };
            getters.push(fn);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return function (gatter) {
                return gatter[moduleName + "/" + type] || gatter[type];
            };
        },
        getModule: function (state) {
            return {
                name: moduleName,
                namespaced: true,
                state: state,
                actions: actions.reduce(function (acc, action) {
                    acc[action.toString()] = function (store, _a) {
                        var _b = _a.payload, payload = _b === void 0 ? null : _b;
                        action(store, payload);
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

function createStore() {
    return createModule('');
}

exports.buildStore = buildStore;
exports.createModule = createModule;
exports.createStore = createStore;
//# sourceMappingURL=index.js.map
