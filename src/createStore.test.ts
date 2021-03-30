import { Module, Store } from 'vuex';
import { createModule } from './createModule';
import { createStore } from './createStore';

describe('createStore', () => {
  test('create instance', () => {
    const store = createStore({});
    expect(store).toBeInstanceOf(Store);
  });
  test('merge options modules', () => {
    type RootState = { module1: { prop1: number }; module2: { prop2: number } };

    const module = createModule<RootState['module1'], RootState>({
      prop1: 1,
    });

    const store = createStore<RootState>({
      modules: {
        module2: <Module<RootState['module2'], RootState>>{
          namespaced: true,
          state: () => ({ prop2: 2 }),
        },
      },
      moduleBuilders: {
        module1: module,
      },
    });
    expect(store.state.module1.prop1).toBeDefined();
    expect(store.state.module2.prop2).toBeDefined();
  });
});
