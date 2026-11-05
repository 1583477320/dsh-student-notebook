/**
 * Host half of the Student-Notebook theme.
 *
 * The theme is intentionally browser-only: it owns no routes, tools, storage
 * or credentials. This module exists so the profile can mount the package as a
 * normal plugin row; the visible work happens in `client.js`.
 */

/**
 * @param ctx - the Host plugin context.
 * @param config - the row's raw config; `{ enabled: false }` keeps it dormant.
 */
export function apply(ctx, config) {
  const options = config && typeof config === 'object' ? config : {}
  if (options.enabled === false) return

  // Nothing to register on the Host plane. Keeping apply() a no-op makes the
  // theme safe to mount in headless profiles and easy to uninstall.
}
