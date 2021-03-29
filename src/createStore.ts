import { createModule } from './createModule';
import type { ModuleBuilder } from './types';

export function createStore<S>(): ModuleBuilder<S, unknown> {
  return createModule<S, unknown>('');
}
