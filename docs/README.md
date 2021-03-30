Vuex Tools

# Vuex Tools

## Table of contents

### Interfaces

- [ModuleBuilder](interfaces/modulebuilder.md)

### Type aliases

- [ActionType](README.md#actiontype)
- [Mutation](README.md#mutation)

### Functions

- [createModule](README.md#createmodule)
- [createStore](README.md#createstore)

## Type aliases

### ActionType

Ƭ **ActionType**<P\>: (`payload`: P) => { `payload`: P ; `type`: *string*  }

return if action/mutation create

#### Type parameters:

Name | Description |
:------ | :------ |
`P` | Action payload type    |

#### Type declaration:

▸ (`payload`: P): *object*

#### Parameters:

Name | Type |
:------ | :------ |
`payload` | P |

**Returns:** *object*

Name | Type |
:------ | :------ |
`payload` | P |
`type` | *string* |

Defined in: [src/types.ts:30](https://github.com/matheusAle/vuex-tools/blob/2a543b1/src/types.ts#L30)

___

### Mutation

Ƭ **Mutation**<State, P\>: (`state`: State, `P`: P) => *void*

Typed Vuex Mutation function

#### Type parameters:

Name | Description |
:------ | :------ |
`State` | Module state type   |
`P` | Mutation payload type    |

#### Type declaration:

▸ (`state`: State, `P`: P): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`state` | State |
`P` | P |

**Returns:** *void*

Defined in: [src/types.ts:9](https://github.com/matheusAle/vuex-tools/blob/2a543b1/src/types.ts#L9)

## Functions

### createModule

▸ **createModule**<State, RootState\>(`initialState`: State): [*ModuleBuilder*](interfaces/modulebuilder.md)<State, RootState\>

Create and {@see ModuleBuilder} instance.

```ts
import { createModule } from 'vuex-tools';

const module = createModule('counter', { count: 1 });
```

#### Type parameters:

Name | Default |
:------ | :------ |
`State` | - |
`RootState` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`initialState` | State |

**Returns:** [*ModuleBuilder*](interfaces/modulebuilder.md)<State, RootState\>

Defined in: [src/createModule.ts:33](https://github.com/matheusAle/vuex-tools/blob/2a543b1/src/createModule.ts#L33)

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
`options` | *Options*<RootState\> | {@see Options} an extended {@see StoreOptions} that includes moduleBuilders Record.    |

**Returns:** *Store*<RootState\>

Defined in: [src/createStore.ts:28](https://github.com/matheusAle/vuex-tools/blob/2a543b1/src/createStore.ts#L28)
