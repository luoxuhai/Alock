import i18n, { TOptions } from 'i18next';
import { TextKeyPath } from './i18n';

/**
 * Translates text.
 *
 * @param key The i18n key.
 * @param options The i18n options.
 * @returns The translated text.
 *
 * @example
 * Translations:
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * Usage:
 * ```ts
 * import { translate } from "i18n-js"
 *
 * translate("common.ok", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TextKeyPath, options: TOptions = {}) {
  return i18n.t(key, options);
}

/**
 * Alias for translate
 */
export const t = translate;
