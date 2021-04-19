import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { Store } from 'vuex';
import type { ModuleBuilder } from './types';

type Options<RootState> = StoreOptions<RootState> & {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  moduleBuilders?: { [m in keyof RootState]?: ModuleBuilder<any, RootState> };
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
 * @param options - A extended {@see StoreOptions} that includes moduleBuilders Record.
 */
export function createStore<RootState = never>(
  options: Options<RootState>,
): Store<RootState> {
  Vue.use(Vuex);

  const modules: [string, ModuleBuilder<RootState>][] = Object.entries(
    options.moduleBuilders || {},
  );

  return new Store<RootState>({
    ...options,
    modules: {
      ...(options?.modules || {}),
      ...modules.reduce((acc, [name, builder]) => {
        const _m = builder.getModule(name);
        acc[_m.name] = _m;
        return acc;
      }, {}),
    },
  });
}
