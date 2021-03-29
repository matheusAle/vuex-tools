[Vuex Tools](../README.md) / ModuleBuilder

# Interface: ModuleBuilder<S, R\>

Create an define Module's action, gatters and mutation dispatch and commit helpers

```typescript
const module = createModule<{ items: Item[] }>('itemsModule');

```

## Type parameters

Name | Default |
:------ | :------ |
`S` | - |
`R` | *unknown* |

## Table of contents

### Methods

- [action](modulebuilder.md#action)
- [getModule](modulebuilder.md#getmodule)
- [getter](modulebuilder.md#getter)
- [mutation](modulebuilder.md#mutation)

## Methods

### action

▸ **action**<P\>(`name`: *string*, `func`: *ActionHandler*<S, R, P\>): [*ActionType*](../README.md#actiontype)<P\>

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
`P` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | action type   |
`func` | *ActionHandler*<S, R, P\> | action handler function     |

**Returns:** [*ActionType*](../README.md#actiontype)<P\>

Defined in: [src/types.ts:86](https://github.com/matheusAle/vuex-tools/blob/d89fee5/src/types.ts#L86)

___

### getModule

▸ **getModule**(`state`: S): *Module*<S, R\>

Receive the initial module state and return an instance of Vuex Module object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`state` | S | initial module state    |

**Returns:** *Module*<S, R\>

Defined in: [src/types.ts:112](https://github.com/matheusAle/vuex-tools/blob/d89fee5/src/types.ts#L112)

___

### getter

▸ **getter**<P\>(`name`: *string*, `func`: *Getter*<S, R\>): *GetterHandler*<P\>

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
`P` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | gatter name   |
`func` | *Getter*<S, R\> | Vuex gatter function    |

**Returns:** *GetterHandler*<P\>

Defined in: [src/types.ts:107](https://github.com/matheusAle/vuex-tools/blob/d89fee5/src/types.ts#L107)

___

### mutation

▸ **mutation**<P\>(`name`: *string*, `func`: [*Mutation*](../README.md#mutation)<S, P\>): [*ActionType*](../README.md#actiontype)<P\>

define an Mutation and return an typed create commit function;

```ts
const setItems = module.mutation<Item[]>('setItems', (store, items) => store.items = items);

setItems([1, 2])
// { type: 'itemsModule/setItems', payload: [1, 2] }

store.commit(setItems([1, 2]))
```

#### Type parameters:

Name | Description |
:------ | :------ |
`P` | Mutation payload type    |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | mutation type   |
`func` | [*Mutation*](../README.md#mutation)<S, P\> | mutation handler function   |

**Returns:** [*ActionType*](../README.md#actiontype)<P\>

Defined in: [src/types.ts:64](https://github.com/matheusAle/vuex-tools/blob/d89fee5/src/types.ts#L64)
