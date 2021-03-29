[libraryNameWithSpacesAndUpperCases]

# [libraryNameWithSpacesAndUpperCases]

## Table of contents

### Interfaces

- [Module](interfaces/module.md)
- [ModuleBuilder](interfaces/modulebuilder.md)

### Type aliases

- [ActionHandler](README.md#actionhandler)
- [ActionType](README.md#actiontype)
- [GetterHandler](README.md#getterhandler)
- [Mutation](README.md#mutation)

### Functions

- [buildStore](README.md#buildstore)
- [createModule](README.md#createmodule)
- [createStore](README.md#createstore)

## Type aliases

### ActionHandler

Ƭ **ActionHandler**<S, R, P\>: (`store`: *Vuex.Store*<R\>, `payload`: P) => *void*

Typed Vuex action function

#### Type parameters:

Name |
:------ |
`S` |
`R` |
`P` |

#### Type declaration:

▸ (`store`: *Vuex.Store*<R\>, `payload`: P): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`store` | *Vuex.Store*<R\> |
`payload` | P |

**Returns:** *void*

Defined in: src/types.ts:16

___

### ActionType

Ƭ **ActionType**<P\>: (`payload`: P) => { `payload`: P ; `type`: *string*  }

return if action/mutation create

**`param`** Action payload type

#### Type parameters:

Name |
:------ |
`P` |

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

Defined in: src/types.ts:22

___

### GetterHandler

Ƭ **GetterHandler**<R\>: (`gatter`: *any*) => R

#### Type parameters:

Name |
:------ |
`R` |

#### Type declaration:

▸ (`gatter`: *any*): R

#### Parameters:

Name | Type |
:------ | :------ |
`gatter` | *any* |

**Returns:** R

Defined in: src/types.ts:11

___

### Mutation

Ƭ **Mutation**<S, P\>: (`state`: S, `P`: P) => *void*

Typed Vuex Mutation function

**`param`** Module state type

**`param`** Mutation payload type

#### Type parameters:

Name |
:------ |
`S` |
`P` |

#### Type declaration:

▸ (`state`: S, `P`: P): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`state` | S |
`P` | P |

**Returns:** *void*

Defined in: src/types.ts:8

## Functions

### buildStore

▸ **buildStore**<R\>(`root`: [*ModuleBuilder*](interfaces/modulebuilder.md)<R, unknown\>, `state`: R, `modules?`: [*Module*](interfaces/module.md)<any, R\>[]): *Store*<R\>

#### Type parameters:

Name |
:------ |
`R` |

#### Parameters:

Name | Type |
:------ | :------ |
`root` | [*ModuleBuilder*](interfaces/modulebuilder.md)<R, unknown\> |
`state` | R |
`modules` | [*Module*](interfaces/module.md)<any, R\>[] |

**Returns:** *Store*<R\>

Defined in: src/buildStore.ts:6

___

### createModule

▸ **createModule**<S, R\>(`moduleName?`: *string*): [*ModuleBuilder*](interfaces/modulebuilder.md)<S, R\>

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | - |
`R` | *unknown* |

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`moduleName` | *string* | '' |

**Returns:** [*ModuleBuilder*](interfaces/modulebuilder.md)<S, R\>

Defined in: [src/createModule.ts:8](https://github.com/matheusAle/vuex-toolkit/blob/42b5ba2/src/createModule.ts#L8)

___

### createStore

▸ **createStore**<S\>(): [*ModuleBuilder*](interfaces/modulebuilder.md)<S, unknown\>

#### Type parameters:

Name |
:------ |
`S` |

**Returns:** [*ModuleBuilder*](interfaces/modulebuilder.md)<S, unknown\>

Defined in: [src/createStore.ts:4](https://github.com/matheusAle/vuex-toolkit/blob/42b5ba2/src/createStore.ts#L4)
