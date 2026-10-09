import * as migration_20260926_113641_initial from './20260926_113641_initial';
import * as migration_20261009_203712_add_post_external_image from './20261009_203712_add_post_external_image';
import * as migration_20261009_210000_import_wp_content from './20261009_210000_import_wp_content';

export const migrations = [
  {
    up: migration_20260926_113641_initial.up,
    down: migration_20260926_113641_initial.down,
    name: '20260926_113641_initial',
  },
  {
    up: migration_20261009_203712_add_post_external_image.up,
    down: migration_20261009_203712_add_post_external_image.down,
    name: '20261009_203712_add_post_external_image'
  },
  {
    up: migration_20261009_210000_import_wp_content.up,
    down: migration_20261009_210000_import_wp_content.down,
    name: '20261009_210000_import_wp_content'
  },
];
