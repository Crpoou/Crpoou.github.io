// import * as reactivity from 'https://www.unpkg.com/@vue/reactivity@3.3.8/dist/reactivity.esm-browser.js'
// import * as reactivity from './reactivity.mjs'
/** document */
const $ = document.implementation.createHTMLDocument()
/** 模板解析 */
const template = $.createElement(`template`)
/** 空对象 */
const EMPTY_OBJECT = Object.freeze(Object.create(null))
const EMPTY_ITERATOR = Array.prototype.values()
const ES = {
  false() {
    return false
  },
  true() {
    return true
  },
  noop: Function.prototype,
  origin(v) {
    return v
  },
  this: (function* () {})()[Symbol.iterator],
  IsObject(v) {
    return !!v && typeof v === 'object'
  },
  SameValueZero(x, y) {
    return x === y || (x !== x && y !== y)
  }
}
class Reactivity extends null {
  static #BASE_REACTIVE_HANDLER = {
    __proto__: null,
    get() {
      this.shallow
    }
  }
  static #MUTABLE_REACTIVE_HANDLER = {
    __proto__: this.#BASE_REACTIVE_HANDLER,
    set() {},
    deleteProperty() {},
    has() {},
    ownKeys() {}
  }
  static #READONLY_REACTIVE_HANDLER = {
    __proto__: this.#BASE_REACTIVE_HANDLER,
    set: ES.false,
    defineProperty: ES.true,
    deleteProperty: ES.true
  }
  static #BASE_COLLECTION_HANDLER = {
    __proto__: null,
    get(target, key, receiver) {
      // 四种集合，四种代理模式，共16套API原型代理，其中，每套API均有自己的重写
      // 当instrumentations无API时，直接进行默认取值
      return Reflect.get(key in this.instrumentations ? this.instrumentations : target, key, receiver)
    }
  }
  /** 根据readonly、shallow配置缓存集合、handler */
  static false = {
    false: {
      /** target -> proxy */
      proxy_map: new WeakMap(),
      /** proxy -> target */
      target_map: new WeakMap(),
      /** 对象handler */
      object_handler: this.#MUTABLE_REACTIVE_HANDLER,
      /** 集合handler */
      collection_handler: {
        __proto__: this.#BASE_COLLECTION_HANDLER,
        instrumentations: {
          __proto__: null,
          // API执行时，可以根据proxy存储在对应的proxy_map，获取true，false
          get(key) {
            const raw_target = Reactivity.ToRaw(this)
            const raw_key = Reactivity.ToRaw(key)
            if (!ES.SameValueZero(key, raw_key)) track(raw_target, 'get', key)
            track(raw_target, 'get', raw_key)
            const {has} = raw_target
            if (Reflect.apply(has, raw_target, [key])) {
              return reactive(raw_target.get(key))
            } else if (Reflect.apply(has, raw_target, [raw_key])) {
              return reactive(raw_target.get(raw_key))
            }
          },
          get size() {
            const raw_target = Reactivity.ToRaw(this)
            track(raw_target, 'iterate', ITERATE_KEY)
            return raw_target.size
          },
          has(key) {
            const raw_target = Reactivity.ToRaw(this)
            const raw_key = Reactivity.ToRaw(key)
            if (!ES.SameValueZero(key, raw_key)) track(raw_target, 'has', key)
            track(raw_target, 'has', raw_key)
            return ES.SameValueZero(key, raw_key) ? raw_target.has(key) : target.has(key) || target.has(raw_key)
          },
          add(value) {
            const raw_target = Reactivity.ToRaw(this)
            const raw_value = Reactivity.ToRaw(value)
            const had = raw_target.has(raw_value)
            if (!had) {
              raw_target.add(value)
              trigger(raw_target, 'add', value, value)
            }
            return this
          },
          set(key, value) {
            const raw_target = Reactivity.ToRaw(this)
            const raw_key = Reactivity.ToRaw(key)
            const raw_value = Reactivity.ToRaw(value)
            const had = raw_target.has(raw_key)
            const old_value = raw_target.get(raw_key)
            raw_target.set(raw_key, raw_value)
            if (!had) {
              trigger(raw_target, 'add', raw_key, raw_value)
            } else if (Object.is(raw_value, old_value)) {
              trigger(raw_target, 'set', raw_key, raw_value, old_value)
            }
            return this
          },
          delete(key) {
            const raw_target = Reactivity.ToRaw(this)
            const raw_key = Reactivity.ToRaw(key)
            const old_value = Reflect.apply(raw_target.get || ES.noop, raw_target, [raw_key])
            const result = raw_target.delete(raw_key)
            if (result) trigger(raw_target, 'delete', raw_key, undefined, old_value)
            return result
          },
          clear() {
            const raw_target = Reactivity.ToRaw(this)
            const {size} = raw_target
            const old_target = new raw_target.constructor(raw_target)
            const result = raw_target.clear()
            if (size) trigger(raw_target, 'clear', undefined, undefined, old_target)
            return result
          },
          forEach(callback) {
            const raw_target = Reactivity.ToRaw(this)
            const receiver = this
            const [, thisArg] = arguments
            track(raw_target, 'iterate', ITERATE_KEY)
            raw_target.forEach(Reactivity.CollectionEachCallback, {__proto__: null, this: thisArg, callback, wrap: reactive, receiver})
          },
          // 'keys', 'values', 'entries', Symbol.iterator
          *keys() {
            const raw_target = Reactivity.ToRaw(this)
            track(raw_target, 'iterate', isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY)
            for (const entry of raw_target.keys()) yield reactive(entry)
          },
          *values() {
            const raw_target = Reactivity.ToRaw(this)
            track(raw_target, 'iterate', isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY)
            for (const entry of raw_target.values()) yield reactive(entry)
          },
          *entries() {
            const raw_target = Reactivity.ToRaw(this)
            track(raw_target, 'iterate', isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY)
            for (const entry of raw_target.entries()) {
              entry[0] = reactive(entry[0])
            }
          },
          *keys() {
            const raw_target = Reactivity.ToRaw(this)
            track(raw_target, 'iterate', isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY)
            for (const entry of raw_target.keys()) yield reactive(entry)
          }
        }
      }
    },
    true: {
      proxy_map: new WeakMap(),
      target_map: new WeakMap(),
      object_handler: {__proto__: this.#MUTABLE_REACTIVE_HANDLER, shallow: true},
      collection_handler: this.#BASE_COLLECTION_HANDLER
    }
  }
  static true = {
    false: {proxy_map: new WeakMap(), target_map: new WeakSet(), collection_handler: this.#BASE_COLLECTION_HANDLER, object_handler: this.#READONLY_REACTIVE_HANDLER},
    true: {proxy_map: new WeakMap(), target_map: new WeakSet(), collection_handler: this.#BASE_COLLECTION_HANDLER, object_handler: {__proto__: this.#READONLY_REACTIVE_HANDLER, shallow: true}}
  }
  /** 所有响应式的proxy映射 target -> proxy */
  static proxy_map = new WeakMap()
  /** 所有响应式的target映射 proxy -> target */
  static target_map = new WeakMap()
  static ToRaw(proxy) {
    while (this.target_map.has(proxy)) proxy = this.target_map.get(proxy)
    return proxy
  }
  static CollectionEachCallback(value, key) {
    Reflect.apply(this.callback, this.this, [this.wrap(value), this.wrap(key), this.wrap(this.receiver)])
  }
  /** 计算式的计算值映射 */
  static computed = new WeakMap()
  /** 对象的预期StringType */
  static object_expect_types = [Object.name, Array.name]
  /** 集合的预期StringType */
  static collection_expect_types = [Map.name, WeakMap.name, Set.name, WeakSet.name]
}
/** listener修饰符 */
const LISTENER_MODIFY_COLLECTION = new Set(`capture.once.passive`.split`.`)
/** event修饰符 */
const EVENT_MODIFY_COLLECTION = new Set(`prevent.stop.immediate`.split`.`)
/** 字符串高亮模板 */
const html = String.raw
function track(receiver) {
  // 在对reactive object取值时，有两种取值场景
  // 1. 普通场景，如 console.log(state.count)
  // 2. 响应式场景，此时的取值方为computed value getter，监听这个reactive对象（也可能是另外一个computed，此时监听对象会下钻至最初的reactive对象，如果这个依赖的computed为纯静态（computed(()=>1)），则不会监听），reactive对象变化后触发，修改computed value为dirty，下次会自动触发二次计算，此时，二次计算可能会在自定义函数中走不同的分支，可能会出现新的依赖项，需要每次计算都进行依赖收集，大部分场景下，收集到的依赖是一样的，因为计算函数复杂度是有限的
  // 始终监听的是reactive对象，因为即使依赖了另外的computed，这个computed也是深度依赖最初的reactive的
  // 所以，每个computed对象有自己的一份dep集合，这些dep变更后，会删除该对象的COMPUTED_VALUE_MAP值，下次访问会再次计算
  // 依赖收集为：执行自定义函数时，使用到的reactive对象，当存在分支时，会有部分依赖项未收集到，此时即使这些隐藏依赖项变化，也不会二次计算，因为按照当前的分支逻辑，这些依赖项不会被使用到
  // 当分支条件变化后，可能会收集到新的依赖项，原有的依赖项可能在新一轮收集中反而没有收集到，此时，我们需要将deps进行覆盖，使用新一轮的依赖项，而不是进行add，因为使用add策略后，废弃的依赖项变化会触发二次计算，此时这些依赖项不会被使用到
}
function trigger() {}
/**
 * 创建深度响应式对象
 * * 共有五种响应式API，其中响应式有四种（`reactive`、`readonly`、`shallowReactive`、`shallowReadonly`），计算式有一种（`computed`）
 * *
 *
 * 嵌套的属性会被“懒加载”为响应式，当嵌套的属性为其他类型的响应式或计算式时（readonly、shallowReactive、shallowReadonly、computed），遵循否定大于肯定，深度响应只作用到
 * ## 对响应式取值有两种场景
 * * 普通场景，如 `console.log(state.count)`
 * * 计算式场景，如 `computed(()=>state.count*2)`
 * ## 在计算式场景中，需要进行依赖收集，有以下几种方案
 * * 在计算式上增加deps集合，集合项为依赖的响应式（target+propertyKey），当依赖项更新时，此时响应式并不知道自己被依赖了多少次，也不知道哪个计算式依赖了自己，需要在响应式上增加referer集合（refer:Set<Computed>），记录自己被谁使用了，更新后可直接遍历refer，将计算式的计算值从COMPUTED_VALUE_MAP中删除，下次访问计算式会自动再次计算，设计较为复杂
 * * 监听响应式的更新，`reactive.addEventListener('change',()=>COMPUTED_VALUE_MAP.delete(this))`，自行从COMPUTED_VALUE_MAP中删除计算值，当响应式更新时，在自身上触发dispatchEvent即可
 * * 两种方案无明显设计区别，实现不同摆了，但纯JS方案可传递参数，可能更方便扩展
 */
export function reactive(o) {
  return createReactive(o, false, false)
  // if (o === null || PRIMITIVE_COLLECTION.has(typeof o)) return o
  // if (REACTIVE_MAP.has(o)) return REACTIVE_MAP.get(o)
  // try {
  //   const proxy = new Proxy(obj, {
  //     // defineProperty() {
  //     //   console.log(this.defineProperty.name)
  //     //   return Reflect.defineProperty(...arguments)
  //     // },
  //     // deleteProperty() {
  //     //   console.log(this.deleteProperty.name)
  //     //   return Reflect.deleteProperty(...arguments)
  //     // },
  //     get(target, key, receiver) {
  //       // 如果在计算式上记录dep集合（响应式集合），当计算式销毁时，会连带一起销毁，不会影响响应式，此时响应式如何触发更新，删除计算值
  //       // 理论上，计算式引用响应式，只会出现计算式先销毁的情况，此时在响应式更新时不涉及到已经销毁的计算式
  //       const map = new WeakMap([[receiver, new Map([[key, new WeakSet()]])]])
  //       // 在对响应式进行取值时，如果是在计算式环境中，需要响应式进行依赖收集，存放到计算式的依赖集合中
  //       track()
  //       if (in_computed) {
  //         // 在响应式上记录引用方（其实就是计算式）
  //         map.get(receiver).get(key).add(computed_object)
  //       }
  //       if (in_computed) {
  //         // 在响应式上监听change事件，回调函数删除计算值
  //         map
  //           .get(receiver)
  //           .get(key)
  //           .addEventListener('change', () => {
  //             // 这个callback强引用了computed_object，computed_object被删除后，callback仍然存在，无解
  //             COMPUTED_VALUE_MAP.delete(computed_object)
  //           })
  //         // 响应式更新后，删除计算值，计算值销毁后，销毁引用
  //       }
  //       const value = Reflect.get(...arguments)
  //       return reactive(value)
  //     },
  //     has() {
  //       console.log(this.has.name)
  //       return Reflect.has(...arguments)
  //     },
  //     ownKeys() {
  //       console.log(this.ownKeys.name)
  //       return Reflect.ownKeys(...arguments)
  //     },
  //     set(target, p, newValue, receiver) {
  //       console.log(this.set.name)
  //       const oldValue = Reflect.get(target, p, receiver)
  //       const success = Reflect.set(...arguments)
  //       const $newValue = Reflect.get(target, p, receiver)
  //       trigger()
  //       // 响应式更新后，如果当前在计算式中，触发一个告警
  //       // 如果普通场景，更新后会删除计算值，下次访问自动计算，如果这个计算式被使用在绑定、插值、watch、watchEffect中，更新这些计算式，
  //       // 此处为weakSet，不能遍历，如果能够遍历，就会强引用计算式，这个计算式被销毁后，还会存在于Set中，这个方案无解
  //       {
  //         const weak = map.get(receiver).get(key)
  //         for (const x of map.get(receiver).get(key)) {
  //           // x为computed_object，将计算值删除，再次访问时自动计算
  //           COMPUTED_VALUE_MAP.delete(x)
  //         }
  //         // 派发change事件，由计算式自行删除
  //         map.get(receiver).get(key).dispatchEvent(new Event('change'))
  //       }
  //       return success
  //     }
  //   })
  //   REACTIVE_MAP.set(obj, proxy)
  //   return proxy
  // } catch {
  //   return o
  // }
}
export function readonly(o) {
  return createReactive(o, true, false)
}
export function shallowReactive(o) {
  return createReactive(o, false, true)
}
export function shallowReadonly(o) {
  return createReactive(o, true, true)
}
/**
 * 创建响应式对象
 * * 共有五种响应式API，其中响应式有四种（`reactive`、`readonly`、`shallowReactive`、`shallowReadonly`），计算式有一种（`computed`）
 * * 当五种API互相嵌套时，遵循就近原则
 * * API不允许重复创建，若传递给createReactive生成的proxy则直接抛出异常
 * * 若传递已经代理过的target直接返回缓存值，如果target已经被其他类型的响应式代理过，则也抛出异常
 */
function createReactive(target, readonly, shallow) {
  // 如果为undefined、null、boolean、number、bigint、string、symbol、function，直接返回
  if (!IsObject(target)) return target
  const {proxy_map, target_map, object_handler, collection_handler} = Reactivity[readonly][shallow]
  // 如果已经被正确调用过，直接返回缓存值
  if (proxy_map.has(target)) return proxy_map.get(target)
  // 如果target为正确调用返回的proxy，直接返回这个proxy
  if (target_map.has(target)) return target
  // 如果target为其他proxy，直接抛出异常，不允许为target代理不同的proxy
  if (Reactivity.target_map.has(target)) throw Error() // TODO:
  if (Reactivity.proxy_map.has(target)) throw Error() // TODO:
  if (!Reflect.isExtensible(target)) return target
  const type = Reflect.apply(Object.prototype.toString, target, EMPTY_ITERATOR).slice(8, -1)
  const handler = (Reactivity.object_expect_types.includes(type) && object_handler) || (Reactivity.collection_expect_types.includes(type) && collection_handler)
  // 如果为其他类型的对象，直接返回，不进行代理
  if (!handler) return target
  const proxy = new Proxy(target, handler)
  // 缓存
  proxy_map.set(target, proxy)
  // 记录当前类型proxy
  target_map.set(proxy, target)
  // 记录所有proxy
  Reactivity.proxy_map.set(target, proxy)
  Reactivity.target_map.set(proxy, target)
  return proxy
}
/**
 * 创建计算属性
 * * 计算式可能会依赖其他计算式
 * *
 */
export function computed(getter) {
  return Object.freeze({
    __proto__: null,
    get value() {
      // 如果已经被计算过，直接返回计算值
      if (COMPUTED_VALUE_MAP.has(this)) return COMPUTED_VALUE_MAP.get(this)
      // 开启响应式追踪，使用方为这个computed
      track()
      // 执行自定义计算函数，函数中会使用到响应式或者其他计算式
      const value = getter()
      // 将结果值保存，下次在进行取值时不会多次计算
      COMPUTED_VALUE_MAP.set(this, value)
      return value
    }
  })
}
export function watchEffect(effect) {}
export function watch(source, effect) {}

/*! *****************************************************************************
响应式模板引擎
***************************************************************************** */
/**
 * 解析模板，模板指html部分，script部分为一个函数，元素根节点
 * * 解析模板
 */
export function Parser(innerHTML) {
  template.innerHTML = innerHTML
  const {content} = template
}
/**
 * 创建render函数
 * * 根据各种指令生成函数，同时处理数据流转和响应式
 */
export function GenerateRender() {
  return
}
export function CreateEventOptions(attribute) {
  // assert(attribute.name.startsWith`@`)
  const [type, ...sequence] = attribute.name.split`.`
  const sequence_set = new Set(sequence)
  const listener_modify = sequence_set.intersection(LISTENER_MODIFY_COLLECTION)
  const event_modify = sequence_set.intersection(EVENT_MODIFY_COLLECTION)
  const listener_map = {
    '': null,
    passive: {__proto__: null, passive: true},
    once: {__proto__: null, once: true},
    'once,passive': {__proto__: null, once: true, passive: true},
    capture: {__proto__: null, capture: true},
    'capture,passive': {__proto__: null, capture: true, passive: true},
    'capture,once': {__proto__: null, capture: true, once: true},
    'capture,once,passive': {__proto__: null, capture: true, once: true, passive: true}
  }
  const event_map = {
    __proto__: null,
    '': Function.prototype,
    immediate: Function.prototype,
    stop(event) {
      event.stopPropagation()
    },
    'stop,immediate'(event) {
      event.stopImmediatePropagation()
    },
    prevent(event) {
      event.preventDefault()
    },
    'prevent,immediate'(event) {
      event.preventDefault()
    },
    'prevent,stop'(event) {
      event.preventDefault()
      event.stopPropagation()
    },
    'prevent,stop,immediate'(event) {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  }
  return Reflect.apply(Function(`return{__proto__:proto,type,$(){},handleEvent}`), {proto: listener_map[[...listener_modify]], type: type.slice(1), listener_modify}, EMPTY_ITERATOR)
  return {
    __proto__: null,
    type: type.slice(1),
    ...Object.fromEntries(listener_modify.entries()),
    $() {},
    handleEvent(event) {
      this.event_map[[...this.event_modify]](event)
      Reflect.apply(this.$, event.currentTarget, arguments)
    }
  }
}
