import { Store } from 'vuex';
import type { ModuleBuilder, Module } from './types';
export declare function buildStore<R>(root: ModuleBuilder<R, unknown>, state: R, modules?: Module<any, R>[]): Store<R>;
//# sourceMappingURL=buildStore.d.ts.map