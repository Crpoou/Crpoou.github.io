import {EMPTY_STRING, HYPHENATE_REG_EXP, REDUNDANCY_SPACE_REG_EXP, SPACE_STRING, THROW_PROXY} from '@constant'

/////////////////////////////
/// CSS
/////////////////////////////
/**
 * 根据映射关系生成CSS@property规则
 * @param map 映射对象
 * @param variable 变量名称
 * @param inherits 是否继承
 * @example
 * ```ts
 * enum Position { LEFT, TOP, RIGHT, BOTTOM }
 * generate({ [Position.LEFT]: 'inline-block', [Position.TOP]: 'block', [Position.RIGHT]: 'none', [Position.BOTTOM]: 'none' })
 * ```
 */
export function CreateCSSProperty(map: Record<string, string>, variable: string, inherits = true) {
  // assert(new Set(Object.values($enum)).size === new Set(Object.keys($map)).size)
  const bucket = new Map<string, number>()
  const values = Object.values(map)
  for (const v of values) bucket.set(v, (bucket.get(v) || 0) + 1)
  const $values = new Set(values.sort((a, b) => bucket.get(b) - bucket.get(a)))
  const keys = Object.keys(map)
  const properties: string[] = []
  const all_initials: string[] = []
  let prev_syntax = new Set(keys)
  let i = 0
  for (const v of $values) {
    i++
    // 因为第一步的过滤函数没有上一步，所以此时默认的has函数为全量，即所有的enum都有可能
    // syntax为initial-value + 映射值不为initial-value的enum - 上一步过滤函数不会返回的enum + 上一步过滤函数的initial-value
    const syntax = new Set(keys.filter(x => map[x] !== v && prev_syntax.has(x)))
    all_initials.forEach(Set.prototype.add, syntax)
    syntax.add(v)
    all_initials.push(v)
    prev_syntax = syntax
    properties.push(`@property --${variable}${i === $values.size ? EMPTY_STRING : `-step${i}`}{syntax:'${[...syntax].join`|`}';initial-value:${v};inherits:${!!inherits}}`)
  }
  return properties.join(EMPTY_STRING)
}

export function css(string: TemplateStringsArray): CSSStyleSheet
export function css(string: string): CSSStyleSheet
/** css字符串转CSSStyleSheet */
export function css(s: any) {
  const sheet = new CSSStyleSheet()
  sheet.replace(s)
  return sheet
}

/////////////////////////////
/// HTML
/////////////////////////////
/** html高亮 */
export const html = String.raw

/** 清除fragment空白，压缩 */
export function clean(fragment: DocumentFragment) {
  const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT)
  const collection = []
  for (const currentNode of walker) {
    const trim = currentNode.nodeValue.replace(REDUNDANCY_SPACE_REG_EXP, SPACE_STRING).trim()
    if (trim) currentNode.nodeValue = trim
    else collection.push(currentNode)
  }
  for (const node of collection) node.remove()
  return fragment
}

export function remove(node: ChildNode) {
  node.remove()
}
/////////////////////////////
/// ES
/////////////////////////////
const IS_LITERAL_MAP = new Map<string, boolean>()
/** 是否为立即数，即不使用当前作用域内的变量 */
export function IsLiteral(code: string) {
  if (IS_LITERAL_MAP.has(code)) return IS_LITERAL_MAP.get(code)
  try {
    const is = Function(`with(this)return ${code.trim()}`).call(THROW_PROXY) !== THROW_PROXY
    IS_LITERAL_MAP.set(code, is)
    return is
    // 如果使用了this这类关键字变量，不会进入proxy，需要当做非立即数
  } catch {
    // 如果语法错误，当做非立即数
    // 如果执行如报错，当做非立即数
    IS_LITERAL_MAP.set(code, false)
    return false
  }
}

