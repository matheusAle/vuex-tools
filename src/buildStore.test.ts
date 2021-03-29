import { buildStore } from './buildStore';
import { createStore } from './createStore';

type State = {
  user?: { name: string };
};

describe('buildStore', () => {
  test('create empty store', () => {
    const builder = createStore<State>();
    const store = buildStore<State>(builder, {});
    expect(store.state).toEqual({});
  });
});
