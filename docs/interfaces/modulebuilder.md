[Vuex Tools](../README.md) / ModuleBuilder

# Interface: ModuleBuilder<State, RootState\>

Return of {@see createModule}.
Interface that helps to create Vuex Module's actions, mutations and getters.

```ts
interface RootState {
  module_one: {
    list: string[]
  }
}
const module = createModule<RootState['module_one'], RootState>({ list: [] });
```

## Type parameters

Name | Default | Description |
:------ | :------ | :------ |
`State` | - | Type of module state, usually an key in RootState.   |
`RootState` | *unknown* | Type of root store state    |

## Table of contents

### Methods

- [action](modulebuilder.md#action)
- [getModule](modulebuilder.md#getmodule)
- [getter](modulebuilder.md#getter)
- [mutation](modulebuilder.md#mutation)

## Methods

### action

▸ **action**<Payload\>(`name`: *string*, `actionFn`: *ActionHandler*<State, RootState, Payload\>): *ActionType*<Payload\>

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

**Returns:** *ActionType*<Payload\>

Defined in: [src/types.ts:103](https://github.com/matheusAle/vuex-tools/blob/5dd09e7/src/types.ts#L103)

___

### getModule

▸ **getModule**(`name?`: *string*): *Module*<State, RootState\>

Create the VuexModule object.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name?` | *string* | Module name/prefix    |

**Returns:** *Module*<State, RootState\>

Defined in: [src/types.ts:140](https://github.com/matheusAle/vuex-tools/blob/5dd09e7/src/types.ts#L140)

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
`name` | *string* | getter name   |
`getterFn` | *Getter*<State, RootState\> | Vuex getter function   |

**Returns:** *GetterHandler*<Return\>

Defined in: [src/types.ts:130](https://github.com/matheusAle/vuex-tools/blob/5dd09e7/src/types.ts#L130)

___

### mutation

▸ **mutation**<Prop, Payload\>(`name`: Prop): *ActionType*<Payload\>

Auto Define a mutation for a property and return the action create function.
Internally `Vue#set` is called to set the value into store.

```ts
const setItems = module.mutation('setItems');
store.commit(setItems([1, 2]))
```

#### Type parameters:

Name | Type | Description |
:------ | :------ | :------ |
`Prop` | *string* \| *number* \| *symbol* | - |
`Payload` | - | Mutation argument type    |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | Prop | mutation type   |

**Returns:** *ActionType*<Payload\>

Defined in: [src/types.ts:63](https://github.com/matheusAle/vuex-tools/blob/5dd09e7/src/types.ts#L63)

▸ **mutation**<Payload\>(`name`: *string*, `mutationFn?`: *Mutation*<State, Payload\>): *ActionType*<Payload\>

Define Mutation with an custom implementation, and return a typed create commit function;

```ts
const setItems = module.mutation<Item[]>('setItems', (store, items) => store.items = items);
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
`mutationFn?` | *Mutation*<State, Payload\> | mutation handler function   |

**Returns:** *ActionType*<Payload\>

Defined in: [src/types.ts:79](https://github.com/matheusAle/vuex-tools/blob/5dd09e7/src/types.ts#L79)
