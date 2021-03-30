import type * as Vuex from 'vuex';

/**
 * Typed Vuex Mutation function
 *
 * @typeParam State Module state type
 * @typeParam P Mutation payload type
 */
export type Mutation<State, P> = (state: State, P: P) => void;

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetterHandler<R> = (getter: any) => R;

/**
 * @ignore
 * Typed Vuex action function
 */
export type ActionHandler<State, RootStore, Payload> = (
  store: Vuex.ActionContext<State, RootStore>,
  payload: Payload,
) => void;

/**
 * return if action/mutation create
 * @typeParam P Action payload type
 */
export type ActionType<P> = (payload: P) => { type: string; payload: P };

/**
 * @ignore
 * Extention of Vuex module
 * @typeParam S Module state type
 * @typeParam R RootStore state type
 */
export interface Module<State, R> extends Vuex.Module<State, R> {
  name: string;
}

/**
 * Create an define Module's action, gatters and mutation dispatch and commit helpers
 *
 * ```ts
 * const module = createModule<{ items: Item[] }>('itemsModule');
 * ```
 */
export interface ModuleBuilder<State, RootState = unknown> {
  /**
   * define a Mutation and return a typed create commit function;
   *
   * ```ts
   * const setItems = module.mutation<Item[]>('setItems', (store, items) => store.items = items);
   *
   * setItems([1, 2])
   * // { type: 'itemsModule/setItems', payload: [1, 2] }
   *
   * store.commit(setItems([1, 2]))
   * ```
   *
   * @param name mutation type
   * @param mutationFn mutation handler function
   * @typeParam Payload Mutation argument type
   */
  mutation<Payload>(
    name: string,
    mutationFn: Mutation<State, Payload>,
  ): ActionType<Payload>;

  /**
   * define an Action and return a typed create dispatch function
   *
   * ```ts
   * const fetchItems = module.action<{ page: number }>('setItems', ({ commit }, { page }) =>
   *    API.fetchItems(page)
   *        .then(items =>
   *            commit(setItems(items))
   *        )
   * );
   *
   * store.commit(setItems([1, 2]));
   * ```
   * @param name action type
   * @param actionFn action handler function
   * @typeParam Payload Action argument type
   *
   */
  action<Payload>(
    name: string,
    actionFn: ActionHandler<State, RootState, Payload>,
  ): ActionType<Payload>;

  /**
   * Define an getter function and create an accessor function to getter value.
   *
   * ```ts
   * const getSortedItems = module.getter<Item[]>('sortedItems', (state) =>
   *   [...state.items].sort(a, b) => a - b
   * );
   *
   * // vue component
   * {
   *    computed: {
   *        getSortedItems() {
   *            getSortedItems(this.$store.getters)
   *        }
   *    }
   * }
   *
   * ```
   * @param name gatter name
   * @param getterFn Vuex getter function
   * @typeParam Return Getter return type
   */
  getter<Return>(
    name: string,
    getterFn: Vuex.Getter<State, RootState>,
  ): GetterHandler<Return>;
  /**
   * Create the VuexModule object.
   */
  getModule(name?: string): Module<State, RootState>;
}
