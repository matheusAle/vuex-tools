import type { ActionContext, Getter } from 'vuex';
import type {
  ModuleBuilder,
  Mutation,
  ActionHandler,
  ActionType,
} from './types';
import Vue from 'vue';
const actionCreator = <P>(
  moduleName: () => string | undefined,
  type: string,
) => (payload: P) => ({
  type: moduleName() ? `${moduleName()}/${type}` : type,
  payload,
});

function overrideActionContext<State, RootState, Payload>(
  action: ActionHandler<State, RootState, Payload>,
) {
  return (
    store: ActionContext<State, RootState>,
    { payload }: ReturnType<ActionType<Payload>>,
  ) =>
    action(
      {
        ...store,
        commit: (type) => store.commit(type, { root: true }),
        dispatch: (type) => store.dispatch(type, { root: true }),
      },
      payload,
    );
}

/**
 * Create a {@see ModuleBuilder} instance.
 *
 * ```ts
 * interface RootState {
 *   module_one: {
 *     list: string[]
 *   }
 * }
 * const module = createModule<RootState['module_one'], RootState>({ list: [] });
 *```
 *
 * @param initialState - initial module state
 * @typeParam State - Type of module state, usually an key in RootState.
 * @typeParam RootState - Type of root store state
 */
export function createModule<State, RootState = any>(
  initialState: State,
): ModuleBuilder<State, RootState> {
  const mutations: Mutation<State, unknown>[] = [];
  const actions: ActionHandler<State, RootState, unknown>[] = [];
  const getters: Getter<State, RootState>[] = [];

  let moduleName: string;
  const getModuleName = () => moduleName;

  return <ModuleBuilder<State, RootState>>{
    mutation<Payload>(type: string, fn?: Mutation<State, Payload>) {
      if (!fn) {
        return this.mutation(`${type}`, (state, value) => {
          Vue.set(state as any, `${type}`, value);
        });
      }
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
          acc[action.toString()] = overrideActionContext(action);
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
