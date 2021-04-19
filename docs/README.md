Vuex Tools

# Vuex Tools

## Table of contents

### Interfaces

- [ModuleBuilder](interfaces/modulebuilder.md)

### Functions

- [createModule](README.md#createmodule)
- [createStore](README.md#createstore)

## Functions

### createModule

▸ **createModule**<State, RootState\>(`initialState`: State): [*ModuleBuilder*](interfaces/modulebuilder.md)<State, RootState\>

Create a {@see ModuleBuilder} instance.

```ts
interface RootState {
  module_one: {
    list: string[]
  }
}
const module = createModule<RootState['module_one'], RootState>({ list: [] });
```

#### Type parameters:

Name | Default | Description |
:------ | :------ | :------ |
`State` | - | Type of module state, usually an key in RootState.   |
`RootState` | *any* | Type of root store state    |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`initialState` | State | initial module state   |

**Returns:** [*ModuleBuilder*](interfaces/modulebuilder.md)<State, RootState\>

Defined in: [src/createModule.ts:50](https://github.com/matheusAle/vuex-tools/blob/5dd09e7/src/createModule.ts#L50)

___

### createStore

▸ **createStore**<RootState\>(`options`: *Options*<RootState\>): *Store*<RootState\>

create an instance of {@see Store} and build {@see ModuleBuilder} objects.

```ts
const module1 = createModule({ prop1: 1 });
const module2 = createModule({ prop2: 2 });

const store = createStore({
  moduleBuilders: {
    module1,
    module2,
  }
})
```

#### Type parameters:

Name | Default |
:------ | :------ |
`RootState` | *never* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | *Options*<RootState\> | A extended {@see StoreOptions} that includes moduleBuilders Record.    |

**Returns:** *Store*<RootState\>

Defined in: [src/createStore.ts:28](https://github.com/matheusAle/vuex-tools/blob/5dd09e7/src/createStore.ts#L28)
