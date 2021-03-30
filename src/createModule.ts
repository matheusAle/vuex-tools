import type { ActionContext, Getter } from 'vuex';
import type { ModuleBuilder, Mutation, ActionHandler } from './types';

const actionCreator = <P>(
  moduleName: () => string | undefined,
  type: string,
) => (payload: P) => ({
  type: moduleName() ? `${moduleName()}/${type}` : type,
  payload,
});

function overrideActionContext<State, RootState>(
  store: ActionContext<State, RootState>,
): ActionContext<State, RootState> {
  return {
    ...store,
    commit: (type) => store.commit(type, { root: true }),
  };
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
export function createModule<State, RootState = any>(
  initialState: State,
): ModuleBuilder<State, RootState> {
  const mutations: Mutation<State, unknown>[] = [];
  const actions: ActionHandler<State, RootState, unknown>[] = [];
  const getters: Getter<State, RootState>[] = [];

  let moduleName: string;
  const getModuleName = () => moduleName;

  return <ModuleBuilder<State, RootState>>{
    mutation<Payload>(type: string, fn: Mutation<State, Payload>) {
      fn.toString = () => `${type}`;
      (mutations as Mutation<State, Payload>[]).push(fn);
      return actionCreator<Payload>(getModuleName, type);
    },
    action<Payload>(
      type: string,
      fn: ActionHandler<State, RootState, Payload>,
    ) {
      fn.toString = () => `${type}`;
      (actions as ActionHandler<State, RootState, Payload>[]).push(fn);
      return actionCreator<Payload>(getModuleName, type);
    },
    getter<Payload>(type: string, fn: Getter<State, RootState>) {
      fn.toString = () => `${type}`;
      getters.push(fn);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (getter: any): Payload =>
        getter[`${moduleName}/${type}`] || getter[type];
    },
    getModule(name = '') {
      moduleName = name;
      return {
        name: moduleName,
        namespaced: true,
        state: initialState,
        actions: actions.reduce((acc, action) => {
          acc[action.toString()] = (store, { payload = null }) => {
            action(overrideActionContext(store), payload);
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
