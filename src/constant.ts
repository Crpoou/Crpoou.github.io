/** document */
export const $ = document.implementation.createHTMLDocument()
/** 空字符 */
export const EMPTY_STRING = String()
/** 空白字符 */
export const SPACE_STRING = String.fromCodePoint(32)
/** 点 */
export const DOT = '.'
/** 静态符号 */
export const STATIC = Symbol()
/** 空对象 */
export const EMPTY_OBJECT = Object.freeze({__proto__: null})
/** 空迭代器，在Reflect.apply时使用 */
export const EMPTY_ITERATOR = Array.prototype.values()
/** 双花插值正则 */
export const MUSTACHE_REG_EXP = /(?<mus>\{\{(?<exp>(?:.|\r?\n)+?)\}\})/g
/** 冗余空白正则 */
export const REDUNDANCY_SPACE_REG_EXP = /\s+/g
/** 模板 */
export const TEMPLATE = $.createElement(TagName.TEMPLATE)
/** 永远报错的代理对象 */
export const THROW_PROXY = new Proxy(EMPTY_OBJECT, Object.fromEntries(Reflect.ownKeys(Reflect).map(x => [x, ES.Throw])))
/** 匹配大写字母正则表达式 */
export const HYPHENATE_REG_EXP = /\B([A-Z])/g
/** 匹配URL内无扩展文件名 */
export const URL_FILENAME_PATTERN = new URLPattern({pathname: '*/:filename.*'})
/** 属性修饰符正则表达式 */
export const MODIFIERS_REGEXP = /^@(?<type>\w+)(?<modifiers>.*)/
