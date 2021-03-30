[Vuex Tools](../README.md) / ModuleBuilder

# Interface: ModuleBuilder<State, RootState\>

Create an define Module's action, gatters and mutation dispatch and commit helpers

```ts
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

define an Action and return a typed create dispatch function

```ts
const fetchItems = module.action<{ page: number }>('setItems', ({ commit }, { page }) =>
   API.fetchItems(page)
       .then(items =>
           commit(setItems(items))
       )
);

store.commit(setItems([1, 2]));
```

#### Type parameters:

Name | Description |
:------ | :------ |
`Payload` | Action argument type     |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | action type   |
`actionFn` | *ActionHandler*<State, RootState, Payload\> | action handler function   |

**Returns:** [*ActionType*](../README.md#actiontype)<Payload\>

Defined in: [src/types.ts:89](https://github.com/matheusAle/vuex-tools/blob/2a543b1/src/types.ts#L89)

___

### getModule

▸ **getModule**(`name?`: *string*): *Module*<State, RootState\>

Create the VuexModule object.

#### Parameters:

Name | Type |
:------ | :------ |
`name?` | *string* |

**Returns:** *Module*<State, RootState\>

Defined in: [src/types.ts:123](https://github.com/matheusAle/vuex-tools/blob/2a543b1/src/types.ts#L123)

___

### getter

▸ **getter**<Return\>(`name`: *string*, `getterFn`: *Getter*<State, RootState\>): *GetterHandler*<Return\>

Define an getter function and create an accessor function to getter value.

```ts
const getSortedItems = module.getter<Item[]>('sortedItems', (state) =>
  [...state.items].sort(a, b) => a - b
);

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

Name | Description |
:------ | :------ |
`Return` | Getter return type    |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | gatter name   |
`getterFn` | *Getter*<State, RootState\> | Vuex getter function   |

**Returns:** *GetterHandler*<Return\>

Defined in: [src/types.ts:116](https://github.com/matheusAle/vuex-tools/blob/2a543b1/src/types.ts#L116)

___

### mutation

▸ **mutation**<Payload\>(`name`: *string*, `mutationFn`: [*Mutation*](../README.md#mutation)<State, Payload\>): [*ActionType*](../README.md#actiontype)<Payload\>

define a Mutation and return a typed create commit function;

```ts
const setItems = module.mutation<Item[]>('setItems', (store, items) => store.items = items);

setItems([1, 2])
// { type: 'itemsModule/setItems', payload: [1, 2] }

store.commit(setItems([1, 2]))
```

#### Type parameters:

Name | Description |
:------ | :------ |
`Payload` | Mutation argument type    |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | mutation type   |
`mutationFn` | [*Mutation*](../README.md#mutation)<State, Payload\> | mutation handler function   |

**Returns:** [*ActionType*](../README.md#actiontype)<Payload\>

Defined in: [src/types.ts:66](https://github.com/matheusAle/vuex-tools/blob/2a543b1/src/types.ts#L66)
