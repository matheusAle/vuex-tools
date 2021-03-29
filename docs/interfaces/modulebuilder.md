[[libraryNameWithSpacesAndUpperCases]](../README.md) / ModuleBuilder

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

▸ **action**<P\>(`name`: *string*, `func`: [*ActionHandler*](../README.md#actionhandler)<S, R, P\>): [*ActionType*](../README.md#actiontype)<P\>

define an Action and return an typed create dispatch function;

#### Type parameters:

Name |
:------ |
`P` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | action type   |
`func` | [*ActionHandler*](../README.md#actionhandler)<S, R, P\> | action handler function  ```typescript const fetchItems = module.action<{ page: number }>('setItems', ({ commit }, { page }) =>    API.fetchItems(page)        .then(items =>            commit(setItems(items))        ) );  setItems([1, 2]) // { type: 'itemsModule/setItems', payload: [1, 2] }  store.commit(setItems([1, 2]))  ```    |

**Returns:** [*ActionType*](../README.md#actiontype)<P\>

Defined in: src/types.ts:78

___

### getModule

▸ **getModule**(`state`: S): [*Module*](module.md)<S, R\>

Receive the initial module state and return an instance of Vuex Module object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`state` | S | initial module state    |

**Returns:** [*Module*](module.md)<S, R\>

Defined in: src/types.ts:103

___

### getter

▸ **getter**<P\>(`name`: *string*, `func`: *Getter*<S, R\>): [*GetterHandler*](../README.md#getterhandler)<P\>

Define an getter function and create an acessor function
```
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

**Returns:** [*GetterHandler*](../README.md#getterhandler)<P\>

Defined in: src/types.ts:98

___

### mutation

▸ **mutation**<P\>(`name`: *string*, `func`: [*Mutation*](../README.md#mutation)<S, P\>): [*ActionType*](../README.md#actiontype)<P\>

define an Mutation and return an typed create commit function;

#### Type parameters:

Name |
:------ |
`P` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | mutation type   |
`func` | [*Mutation*](../README.md#mutation)<S, P\> | mutation handler function  ```typescript const setItems = module.mutation<Item[]>('setItems', (store, items) => store.items = items);  setItems([1, 2]) // { type: 'itemsModule/setItems', payload: [1, 2] }  store.commit(setItems([1, 2]))  ```    |

**Returns:** [*ActionType*](../README.md#actiontype)<P\>

Defined in: src/types.ts:56
