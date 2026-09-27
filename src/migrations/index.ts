import * as migration_20260926_113641_initial from './20260926_113641_initial';

export const migrations = [
  {
    up: migration_20260926_113641_initial.up,
    down: migration_20260926_113641_initial.down,
    name: '20260926_113641_initial'
  },
];
