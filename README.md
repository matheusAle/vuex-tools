# Vuex-tools

The easiest way to deal with Vuex store modules using typescript.

## Examples

### Simple app counter's store module [[Edit on SandBox](https://codesandbox.io/s/vuex-tools-example-vz2of?file=/src/store/index.ts)]

```ts
import { createStore, createModule } from 'vuex-tools';

interface RootState {
  counter: {
    count: number
  }
}

const counter = createModule<RootState['counter'], RootState>({ count: 0 });

export const increment = counter.mutation('increment', state =>
  state.count = state.count + 1
);

export const decrement = counter.mutation('decrement', state =>
  state.count = state.count - 1
);

export default createStore<RootState>({
  plugins: [],
  moduleBuilders: {
    counter
  }
});

store.commit(increment());
```

### using with Nuxt.JS [[Edit on CodeBox](https://codesandbox.io/s/vuex-tools-nuxt-example-fvksv?file=/store/index.js)]

```ts

// types.ts
interface RootState {
  counter: {
    count: number
  }
}

// @/store/counter.ts
import { createStore, createModule } from 'vuex-tools';

const counter = createModule<RootState['counter'], RootState>({ count: 0 });

export const increment = counter.mutation('increment', state =>
  state.count = state.count + 1
);

export const decrement = counter.mutation('decrement', state =>
  state.count = state.count - 1
);

const _module = root.getModule(/* file/module name */ 'counter');

export const mutations = _module.mutations;
export const actions = _module.actions;
export const getters = _module.getters;
```

## Documentation

[Documentation generated from source files by Typedoc](./docs/README.md).

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install vuex-tools --save

# For Yarn, use the command below.
yarn add vuex-tools
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/vuex-tools"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/vuex-tools"></script>

<script>
  // UMD module is exposed through the "VuexTools" global variable.
  console.log(VuexTools);
</script>
```

## License

Released under [MIT License](./LICENSE).
