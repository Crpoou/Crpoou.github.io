interface Mapper<Value, Receiver, This, Return> {
  (this: This, value: Value, key: number, receiver: Receiver): Return
}
interface Each<Value, Receiver, This> {
  (this: This, value: Value, key: number, receiver: Receiver): void
}
interface Module<T> {
  get default(): T
}

enum Directives {
  IF = '#if',
  ELSE_IF = '#else-if',
  ELSE = '#else',
  FOR = '#for',
  SWITCH = '#switch',
  CASE = '#case',
  DEFAULT = '#default',
  KEY = '#key'
  // detach
}
