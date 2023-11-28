/////////////////////////////
/// 扩展ES类
/////////////////////////////
namespace ES {
  function IsCallable(fn: Function): boolean
  function AssertCallable(fn: Function): void
  function SameValueZero(x: any, y: any): boolean
  function Throw(): never
}

interface Object {
  __proto__?: any
}
interface Array<T> {
  /** 支持直接使用join``来拼接字符串 */
  join(separator?: TemplateStringsArray): string
  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  map<U, THIS>(callbackfn: (this: THIS, value: T, index: number, array: this) => U, thisArg: THIS): U[]
}
interface Set<T> {
  union<U>(iterable: Iterable<U>): Set<T & U>
  intersection(iterable: Iterable<any>): Set<T>
  difference(iterable: Iterable<any>): Set<T>
  symmetricDifference<U>(iterable: Iterable<U>): Set<T & U>
  isSubsetOf(iterable: Iterable<any>): boolean
  isSupersetOf(iterable: Iterable<any>): boolean
  isDisjointFrom(iterable: Iterable<any>): boolean
  filter<S extends T>(predicate: (value: T, value2: T, set: this) => value is S, thisArg?: any): Set<S>
  filter(predicate: (value: T, value2: T, set: this) => unknown, thisArg?: any): Set<T>
  map<U>(callbackfn: (value: T, value2: T, set: this) => U, thisArg?: any): Set<U>
  find<S extends T>(predicate: (this: void, value: T, value2: T, set: this) => value is S, thisArg?: any): S | undefined
  find(predicate: (value: T, value2: T, set: this) => unknown, thisArg?: any): T | undefined
  some(predicate: (value: T, value2: T, set: this) => unknown, thisArg?: any): boolean
  every<S extends T>(predicate: (value: T, value2: T, set: this) => value is S, thisArg?: any): this is Set<S>
  every(predicate: (value: T, value2: T, set: this) => unknown, thisArg?: any): boolean
  reduce(callbackfn: (previousValue: T, value: T, value2: T, set: this) => T): T
  reduce(callbackfn: (previousValue: T, value: T, value2: T, set: this) => T, initialValue: T): T
  reduce<U>(callbackfn: (previousValue: U, value: T, value2: T, set: this) => U, initialValue: U): U
  join(separator?: string): string
  addAll(...items: T[]): this
  deleteAll(...items: T[]): boolean
}
interface Map<K, V> {
  mapValues<U>(callbackfn: (value: V, key: K, map: this) => U, thisArg?: any): Map<K, U>
  mapKeys<U>(callbackfn: (value: V, key: K, map: this) => U, thisArg?: any): Map<U, V>
  filter<SK extends K, SV extends V>(predicate: (value: V, key: K, map: this) => value is SV, thisArg?: any): Map<K, V>
  filter(predicate: (value: V, key: K, map: this) => unknown, thisArg?: any): Map<K, V>
  find<S extends V>(predicate: (this: void, value: V, key: K, map: this) => value is S, thisArg?: any): S | undefined
  find(predicate: (value: V, key: K, map: this) => unknown, thisArg?: any): V | undefined
  findKey<S extends K>(predicate: (this: void, value: V, key: K, map: this) => key is S, thisArg?: any): S | undefined
  findKey(predicate: (value: V, key: K, map: this) => unknown, thisArg?: any): K | undefined
  keyOf(value: V): K | undefined
  some(predicate: (value: V, key: K, map: this) => unknown, thisArg?: any): boolean
  every<SK extends K, SV extends V>(predicate: (value: V, key: K, map: this) => value is SV, thisArg?: any): this is Map<SK, SV>
  every(predicate: (value: V, key: K, map: this) => unknown, thisArg?: any): boolean
  includes(value: V): boolean
  reduce(callbackfn: (previousValue: V, value: V, key: K, map: this) => V): V
  reduce(callbackfn: (previousValue: V, value: V, key: K, map: this) => V, initialValue: V): V
  reduce<U>(callbackfn: (previousValue: U, value: V, key: K, map: this) => U, initialValue: U): U
  merge(...iterables: Iterable<[K, V]>[]): this
  deleteAll(...keys: K[]): this
  update(key: K, callbackfn: (value: V, key: K, map: this) => V, thunk?: (key: K, map: this) => V): this
}
interface MapConstructor {
  keyBy<K, V>(iterable: Iterable<V>, callbackfn: (entry: V) => K): Map<K, V>
  groupBy<K, V>(iterable: Iterable<V>, callbackfn: (entry: V) => K): Map<K, V[]>
}
