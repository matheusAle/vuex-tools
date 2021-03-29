/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import type { ModuleBuilder, Module } from './types';

export function buildStore<R>(
  root: ModuleBuilder<R, unknown>,
  state: R,
  modules: Module<any, R>[] = [],
): Store<R> {
  Vue.use(Vuex);
  const store = root.getModule(state);

  return new Store<R>({
    state: store.state,
    getters: store.getters,
    actions: store.actions,
    mutations: store.mutations,
    modules: modules.reduce((acc, m) => {
      acc[m.name] = m;
      return acc;
    }, {}),
  });
}