const IS_EXPRESSION_MAP = new Map<string, boolean>()
/** 是否为表达式，能写在return之后即为表达式 */
export function IsExpression(code: string) {
  if (IS_EXPRESSION_MAP.has(code)) return IS_EXPRESSION_MAP.get(code)
  try {
    const trim = code.trim()
    if (trim) Function(`return ${code.trim()}`)
    IS_EXPRESSION_MAP.set(code, Boolean(trim))
    return Boolean(trim)
  } catch {
    IS_EXPRESSION_MAP.set(code, false)
    return false
  }
}

/////////////////////////////
/// Response
/////////////////////////////
/** Response转JSON */
export function toJson(response: Response) {
  return response.json()
}

/** Response转TEXT */
export function toText(response: Response) {
  return response.text()
}

/////////////////////////////
/// Math
/////////////////////////////
/** 递增 */
export function increment(a: number, b: number) {
  return a - b
}

/** 递减 */
export function decrement(a: number, b: number) {
  return b - a
}

/** 加法 */
export function plus(a: number, b: number) {
  return a + b
}

export function sum(...numbers: number[]): number
/** 求和 */
export function sum() {
  return Array.prototype.reduce.call<any, any, number>(arguments, plus, 0)
}

/////////////////////////////
/// 函数
/////////////////////////////
export function serial<T>(...args: Iterable<T>[]): Generator<T, T, T>
/**
 * 展开arguments
 * @example
 * ```ts
 * const set_one = new Set([1, 2, 3])
 * const set_two = new Set([3, 4, 5])
 * const union = new Set(serial(set_one, set_two))
 * for (const v of serial(set_one, set_two)) console.log(v)
 * ```
 */
export function* serial() {
  for (const arg of arguments) yield* arg
}

/** Class定义toStringTag */
export function defineToStringTag<C extends Function>(c: C) {
  Reflect.defineProperty(c.prototype, Symbol.toStringTag, {value: c.name})
  return c
}

/** 驼峰转连字符 */
export function hyphenate(string: string) {
  return string.replace(HYPHENATE_REG_EXP, '-$1').toLowerCase()
}

/** push辅助函数
 * @example
 * ```ts
 * const bucket = [1, 2, 3]
 * const array = [6, 5, 4]
 * array.reduceRight(push, bucket)
 * ```
 */
export function push<T>(prev: T[], cur: T, index: number, receiver: T[]) {
  prev.push(cur)
  return prev
}

///////////////////
/// 业务
/////////////////////////////

/** 获取绑定修饰符 */
// export function modifiers(attr: Attr) {
//   const {name} = attr
//   if (MODIFIERS_MAP.has(name)) return MODIFIERS_MAP.get(name)
//   const array = MODIFIERS_REGEXP.exec(name)
//   const modifiers = new Set(array?.groups.modifiers?.split(DOT).filter(Boolean))
//   MODIFIERS_MAP.set(name, modifiers)
//   return modifiers
// }

// function parse(this: HTMLElement) {
//   const text = new Text() // text节点
//   // @ts-ignore
//   $.documentElement.innerHTML = String.raw(...arguments) // 解析html
//   for (const node of $.documentElement.childNodes) {
//     if (node.nodeType === Node.TEXT_NODE) {
//       text.appendData(node.nodeValue) // 文本节点没有高亮，白色
//     } else {
//       // 创建range包含高亮节点
//       CodeHighlight[node.nodeName].add(
//         new StaticRange({
//           startContainer: text,
//           endContainer: text,
//           startOffset: text.length,
//           endOffset: (text.appendData(node.textContent), text.length)
//         })
//       )
//     }
//   }
//   $.documentElement.replaceChildren()
//   this.appendChild(text)
//   return this
// }

// /** 高亮代码 */
// export function highlight(template: TemplateStringsArray): HTMLPreElement {
//   return WEAK_MAP.get(template) || WEAK_MAP.set(template, Reflect.apply(parse, document.createElement(TagName.PRE), arguments)).get(template)
// }

// export function code(template: TemplateStringsArray): HTMLElement {
//   return WEAK_MAP.get(template) || WEAK_MAP.set(template, Reflect.apply(parse, document.createElement(TagName.CODE), arguments)).get(template)
// }
