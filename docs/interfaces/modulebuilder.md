[Vuex Tools](../README.md) / ModuleBuilder

# Interface: ModuleBuilder<State, RootState\>

Create an define Module's action, gatters and mutation dispatch and commit helpers

```typescript
const module = createModule<{ items: Item[] }>('itemsModule');

```

## Type parameters

Name | Default |
:------ | :------ |
`State` | - |
`RootState` | *unknown* |

## Table of contents

### Methods

- [action](modulebuilder.md#action)
- [getModule](modulebuilder.md#getmodule)
- [getter](modulebuilder.md#getter)
- [mutation](modulebuilder.md#mutation)

## Methods

### action

▸ **action**<Payload\>(`name`: *string*, `actionFn`: *ActionHandler*<State, RootState, Payload\>): [*ActionType*](../README.md#actiontype)<Payload\>

define an Action and return an typed create dispatch function

```ts
const fetchItems = module.action<{ page: number }>('setItems', ({ commit }, { page }) =>
   API.fetchItems(page)
       .then(items =>
           commit(setItems(items))
       )
);

setItems([1, 2])
// { type: 'itemsModule/setItems', payload: [1, 2] }

store.commit(setItems([1, 2]));
```

#### Type parameters:

Name |
:------ |
`Payload` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | action type   |
`actionFn` | *ActionHandler*<State, RootState, Payload\> | - |

**Returns:** [*ActionType*](../README.md#actiontype)<Payload\>

Defined in: [src/types.ts:92](https://github.com/matheusAle/vuex-tools/blob/475a139/src/types.ts#L92)

___

### getModule

▸ **getModule**(`state`: State): *Module*<State, RootState\>

Receive the initial module state and return an instance of Vuex Module object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`state` | State | initial module state    |

**Returns:** *Module*<State, RootState\>

Defined in: [src/types.ts:124](https://github.com/matheusAle/vuex-tools/blob/475a139/src/types.ts#L124)

___

### getter

▸ **getter**<Payload\>(`name`: *string*, `getterFn`: *Getter*<State, RootState\>): *GetterHandler*<Payload\>

Define an getter function and create an acessor function

```ts
const getSortedItems = module.getter<Item[]>('sortedItems', (state) => [...state.items].sort(a, b) => a - b);

// vue component
{
   computed: {
       getSortedItems() {
           getSortedItems(this.$store.getters)
       }
   }
}

```

#### Type parameters:

Name |
:------ |
`Payload` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | gatter name   |
`getterFn` | *Getter*<State, RootState\> | - |

**Returns:** *GetterHandler*<Payload\>

Defined in: [src/types.ts:116](https://github.com/matheusAle/vuex-tools/blob/475a139/src/types.ts#L116)

___

### mutation

▸ **mutation**<Payload\>(`name`: *string*, `mutationFn`: [*Mutation*](../README.md#mutation)<State, Payload\>): [*ActionType*](../README.md#actiontype)<Payload\>

define an Mutation and return an typed create commit function;

```ts
const setItems = module.mutation<Item[]>('setItems', (store, items) => store.items = items);

setItems([1, 2])
// { type: 'itemsModule/setItems', payload: [1, 2] }

store.commit(setItems([1, 2]))
```

**`typeparam`** Mutation payload type

#### Type parameters:

Name |
:------ |
`Payload` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | mutation type   |
`mutationFn` | [*Mutation*](../README.md#mutation)<State, Payload\> | - |

**Returns:** [*ActionType*](../README.md#actiontype)<Payload\>

Defined in: [src/types.ts:67](https://github.com/matheusAle/vuex-tools/blob/475a139/src/types.ts#L67)
