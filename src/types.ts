import type * as Vuex from 'vuex';

/**
 * @ignore
 */
export type Mutation<State, P> = (state: State, P: P) => void;

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetterHandler<R> = (getter: any) => R;

/**
 * @ignore
 */
export type ActionHandler<State, RootStore, Payload> = (
  store: Vuex.ActionContext<State, RootStore>,
  payload: Payload,
) => void;

/**
 * @ignore
 */
export type ActionType<P> = (payload: P) => { type: string; payload: P };

/**
 * @ignore
 */
export interface Module<State, R> extends Vuex.Module<State, R> {
  name: string;
}

/**
 * Return of {@see createModule}.
 * Interface that helps to create Vuex Module's actions, mutations and getters.
 *
 * ```ts
 * interface RootState {
 *   module_one: {
 *     list: string[]
 *   }
 * }
 * const module = createModule<RootState['module_one'], RootState>({ list: [] });
 * ```
 *
 * @typeParam State - Type of module state, usually an key in RootState.
 * @typeParam RootState - Type of root store state
 */
export interface ModuleBuilder<State, RootState = unknown> {
  /**
   * Auto Define a mutation for a property and return the action create function.
   * Internally `Vue#set` is called to set the value into store.
   *
   * ```ts
   * const setItems = module.mutation('setItems');
   * store.commit(setItems([1, 2]))
   * ```
   *
   * @param name - mutation type
   * @typeParam Payload - Mutation argument type
   */
  mutation<Prop extends keyof State, Payload extends State[Prop]>(
    name: Prop,
  ): ActionType<Payload>;

  /**
   * Define Mutation with an custom implementation, and return a typed create commit function;
   *
   * ```ts
   * const setItems = module.mutation<Item[]>('setItems', (store, items) => store.items = items);
   * store.commit(setItems([1, 2]))
   * ```
   *
   * @param name - mutation type
   * @param mutationFn - mutation handler function
   * @typeParam Payload - Mutation argument type
   */
  mutation<Payload>(
    name: string,
    mutationFn?: Mutation<State, Payload>,
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
   *
   * @param name - action type
   * @param actionFn - action handler function
   * @typeParam Payload - Action argument type
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
   * @param name - getter name
   * @param getterFn - Vuex getter function
   * @typeParam Return - Getter return type
   */
  getter<Return>(
    name: string,
    getterFn: Vuex.Getter<State, RootState>,
  ): GetterHandler<Return>;

  /**
   * Create the VuexModule object.
   *
   * @param name - Module name/prefix
   */
  getModule(name?: string): Module<State, RootState>;
}
