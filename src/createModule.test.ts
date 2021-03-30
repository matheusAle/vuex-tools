import type { Store } from 'vuex';
import { createModule } from './createModule';
import { createStore } from './createStore';
import type {
  ActionType,
  ModuleBuilder,
  Mutation,
  GetterHandler,
} from './types';

type State = { userName: string };
interface RootState {
  user: State;
}

describe('createModule', () => {
  let module: ModuleBuilder<State, RootState>;
  let store: Store<RootState>;

  let fetchUser: ActionType<string>;
  let fetchUserSpy: jest.Mock;

  let uppercaseUserName: GetterHandler<string>;
  let uppercaseUserNameSpy: jest.Mock;

  let changeUserName: ActionType<string>;
  let changeUserNameSpy: jest.Mock;

  beforeEach(() => {
    module = createModule<State, RootState>({ userName: 'bar' });

    fetchUserSpy = jest.fn();
    fetchUser = module.action<string>('setUser', fetchUserSpy);

    changeUserNameSpy = jest.fn(<Mutation<State, string>>((state, newName) => {
      state.userName = newName;
    }));
    changeUserName = module.mutation<string>(
      'changeUserName',
      changeUserNameSpy,
    );

    uppercaseUserNameSpy = jest.fn((state: State) =>
      state.userName.toUpperCase(),
    );

    uppercaseUserName = module.getter<string>(
      'uppercaseUserName',
      uppercaseUserNameSpy,
    );

    store = createStore<RootState>({
      moduleBuilders: {
        user: module,
      },
    });
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
    expect(uppercaseUserName(store.getters)).toEqual('BUZZ FIZZ');
    expect(uppercaseUserNameSpy).toBeCalledTimes(1);
    expect(uppercaseUserNameSpy.mock.calls[0][0]).toEqual({
      userName: 'buzz fizz',
    });
  });
});
