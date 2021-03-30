# Vuex-tools

The easiest way to deal with Vuex store modules using typescript.

## Examples

```ts
import { createStore, createModule } from 'vuex-tools';

const module = createModule<RootStore['modue'], RootStore>();

export const increment = module.mutation('increment', state =>
  state.counter = state.counter + 1
);
export const decrement = module.mutation('descrement', state =>
  state.counter = state.counter - 1
);

export default createStore<RootStore>({
  plugins: [],
  moduleBuilders: {
    module
  }
});

store.commit(increment());
// this.$store.commit(increment())
```

[simple counter app on CodeBox](https://codesandbox.io/s/vuex-tools-example-vz2of?file=/src/store/index.ts)

[nuxt current date example](https://codesandbox.io/s/vuex-tools-nuxt-example-fvksv?file=/store/index.js)

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
