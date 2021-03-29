[[libraryNameWithSpacesAndUpperCases]](../README.md) / Module

# Interface: Module<S, R\>

Extention of Vuex module

## Type parameters

Name | Description |
:------ | :------ |
`S` | Module state type   |
`R` | RootStore state type    |

## Hierarchy

* *Module*<S, R\>

  ↳ **Module**

## Table of contents

### Properties

- [actions](module.md#actions)
- [getters](module.md#getters)
- [modules](module.md#modules)
- [mutations](module.md#mutations)
- [name](module.md#name)
- [namespaced](module.md#namespaced)
- [state](module.md#state)

## Properties

### actions

• `Optional` **actions**: *ActionTree*<S, R\>

Inherited from: void

Defined in: node_modules/vuex/types/index.d.ts:127

___

### getters

• `Optional` **getters**: *GetterTree*<S, R\>

Inherited from: void

Defined in: node_modules/vuex/types/index.d.ts:126

___

### modules

• `Optional` **modules**: *ModuleTree*<R\>

Inherited from: void

Defined in: node_modules/vuex/types/index.d.ts:129

___

### mutations

• `Optional` **mutations**: *MutationTree*<S\>

Inherited from: void

Defined in: node_modules/vuex/types/index.d.ts:128

___

### name

• **name**: *string*

Defined in: src/types.ts:30

___

### namespaced

• `Optional` **namespaced**: *boolean*

Inherited from: void

Defined in: node_modules/vuex/types/index.d.ts:124

___

### state

• `Optional` **state**: S \| () => S

Inherited from: void

Defined in: node_modules/vuex/types/index.d.ts:125
