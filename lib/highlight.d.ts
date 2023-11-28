enum HighlightType {
  HIGHLIGHT = 'highlight',
  SPELLING_ERROR = 'spelling-error',
  GRAMMAR_ERROR = 'grammar-error'
}
abstract class SetLike<T> {
  add(value: T): void
  clear(): void
  delete(value: T): boolean

  forEach(callbackfn: (value: T, value2: T, highlight: this) => void, thisArg?: any): void
  has(value: T): boolean
  get size(): number

  [Symbol.iterator](): IterableIterator<T>

  entries(): IterableIterator<[T, T]>
  keys(): IterableIterator<T>
  values(): IterableIterator<T>
}
abstract class MapLike<K, V> {
  clear(): void
  delete(key: K): boolean
  forEach(callbackfn: (value: V, key: K, map: this) => void, thisArg?: any): void
  get(key: K): V | undefined
  has(key: K): boolean
  set(key: K, value: V): this
  get size(): number

  [Symbol.iterator](): IterableIterator<[K, V]>
  entries(): IterableIterator<[K, V]>
  keys(): IterableIterator<K>
  values(): IterableIterator<V>
}
class Highlight extends SetLike<AbstractRange> {
  constructor(...initialRanges: AbstractRange[])
  priority: number
  type: HighlightType;
  readonly [Symbol.toStringTag]: 'Highlight'
}
class HighlightRegistry extends MapLike<string, Highlight> {
  readonly [Symbol.toStringTag]: 'HighlightRegistry'
}
declare namespace CSS {
  const highlights: HighlightRegistry
}
declare namespace CodeHighlight {
  const k: Highlight
  const i: Highlight
  const r: Highlight
  const a: Highlight
  const s: Highlight
  const l: Highlight
  const c: Highlight
}
