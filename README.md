# Vuex-tools

The easiest way to deal with Vuex store modules with typescript.

## Example

```ts
import { createModule, createStore, buildStore } from 'vuex-tools';
import Api from './Service';
import Vue from 'vue';


interface User {
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
}

interface PostState {
  posts:
}

interface RootState {
  user: { name: email }
}

const root = createStore<RootState>();
const setUser = root.mutation<string>('setUser', (state, user) =>
  Vue.set(state, 'user', user);
);
const fetchToken = root.action('fetchUser', ({commit}) =>
  Api.fetchUser().then(user => commit(setUser(user)))
);
const userNameAndEmail = root.getter('userNameAndEmail', (state) =>
  `${state.user.name} <${state.user.email}>`
);

const post = createModule<PostState, RootState>('Post');
const setPosts = root.mutation<Post[]>('setPosts', (state, posts) =>
  Vue.set(state, 'posts', posts);
);
const fetchPosts = root.action('fetchUser', ({commit}) =>
  Api.fetchUser().then(user => commit(setPosts(user)))
);

const store = buildStore({user: {}}, root, [
  post.getModule({ posts: [] }),
]);


store.dispatch(fetchUser());
store.dispatch(fetchPosts());

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
  // UMD module is exposed through the "[libraryCamelCaseName]" global variable.
  console.log(vuexTools);
</script>
```

## License

Released under [MIT License](./LICENSE).
