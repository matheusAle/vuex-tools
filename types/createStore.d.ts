import { StoreOptions } from 'vuex';
import { Store } from 'vuex';
import type { ModuleBuilder } from './types';
declare type Options<RootState> = StoreOptions<RootState> & {
    moduleBuilders?: {
        [m in keyof RootState]?: ModuleBuilder<any, RootState>;
    };
};
/**
 * create an instance of {@see Store} and build {@see ModuleBuilder} objects.
 *
 * ```ts
 * const module1 = createModule({ prop1: 1 });
 * const module2 = createModule({ prop2: 2 });
 *
 * const store = createStore({
 *   moduleBuilders: {
 *     module1,
 *     module2,
 *   }
 * })
 * ```
 *
 * @param options {@see Options} an extended {@see StoreOptions} that includes moduleBuilders Record.
 */
export declare function createStore<RootState = never>(options: Options<RootState>): Store<RootState>;
export {};
//# sourceMappingURL=createStore.d.ts.map