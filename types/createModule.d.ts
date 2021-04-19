import type { ModuleBuilder } from './types';
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
 *
 * @param initialState - initial module state
 * @typeParam State - Type of module state, usually an key in RootState.
 * @typeParam RootState - Type of root store state
 */
export declare function createModule<State, RootState = any>(initialState: State): ModuleBuilder<State, RootState>;
//# sourceMappingURL=createModule.d.ts.map