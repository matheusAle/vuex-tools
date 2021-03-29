Vuex Tools

# Vuex Tools

## Table of contents

### Interfaces

- [ModuleBuilder](interfaces/modulebuilder.md)

### Type aliases

- [ActionType](README.md#actiontype)
- [Mutation](README.md#mutation)

### Functions

- [buildStore](README.md#buildstore)
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

Defined in: [src/types.ts:27](https://github.com/matheusAle/vuex-tools/blob/d89fee5/src/types.ts#L27)

___

### Mutation

Ƭ **Mutation**<S, P\>: (`state`: S, `P`: P) => *void*

Typed Vuex Mutation function

#### Type parameters:

Name | Description |
:------ | :------ |
`S` | Module state type   |
`P` | Mutation payload type    |

#### Type declaration:

▸ (`state`: S, `P`: P): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`state` | S |
`P` | P |

**Returns:** *void*

Defined in: [src/types.ts:9](https://github.com/matheusAle/vuex-tools/blob/d89fee5/src/types.ts#L9)

## Functions

### buildStore

▸ **buildStore**<R\>(`root`: [*ModuleBuilder*](interfaces/modulebuilder.md)<R, unknown\>, `state`: R, `modules?`: *Module*<any, R\>[]): *Store*<R\>

#### Type parameters:

Name |
:------ |
`R` |

#### Parameters:

Name | Type |
:------ | :------ |
`root` | [*ModuleBuilder*](interfaces/modulebuilder.md)<R, unknown\> |
`state` | R |
`modules` | *Module*<any, R\>[] |

**Returns:** *Store*<R\>

Defined in: [src/buildStore.ts:6](https://github.com/matheusAle/vuex-tools/blob/d89fee5/src/buildStore.ts#L6)

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

Defined in: [src/createModule.ts:8](https://github.com/matheusAle/vuex-tools/blob/d89fee5/src/createModule.ts#L8)

___

### createStore

▸ **createStore**<S\>(): [*ModuleBuilder*](interfaces/modulebuilder.md)<S, unknown\>

#### Type parameters:

Name |
:------ |
`S` |

**Returns:** [*ModuleBuilder*](interfaces/modulebuilder.md)<S, unknown\>

Defined in: [src/createStore.ts:4](https://github.com/matheusAle/vuex-tools/blob/d89fee5/src/createStore.ts#L4)
