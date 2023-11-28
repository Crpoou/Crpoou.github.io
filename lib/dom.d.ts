/////////////////////////////
/// 扩展DOM
/////////////////////////////
// 批量事件监听器接口
interface AddEventListenerObject extends AddEventListenerOptions, EventListenerObject {
  readonly type: string
}
interface EventTarget {
  readonly [Symbol.toStringTag]: 'EventTarget'
  /**
   * 通过列表批量添加事件监听器
   * @example
   * ```ts
   * each({type:'click',handleEvent(){}},{type:'change',handleEvent(){}})
   * ```
   */
  each(...entries: Array<AddEventListenerObject>): this
  /**
   * 通过字典批量添加事件监听器
   * @example
   * ```ts
   * map({click(){},change(){}})
   * ```
   */
  map(a: object): this
}
interface IterableBase<T extends Node> {
  [Symbol.iterator](): IterableIterator<T>
  entries(): IterableIterator<[number, T]>
  keys(): IterableIterator<number>
  values(): IterableIterator<T>
  forEach<This>(callbackfn: Each<T, this, This>, thisArg?: This): void
}
interface IterableWithAccessor<T extends Element> extends IterableBase<T> {
  [name: string]: T | undefined
}
interface NodeList extends IterableBase<Node> {
  readonly [Symbol.toStringTag]: 'NodeList'
  forEach<This>(callbackfn: Each<T, this, This>, thisArg?: This): void
}
interface NodeListOf<TNode> {
  [Symbol.iterator](): IterableIterator<TNode>
  entries(): IterableIterator<[number, TNode]>
  values(): IterableIterator<TNode>
  forEach<This>(callbackfn: Each<TNode, this, This>, thisArg?: This): void
}
// // 扩展HTMLCollection迭代器
interface HTMLCollectionBase extends IterableWithAccessor<Element> {}
interface HTMLCollectionOf<T> {
  [Symbol.iterator](): IterableIterator<T>
  entries(): IterableIterator<[number, T]>
  keys(): IterableIterator<number>
  values(): IterableIterator<T>
  forEach<This>(callbackfn: Each<T, this, This>, thisArg?: This): void
  [name: string]: T | undefined
}
interface HTMLCollection {
  readonly [Symbol.toStringTag]: 'HTMLCollection'
}
interface HTMLOptionsCollection {
  readonly [Symbol.toStringTag]: 'HTMLOptionsCollection'
}
interface HTMLFormControlsCollection {
  readonly [Symbol.toStringTag]: 'HTMLFormControlsCollection'
  [Symbol.iterator](): IterableIterator<RadioNodeList | Element>
  entries(): IterableIterator<[number, RadioNodeList | Element]>
  keys(): IterableIterator<number>
  values(): IterableIterator<RadioNodeList | Element>
  forEach<This>(callbackfn: Each<RadioNodeList | Element, this, This>, thisArg?: This): void
}

