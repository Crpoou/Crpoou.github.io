/// <reference types="vite/client" />
/// <reference types="./base" />
/// <reference types="./es" />
/// <reference types="./dom" />
/// <reference types="./css" />
/// <reference types="./web" />

/////////////////////////////
/// 自定义interface
/////////////////////////////
// interface HTMLModule {
//   readonly [Symbol.toStringTag]: 'Module'
//   readonly default: CustomElementConstructor
// }
// // customElements.define
// interface AstrographContext {
//   readonly globalThis: typeof globalThis
//   readonly $: Document
//   readonly F: typeof DocumentFragment
//   readonly T: typeof Text
//   readonly C: typeof Comment
//   readonly Array: ArrayConstructor
//   readonly Set: SetConstructor
//   readonly Map: MapConstructor

//   readonly instance: any
//   create: Document['createElement']
//   addEventListener(target: Node, ...children: Node[]): Node
//   append(target: Node, ...children: Node[]): Node
//   from(iterable: Iterable<any> | ArrayLike<any>, mapfn: AstrographContextFromMapfn, thisArg: AstrographContext): Node[]
// }
// interface AstrographContextFromMapfn {
//   (this: AstrographContext, entry: any, index: number): Node
// }
