define(globalThis, {
  TagName: Object.freeze({
    __proto__: null,
    A: 'a',
    ABBR: 'abbr',
    ADDRESS: 'address',
    ALL: '*',
    AREA: 'area',
    ARTICLE: 'article',
    ASIDE: 'aside',
    AUDIO: 'audio',
    B: 'b',
    BASE: 'base',
    BDI: 'bdi',
    BDO: 'bdo',
    BLOCKQUOTE: 'blockquote',
    BODY: 'body',
    BR: 'br',
    BUTTON: 'button',
    CANVAS: 'canvas',
    CAPTION: 'caption',
    CITE: 'cite',
    CODE: 'code',
    COL: 'col',
    COLGROUP: 'colgroup',
    DATA: 'data',
    DATALIST: 'datalist',
    DD: 'dd',
    DEL: 'del',
    DETAILS: 'details',
    DFN: 'dfn',
    DIALOG: 'dialog',
    DIR: 'dir',
    DIV: 'div',
    DL: 'dl',
    DT: 'dt',
    EM: 'em',
    EMBED: 'embed',
    FIELDSET: 'fieldset',
    FIGCAPTION: 'figcaption',
    FIGURE: 'figure',
    FONT: 'font',
    FOOTER: 'footer',
    FORM: 'form',
    FRAME: 'frame',
    FRAMESET: 'frameset',
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    H4: 'h4',
    H5: 'h5',
    H6: 'h6',
    HEAD: 'head',
    HEADER: 'header',
    HGROUP: 'hgroup',
    HR: 'hr',
    HTML: 'html',
    I: 'i',
    IFRAME: 'iframe',
    IMG: 'img',
    INPUT: 'input',
    INS: 'ins',
    KBD: 'kbd',
    LABEL: 'label',
    LEGEND: 'legend',
    LI: 'li',
    LINK: 'link',
    MAIN: 'main',
    MAP: 'map',
    MARK: 'mark',
    MARQUEE: 'marquee',
    MENU: 'menu',
    META: 'meta',
    METER: 'meter',
    NAV: 'nav',
    NOSCRIPT: 'noscript',
    OBJECT: 'object',
    OL: 'ol',
    OPTGROUP: 'optgroup',
    OPTION: 'option',
    OUTPUT: 'output',
    P: 'p',
    PARAM: 'param',
    PICTURE: 'picture',
    PRE: 'pre',
    PROGRESS: 'progress',
    Q: 'q',
    RP: 'rp',
    RT: 'rt',
    RUBY: 'ruby',
    S: 's',
    SAMP: 'samp',
    SCRIPT: 'script',
    SECTION: 'section',
    SELECT: 'select',
    SLOT: 'slot',
    SMALL: 'small',
    SOURCE: 'source',
    SPAN: 'span',
    STRONG: 'strong',
    STYLE: 'style',
    SUB: 'sub',
    SUMMARY: 'summary',
    SUP: 'sup',
    TABLE: 'table',
    TBODY: 'tbody',
    TD: 'td',
    TEMPLATE: 'template',
    TEXTAREA: 'textarea',
    TFOOT: 'tfoot',
    TH: 'th',
    THEAD: 'thead',
    TIME: 'time',
    TITLE: 'title',
    TR: 'tr',
    TRACK: 'track',
    U: 'u',
    UL: 'ul',
    VAR: 'var',
    VIDEO: 'video',
    WBR: 'wbr',

    LAYER: 'layer'
    // blink bgsound keygen 完全过时的和弃用的元素
    // big plaintext layer selectmenu rtc acronym nobr popup rb strike listing tt center 但是浏览器可以正确渲染的元素
  }),
  Directives: Object.freeze({
    __proto__: null,
    IF: '#if',
    ELSE_IF: '#else-if',
    ELSE: '#else',
    FOR: '#for',
    SWITCH: '#switch',
    CASE: '#case',
    DEFAULT: '#default',
    KEY: '#key'
    // detach
  }),
  EventName: Object.freeze({
    __proto__: null,
    CLICK: 'click',
    INPUT: 'input',
    CHANGE: 'change',
    SEARCH: 'search',

    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',

    LOAD: 'load',
    CONSTRUCT: 'construct'
  }),
  ES: Object.freeze({
    __proto__: null,
    IsCallable(set) {
      try {
        return Reflect.deleteProperty(Object.defineProperty(ES.IsCallable, Symbol.iterator, {configurable: true, set}), Symbol.iterator)
      } catch {
        return false
      }
    },
    AssertCallable(fn) {
      if (ES.IsCallable(fn)) return
      throw TypeError(`${fn} is not a function`)
    },
    SameValueZero(x, y) {
      if (Object.is(x, y)) return true
      return (Object.is(x, 0) && Object.is(y, -0)) || (Object.is(x, -0) && Object.is(y, 0))
    },
    Throw() {
      throw null
    }
  }),
  NavigationHistoryBehavior: Object.freeze({
    __proto__: null,
    AUTO: 'auto',
    PUSH: 'push',
    REPLACE: 'replace'
  }),
  NavigationFocusReset: Object.freeze({
    __proto__: null,
    AFTER_TRANSITION: 'after-transition',
    MANUAL: 'manual'
  }),
  NavigationScrollRestoration: Object.freeze({
    __proto__: null,
    AFTER_TRANSITION: 'after-transition',
    MANUAL: 'manual'
  }),
  NavigationType: Object.freeze({
    __proto__: null,
    RELOAD: 'reload',
    PUSH: 'push',
    REPLACE: 'replace',
    TRAVERSE: 'traverse'
  }),
  InsertPosition: Object.freeze({
    __proto__: null,
    BEFORE_BEGIN: 'beforebegin',
    AFTER_BEGIN: 'afterbegin',
    BEFORE_END: 'beforeend',
    AFTER_END: 'afterend'
  })
})
define(Set.prototype, {
  union(iterable) {
    const set = new Set(this)
    for (const entry of iterable) set.add(entry)
    return set
  },
  intersection(iterable) {
    const set = new Set()
    for (const entry of iterable) this.has(entry) && set.add(entry)
    return set
  },
  difference(iterable) {
    const set = new Set(this)
    for (const entry of iterable) set.delete(entry)
    return set
  },
  symmetricDifference(iterable) {
    const set = new Set(this)
    for (const entry of iterable) set.delete(entry) || set.add(entry)
    return set
  },
  isSubsetOf(iterable) {
    const set = ES.IsCallable(iterable.has) ? iterable : new Set(iterable)
    for (const entry of this) if (!set.has(entry)) return false
    return true
  },
  isSupersetOf(iterable) {
    for (const entry of iterable) if (!this.has(entry)) return false
    return true
  },
  isDisjointFrom(iterable) {
    for (const entry of iterable) if (this.has(entry)) return false
    return true
  },
  filter(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    const set = new Set()
    for (const entry of this) if (Reflect.apply(callbackfn, thisArg, [entry, entry, this])) set.add(entry)
    return set
  },
  map(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    const set = new Set()
    for (const entry of this) set.add(Reflect.apply(callbackfn, thisArg, [entry, entry, this]))
    return set
  },
  find(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    for (const entry of this) if (Reflect.apply(callbackfn, thisArg, [entry, entry, this])) return entry
  },
  some(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    for (const entry of this) if (Reflect.apply(callbackfn, thisArg, [entry, entry, this])) return true
    return false
  },
  every(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    for (const entry of this) if (!Reflect.apply(callbackfn, thisArg, [entry, entry, this])) return false
    return true
  },
  reduce(callbackfn, initialValue = undefined) {
    ES.AssertCallable(callbackfn)
    let accumulator = initialValue,
      first = true
    const not = arguments.length < 2
    for (const entry of this) {
      if (first && not) accumulator = entry
      else accumulator = Reflect.apply(callbackfn, undefined, [accumulator, entry, entry, this])
      first = false
    }
    if (first && not) throw TypeError('Reduce of empty set with no initial value')
    return accumulator
  },
  join(separator = ',') {
    return [...this].join(separator)
  },
  addAll() {
    Array.prototype.forEach.call(arguments, Set.prototype.add, this)
    return this
  },
  deleteAll() {
    let allDeleted = true
    for (const entry of arguments) allDeleted = allDeleted && this.delete(entry)
    return Boolean(allDeleted)
  }
})
define(Map.prototype, {
  mapValues(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    const map = new Map()
    for (const [key, value] of this) map.set(key, Reflect.apply(callbackfn, thisArg, [value, key, this]))
    return map
  },
  mapKeys(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    const map = new Map()
    for (const [key, value] of this) map.set(Reflect.apply(callbackfn, thisArg, [value, key, this]), value)
    return map
  },
  filter(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    const map = new Map()
    for (const [key, value] of this) if (Reflect.apply(callbackfn, thisArg, [value, key, this])) map.set(key, value)
    return map
  },
  find(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    for (const [key, value] of this) if (Reflect.apply(callbackfn, thisArg, [value, key, this])) return value
  },
  findKey(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    for (const [key, value] of this) if (Reflect.apply(callbackfn, thisArg, [value, key, this])) return key
  },
  keyOf(searchElement) {
    for (const [key, value] of this) if (searchElement === value) return key
  },
  some(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    for (const [key, value] of this) if (Reflect.apply(callbackfn, thisArg, [value, key, this])) return true
    return false
  },
  every(callbackfn, thisArg = undefined) {
    ES.AssertCallable(callbackfn)
    for (const [key, value] of this) if (!Reflect.apply(callbackfn, thisArg, [value, key, this])) return false
    return true
  },
  includes(searchElement) {
    for (const value of this.values()) if (ES.SameValueZero(value, searchElement)) return true
    return false
  },
  reduce(callbackfn, initialValue = undefined) {
    ES.AssertCallable(callbackfn)
    let accumulator = initialValue,
      first = true
    const not = arguments.length < 2
    for (const [key, value] of this) {
      if (first && not) accumulator = value
      else accumulator = Reflect.apply(callbackfn, undefined, [accumulator, value, key, this])
      first = false
    }
    if (first && not) throw TypeError('Reduce of empty set with no initial value')
    return accumulator
  },
  merge() {
    for (const iterable of arguments) for (const [key, value] of iterable) this.set(key, value)
    return this
  },
  deleteAll() {
    for (const key of arguments) this.delete(key)
    return this
  },
  update(key, callbackfn, thunk = undefined) {
    ES.AssertCallable(callbackfn)
    const isPresentInMap = this.has(key)
    if (!isPresentInMap && arguments.length < 3) throw Error('Invalid!')
    return this.set(key, callbackfn(isPresentInMap ? this.get(key) : thunk(key, this), key, this))
  }
})
define(Map, {
  keyBy(iterable, callbackfn) {
    ES.AssertCallable(callbackfn)
    const map = new Map()
    for (const entry of iterable) map.set(Reflect.apply(callbackfn, null, [entry]), entry)
    return map
  },
  groupBy(iterable, callbackfn) {
    ES.AssertCallable(callbackfn)
    const map = new Map()
    for (const item of iterable) {
      const key = Reflect.apply(callbackfn, null, [item])
      map.has(key) ? map.get(key).push(item) : map.set(key, [item])
    }
    return map
  }
})
define(EventTarget.prototype, {
  each() {
    for (const entry of arguments) this.addEventListener(entry.type, entry, entry)
    return this
  },
  map(map) {
    for (const entry of Object.entries(map)) this.addEventListener(...entry)
    return this
  }
})
define(TreeWalker.prototype, {
  *[Symbol.iterator]() {
    while (this.nextNode()) yield this.currentNode
  }
})
const BASE_ITERABLE = {
  __proto__: null,
  entries: Array.prototype.entries,
  keys: Array.prototype.keys,
  values: Array.prototype.values,
  forEach: Array.prototype.forEach
}
define(NamedNodeMap.prototype, BASE_ITERABLE)
define(HTMLCollection.prototype, BASE_ITERABLE)
define(HTMLAllCollection.prototype, BASE_ITERABLE)
function define(target, attributes) {
  for (const key of Reflect.ownKeys(attributes)) Reflect.has(target, key) || Reflect.defineProperty(target, key, {value: attributes[key]})
}