interface HTMLAllCollection extends IterableWithAccessor<Element> {
  readonly [Symbol.toStringTag]: 'HTMLAllCollection'
  (nameOrIndex: string | number): Element
}
// 扩展NamedNodeMap迭代器
interface NamedNodeMap extends IterableBase<Attr> {
  readonly [Symbol.toStringTag]: 'NamedNodeMap'
  [name: string]: Attr | undefined
}
interface TreeWalker {
  [Symbol.iterator](): IterableIterator<ChildNode>
}
// 扩展自定义元素生命周期
interface CustomElementConstructor extends ElementDefinitionOptions {
  /** 元素tag */
  readonly localName: string
  /** 元素模板 */
  readonly template?: string
  /** 元素样式表，负责shadow dom样式 */
  readonly styleSheets?: CSSStyleSheet[]
  /** 观察的属性列表 */
  readonly observedAttributes?: string[]
  /** 是否需要关联form表单 */
  readonly formAssociated?: boolean
  /** 禁用选项 'internals' 'shadow' */
  readonly disabledFeatures?: ('internals' | 'shadow')[]
}
// 扩展自定义元素生命周期
interface HTMLElement {
  /** 元素连接文档时 */
  connectedCallback?(): void
  /** 元素从文档中删除时 */
  disconnectedCallback?(): void
  /** 元素被移动到新的文档时 */
  adoptedCallback?(): void
  /** 元素增加、删除、修改自身属性时 */
  attributeChangedCallback?(attributeName: string, oldValue: string, newValue: string, namespace: string): void
  /** 元素关联表单时 */
  formAssociatedCallback?(form: HTMLFormElement | null): void
  /** owner form 被reset时 */
  formResetCallback?(): void
  /** 禁用状态变更时 */
  formDisabledCallback?(disabled: boolean): void
  /** 当用户代理代表用户或作为导航的一部分更新与表单关联的自定义元素的值时， */
  formStateRestoreCallback?(value: string, reason: 'autocomplete' | 'restore'): void
}
interface CustomStateSet extends IterableBase<string> {
  readonly [Symbol.toStringTag]: 'CustomStateSet'
  add(state: string): this
  clear(): void
  has(state: string): boolean
  delete(state: string): boolean
  get size(): number
}
interface ElementInternals {
  get states(): CustomStateSet
}
enum InsertPosition {
  BEFORE_BEGIN = 'beforebegin',
  AFTER_BEGIN = 'afterbegin',
  BEFORE_END = 'beforeend',
  AFTER_END = 'afterend'
}
enum TagName {
  A = 'a',
  ABBR = 'abbr',
  ADDRESS = 'address',
  ALL = '*',
  AREA = 'area',
  ARTICLE = 'article',
  ASIDE = 'aside',
  AUDIO = 'audio',
  B = 'b',
  BASE = 'base',
  BDI = 'bdi',
  BDO = 'bdo',
  BLOCKQUOTE = 'blockquote',
  BODY = 'body',
  BR = 'br',
  BUTTON = 'button',
  CANVAS = 'canvas',
  CAPTION = 'caption',
  CITE = 'cite',
  CODE = 'code',
  COL = 'col',
  COLGROUP = 'colgroup',
  DATA = 'data',
  DATALIST = 'datalist',
  DD = 'dd',
  DEL = 'del',
  DETAILS = 'details',
  DFN = 'dfn',
  DIALOG = 'dialog',
  DIR = 'dir',
  DIV = 'div',
  DL = 'dl',
  DT = 'dt',
  EM = 'em',
  EMBED = 'embed',
  FIELDSET = 'fieldset',
  FIGCAPTION = 'figcaption',
  FIGURE = 'figure',
  FONT = 'font',
  FOOTER = 'footer',
  FORM = 'form',
  FRAME = 'frame',
  FRAMESET = 'frameset',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  HEAD = 'head',
  HEADER = 'header',
  HGROUP = 'hgroup',
  HR = 'hr',
  HTML = 'html',
  I = 'i',
  IFRAME = 'iframe',
  IMG = 'img',
  INPUT = 'input',
  INS = 'ins',
  KBD = 'kbd',
  LABEL = 'label',
  LEGEND = 'legend',
  LI = 'li',
  LINK = 'link',
  MAIN = 'main',
  MAP = 'map',
  MARK = 'mark',
  MARQUEE = 'marquee',
  MENU = 'menu',
  META = 'meta',
  METER = 'meter',
  NAV = 'nav',
  NOSCRIPT = 'noscript',
  OBJECT = 'object',
  OL = 'ol',
  OPTGROUP = 'optgroup',
  OPTION = 'option',
  OUTPUT = 'output',
  P = 'p',
  PARAM = 'param',
  PICTURE = 'picture',
  PRE = 'pre',
  PROGRESS = 'progress',
  Q = 'q',
  RP = 'rp',
  RT = 'rt',
  RUBY = 'ruby',
  S = 's',
  SAMP = 'samp',
  SCRIPT = 'script',
  SECTION = 'section',
  SELECT = 'select',
  SLOT = 'slot',
  SMALL = 'small',
  SOURCE = 'source',
  SPAN = 'span',
  STRONG = 'strong',
  STYLE = 'style',
  SUB = 'sub',
  SUMMARY = 'summary',
  SUP = 'sup',
  TABLE = 'table',
  TBODY = 'tbody',
  TD = 'td',
  TEMPLATE = 'template',
  TEXTAREA = 'textarea',
  TFOOT = 'tfoot',
  TH = 'th',
  THEAD = 'thead',
  TIME = 'time',
  TITLE = 'title',
  TR = 'tr',
  TRACK = 'track',
  U = 'u',
  UL = 'ul',
  VAR = 'var',
  VIDEO = 'video',
  WBR = 'wbr'
}
enum EventName {
  // DOM常规事件类型
  /** 点击 */
  CLICK = 'click',
  /** 输入 */
  INPUT = 'input',
  /** 变更 */
  CHANGE = 'change',
  /** 查询 */
  SEARCH = 'search',

  // 数据库事件类型
  /** 增加 */
  CREATE = 'create',
  /** 读取 */
  READ = 'read',
  /** 更新 */
  UPDATE = 'update',
  /** 删除 */
  DELETE = 'delete',

  // 自定义事件类型
  /** 资源加载完毕 */
  LOAD = 'load',
  /** 实例构造完毕 */
  CONSTRUCT = 'construct'
}
