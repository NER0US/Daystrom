/** God's identity before anyone has customized it — the app's own default,
 *  not a magic string sprinkled at every spawn call site. */
export const DEFAULT_GOD_NAME = 'Jean Luc';
const LEGACY_DEFAULT_GOD_NAME = 'Michael';

/**
 * Resolve god's display name for a (re)spawn.
 *
 * `renameAgent()` (`store.ts`) persists a rename straight into `registry.json`
 * via `hive.ts`'s `renameAgent()` — but the god-spawn effect used to rebuild
 * god's agent object from scratch with `name: DEFAULT_GOD_NAME` hardcoded in
 * three places, so a custom name reverted to the app default on every restart
 * even though the registry still had it right. Reading the persisted name
 * back here (instead of hardcoding the default) is what keeps a rename from
 * reverting. Falls back to the Daystrom default when nothing has been persisted
 * yet, or when the persisted value is the old app default.
 */
export function resolveGodName(persistedName: string | undefined | null): string {
  const trimmed = persistedName?.trim();
  if (trimmed === LEGACY_DEFAULT_GOD_NAME) return DEFAULT_GOD_NAME;
  return trimmed ? trimmed : DEFAULT_GOD_NAME;
}
