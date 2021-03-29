import type { Getter } from 'vuex';
import type { ModuleBuilder, Mutation, ActionHandler } from './types';

const actionCreator = <P>(moduleName: string, type: string) => (
  payload: P,
) => ({ type: moduleName ? `${moduleName}/${type}` : type, payload });

export function createModule<S, R = unknown>(
  moduleName = '',
): ModuleBuilder<S, R> {
  const mutations: Mutation<S, unknown>[] = [];
  const actions: ActionHandler<S, R, unknown>[] = [];
  const getters: Getter<S, R>[] = [];
  return {
    mutation<P>(type: string, fn: Mutation<S, P>) {
      fn.toString = () => `${type}`;
      (mutations as Mutation<S, P>[]).push(fn);
      return actionCreator<P>(moduleName, type);
    },
    action<P>(type: string, fn: ActionHandler<S, R, P>) {
      fn.toString = () => `${type}`;
      (actions as ActionHandler<S, R, P>[]).push(fn);
      return actionCreator<P>(moduleName, type);
    },
    getter<P>(type: string, fn: Getter<S, R>) {
      fn.toString = () => `${type}`;
      getters.push(fn);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (gatter: any): P =>
        gatter[`${moduleName}/${type}`] || gatter[type];
    },
    getModule(state: S) {
      return {
        name: moduleName,
        namespaced: true,
        state,
        actions: actions.reduce((acc, action) => {
          acc[action.toString()] = (store, { payload = null }) => {
            action(store, payload);
          };
          return acc;
        }, {}),
        mutations: mutations.reduce((acc, mutation) => {
          acc[mutation.toString()] = (store, { payload }) =>
            mutation(store, payload);
          return acc;
        }, {}),
        getters: getters.reduce((acc, getter) => {
          acc[getter.toString()] = getter;
          return acc;
        }, {}),
      };
    },
  };
}
