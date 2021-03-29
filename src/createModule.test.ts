import type { Store } from 'vuex';
import { buildStore } from './buildStore';
import { createModule } from './createModule';
import { createStore } from './createStore';
import type {
  ActionType,
  ModuleBuilder,
  Mutation,
  GetterHandler,
} from './types';

type State = { userName: string };
type RootState = {
  user: State;
};

describe('createModule', () => {
  let module: ModuleBuilder<State, RootState>;
  let store: Store<RootState>;

  let fetchUser: ActionType<string>;
  let fetchUserSpy: jest.Mock;

  let upercaseUserName: GetterHandler<string>;
  let upercaseUserNameSpy: jest.Mock;

  let changeUserName: ActionType<string>;
  let changeUserNameSpy: jest.Mock;

  beforeEach(() => {
    module = createModule<State, RootState>('user');

    fetchUserSpy = jest.fn();
    fetchUser = module.action<string>('setUser', fetchUserSpy);

    changeUserNameSpy = jest.fn(<Mutation<State, string>>((state, newName) => {
      state.userName = newName;
    }));
    changeUserName = module.mutation<string>(
      'changeUserName',
      changeUserNameSpy,
    );

    upercaseUserNameSpy = jest.fn((state: State) =>
      state.userName.toUpperCase(),
    );

    upercaseUserName = module.getter<string>(
      'upercaseUserName',
      upercaseUserNameSpy,
    );

    const storeB = createStore<RootState>();
    store = buildStore<RootState>(storeB, {} as RootState, [
      module.getModule({ userName: 'bar' }),
    ]);
  });

  test('store initial state', () => {
    expect(store.state).toEqual({ user: { userName: 'bar' } });
  });
  describe('action creator', () => {
    test('action', () => {
      expect(fetchUser('abc')).toEqual(<ReturnType<typeof fetchUser>>{
        type: 'user/setUser',
        payload: 'abc',
      });
    });
    test('mutation', () => {
      expect(changeUserName('buzz')).toEqual(<
        ReturnType<typeof changeUserName>
      >{
        type: 'user/changeUserName',
        payload: 'buzz',
      });
    });
  });
  test('dispatch action', () => {
    const action = fetchUser('123');
    store.dispatch(action);
    expect(fetchUserSpy).toBeCalledTimes(1);
    expect(fetchUserSpy.mock.calls[0][0].state).toEqual({
      userName: 'bar',
    });
    expect(fetchUserSpy.mock.calls[0][1]).toEqual(action.payload);
  });
  test('commit call', () => {
    const payload = changeUserName('fitz');
    store.commit(payload);
    expect(changeUserNameSpy).toBeCalledTimes(1);
    expect(changeUserNameSpy.mock.calls[0][1]).toEqual(payload.payload);
    expect(store.state).toEqual({ user: { userName: 'fitz' } });
  });
  test('getter', () => {
    store.commit(changeUserName('buzz fizz'));
    expect(upercaseUserName(store.getters)).toEqual('BUZZ FIZZ');
    expect(upercaseUserNameSpy).toBeCalledTimes(1);
    expect(upercaseUserNameSpy.mock.calls[0][0]).toEqual({
      userName: 'buzz fizz',
    });
  });
});
