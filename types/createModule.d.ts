import type { ModuleBuilder } from './types';
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
export declare function createModule<State, RootState = any>(initialState: State): ModuleBuilder<State, RootState>;
//# sourceMappingURL=createModule.d.ts.map