import type * as Vuex from 'vuex';

/**
 * Typed Vuex Mutation function
 * @param S Module state type
 * @param P Mutation payload type
 */
export type Mutation<S, P> = (state: S, P: P) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetterHandler<R> = (gatter: any) => R;

/**
 * Typed Vuex action function
 */
export type ActionHandler<S, R, P> = (store: Vuex.Store<R>, payload: P) => void;

/**
 * return if action/mutation create
 * @param P Action payload type
 */
export type ActionType<P> = (payload: P) => { type: string; payload: P };

/**
 * Extention of Vuex module
 * @param S Module state type
 * @param R RootStore state type
 */
export interface Module<S, R> extends Vuex.Module<S, R> {
  name: string;
}

/**
 * Create an define Module's action, gatters and mutation dispatch and commit helpers
 * ```typescript
 * const module = createModule<{ items: Item[] }>('itemsModule');
 *
 * ```
 */
export interface ModuleBuilder<S, R = unknown> {
  /**
   * define an Mutation and return an typed create commit function;
   * @param name mutation type
   * @param func mutation handler function
   *
   * ```typescript
   * const setItems = module.mutation<Item[]>('setItems', (store, items) => store.items = items);
   *
   * setItems([1, 2])
   * // { type: 'itemsModule/setItems', payload: [1, 2] }
   *
   * store.commit(setItems([1, 2]))
   *
   * ```
   */
  mutation<P>(name: string, func: Mutation<S, P>): ActionType<P>;

  /**
   * define an Action and return an typed create dispatch function;
   * @param name action type
   * @param func action handler function
   *
   * ```typescript
   * const fetchItems = module.action<{ page: number }>('setItems', ({ commit }, { page }) =>
   *    API.fetchItems(page)
   *        .then(items =>
   *            commit(setItems(items))
   *        )
   * );
   *
   * setItems([1, 2])
   * // { type: 'itemsModule/setItems', payload: [1, 2] }
   *
   * store.commit(setItems([1, 2]))
   *
   * ```
   */
  action<P>(name: string, func: ActionHandler<S, R, P>): ActionType<P>;

  /**
   * Define an getter function and create an acessor function
   * ```
   * const getSortedItems = module.getter<Item[]>('sortedItems', (state) => [...state.items].sort(a, b) => a - b);
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
   * @param func Vuex gatter function
   */
  getter<P>(name: string, func: Vuex.Getter<S, R>): GetterHandler<P>;
  /**
   * Receive the initial module state and return an instance of Vuex Module object
   * @param state initial module state
   */
  getModule(state: S): Module<S, R>;
}
