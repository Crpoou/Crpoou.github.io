import {$, EMPTY_STRING, MUSTACHE_REG_EXP, REDUNDANCY_SPACE_REG_EXP, SPACE_STRING, TEMPLATE} from '@constant'
import {IsExpression, css, html, remove} from '@util'

// interface CrpoouAddEventListenerOptions extends EventListenerObject, AddEventListenerOptions {
//   type: string
//   prevent?: boolean
//   stop?: boolean
//   immediate?: boolean
// }
/**
 * ## 声明组件
 * 可传入class、url（）、
 * @param {CustomElementConstructor} c
 * @description
 * 注册自定义元素
 * 编译render函数，自定义元素可直接使用该render函数渲染shadow dom，也可通过fragment声明根节点的指令，如果不需要shadow dom，也可通过fragment类似声明单根节点指令
 * 渲染的元素均有自己的响应式与指令处理器，其中scope为自定义元素本身
 * 样式会自动插入shadow_root.adoptedStyleSheets，以此来声明shadow tree的样式，shadow tree的默认样式可导入公共sheet来实现（顺序自定义）；如果无shadow tree，此时的自定义元素为内联元素，如需要定义样式，需要为自定义元素的上层adoptedStyleSheets添加声明
 * * 导入mjs文件，自动注册
 *   * 导出class，class提供html模板、style样式、JS逻辑为class本身，其中html中的style与class的style属性注入共存
 * * 导入html文件，自动注册
 *   * 解析、提取模板、提取style、提取script脚本，script脚本，与第一种方式类似，目标都是获取三件套
 * ## 指令
 * ### #if
 * * `#if=expression`
 * ### #else-if
 * * `#else-if=expression`
 * ### #else
 * * `#else`
 * * `#else=expression`
 * ### #for
 * * `#for="element of iterable"` 循环可迭代对象
 * * `#for="element,index of iterable"` 循环可迭代对象，额外参数index
 * * `#for="_,index of iterable"` 循环可迭代对象，额外参数index，使用_忽略entry
 * * `#for="_ of {length:10}"` 循环指定次数，此时的_为undefined，没有使用意义
 * * `#for="_,index of {length:10}"` 循环指定次数，额外参数index
 * ### #switch
 * * `#switch=expression`
 * ### #case
 * * `#case=expression`
 * ### #default
 * * `#default`
 * * `#default=expression`
 * ### .single
 * * `#if.single`
 * * `#else-if.single`
 * * `#else.single`
 * * `#case.single`
 * * `#default.single`
 * ### #key
 * * `#key=expression`
 * ## 绑定
 * ### 属性绑定
 * * hidden
 * * id=layout
 */
export function define(c: CustomElementConstructor): void
export function define(c: CustomElementConstructor) {
  // 设置toStringTag
  Reflect.defineProperty(c.prototype, Symbol.toStringTag, {value: c.name})
  // 设置template
  TEMPLATE.innerHTML = c.template
  // 添加至临时body容器，满足xpath context node 要求
  $.body.append(TEMPLATE.content)
  // 删除非法script脚本
  $.body.querySelectorAll(TagName.SCRIPT).forEach(remove)
  // style转移至adoptedStyleSheets
  const styles = $.body.querySelectorAll(TagName.STYLE)
  // 删除style
  styles.forEach(remove)
  // 转移style至styleSheets，由自定义元素作者自行使用
  for (const style of styles) c.styleSheets.push(css(style.textContent))
  ;[...$.createTreeWalker($.body, NodeFilter.SHOW_COMMENT)].forEach(remove)
  // 删除冗余节点后格式化文本
  $.body.normalize()
  // 删除冗余空白、拆分动态插值，删除错误插值
  const walker = $.createTreeWalker($.body, NodeFilter.SHOW_TEXT)
  while (walker.nextNode()) {
    const text = walker.currentNode as Text
    const trim = text.data.replace(REDUNDANCY_SPACE_REG_EXP, SPACE_STRING).trim() // 冗余空白最小化
    if (!trim) {
      walker.previousNode()
      text.remove()
      continue
    }
    text.data = trim
    let current_node = text
    let index = 0
    let length = 0
    for (const string of trim.matchAll(MUSTACHE_REG_EXP)) {
      debugger
      index = string.index - index - length
      length = string.groups.mus.length
      /** 插值节点 */
      const mustache_node = current_node.splitText(index)
      /** 后续节点，为当前迭代节点的子串，后续迭代需要直接跳过 */
      current_node = mustache_node.splitText(length)
      const exp = string.groups.exp.trim()
      if (IsExpression(exp)) {
        // 如果为表达式，替换为注释
        mustache_node.replaceWith($.createComment(exp))
      } else {
        // 非法表达式，直接删除
        mustache_node.remove()
      }
      walker.nextNode()
    }
  }
  // 格式化文本后需要再次格式化，删除离散的空白节点
  $.body.normalize()
  console.log($.body)
  // 格式化指令，删除错误、冗余指令
  // const
  for (let result = $.evaluate(`//@*[substring-before(concat(name(),'.'),'.')='${Directives.IF}']`, $.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE), attr = Attr.prototype; (attr = result.iterateNext() as Attr); ) {
    // 可以与其他任意指令组合
    // 如果为非法表达式，忽略整个元素
    if (!IsExpression(attr.value)) attr.ownerElement.remove()
  }
  for (let result = $.evaluate(`//@*[substring-before(concat(name(),'.'),'.')='${Directives.ELSE_IF}']`, $.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE), attr = Attr.prototype; (attr = result.iterateNext() as Attr); ) {
    // 如果前方无
    if (!IsExpression(attr.value) || (attr.ownerElement.previousSibling as any)?.attributes?.[Directives.IF]) attr.ownerElement.remove()
  }
  for (let result = $.evaluate(`//@*[substring-before(concat(name(),'.'),'.')='${Directives.ELSE}']`, $.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE), attr = Attr.prototype; (attr = result.iterateNext() as Attr); ) {
    // 可以与其他任意指令组合
    // 如果为非法表达式，忽略整个元素
    if ((attr.ownerElement.previousSibling as any)?.attributes?.[Directives.IF] || (attr.ownerElement.previousSibling as any)?.attributes?.[Directives.ELSE_IF]) attr.ownerElement.remove()
    attr.value = EMPTY_STRING
  }
  for (let result = $.evaluate(`//@*[substring-before(concat(name(),'.'),'.')='${Directives.FOR}']`, $.body), attr = Attr.prototype; (attr = result.iterateNext() as Attr); ) {
    // 可以与其他任意指令组合
    // 如果为非法表达式，忽略整个元素
    if (!IsExpression(attr.value)) attr.ownerElement.remove()
  }
  for (let result = $.evaluate(`//@*[substring-before(concat(name(),'.'),'.')='${Directives.SWITCH}']`, $.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE), attr = Attr.prototype; (attr = result.iterateNext() as Attr); ) {
    // 可以与其他任意指令组合
    // 如果为非法表达式，忽略整个元素
    if (!IsExpression(attr.value)) attr.ownerElement.remove()
  }
  for (let result = $.evaluate(`//@*[substring-before(concat(name(),'.'),'.')='${Directives.CASE}']`, $.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE), attr = Attr.prototype; (attr = result.iterateNext() as Attr); ) {
    // 可以与其他任意指令组合
    // 如果为非法表达式，忽略整个元素
    if (!IsExpression(attr.value)) attr.ownerElement.remove()
  }
  for (let result = $.evaluate(`//@*[substring-before(concat(name(),'.'),'.')='${Directives.DEFAULT}']`, $.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE), attr = Attr.prototype; (attr = result.iterateNext() as Attr); ) {
    // 可以与其他任意指令组合
    // 如果为非法表达式，忽略整个元素
    if (!IsExpression(attr.value)) attr.ownerElement.remove()
  }
  for (let result = $.evaluate(`//@*[substring-before(concat(name(),'.'),'.')='${Directives.KEY}']`, $.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE), attr = Attr.prototype; (attr = result.iterateNext() as Attr); ) {
    // 可以与其他任意指令组合
    // 如果为非法表达式，忽略整个元素
    if (!IsExpression(attr.value)) attr.ownerElement.remove()
  }
  for (let result = $.evaluate(`//@*[starts-with(name(),'#') and not(substring-before(concat(name(),'.'),'.')='${Directives.IF}' or substring-before(concat(name(),'.'),'.')='${Directives.ELSE_IF}' or substring-before(concat(name(),'.'),'.')='${Directives.ELSE}' or substring-before(concat(name(),'.'),'.')='${Directives.FOR}' or substring-before(concat(name(),'.'),'.')='${Directives.SWITCH}' or substring-before(concat(name(),'.'),'.')='${Directives.CASE}' or substring-before(concat(name(),'.'),'.')='${Directives.DEFAULT}' or substring-before(concat(name(),'.'),'.')='${Directives.KEY}')]`, $.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE), attr = Attr.prototype; (attr = result.iterateNext() as Attr); ) {
    attr.ownerElement.removeAttributeNode(attr)
  }
  // for (let attr = Attr.prototype; (attr = result.iterateNext() as Attr); ) {
  //   // 获取指令，忽略修饰符
  //   const [x] = attr.name.split('.')
  //   switch (x) {
  //     case Directives.IF: {
  //     }
  //     case Directives.ELSE_IF:

  //     case Directives.ELSE:
  //       if (!IsExpression(attr.value)) attr.ownerElement.removeAttributeNode(attr)
  //       else if ((attr.ownerElement.previousSibling as any)?.attributes?.[Directives.IF] || (attr.ownerElement.previousSibling as any)?.attributes?.[Directives.ELSE_IF]) attr.ownerElement.removeAttributeNode(attr)
  //     case Directives.FOR:
  //     case Directives.SWITCH:
  //     case Directives.CASE:
  //     case Directives.DEFAULT:
  //     case Directives.KEY:
  //     default:
  //       // 非法指令直接删除
  //       attr.ownerElement.removeAttributeNode(attr.removeChild())
  //   }
  // }
  // let currentNode
  // console.log(result.resultType)
  // while ((currentNode = result.iterateNext())) console.log(currentNode)
  // 3.创建walker
  customElements.define(c.localName, c, c)
  // document.createElementNS($.body.firstChild.lastChild.namespaceURI,$.body.firstChild.lastChild.localName)
}
class App extends HTMLElement {
  static localName = 'crpoou-blog'
  static template = html`您的项目「{{project.name}}」已消耗超过{{ project.rate }}，请及时充值<form @submit.prevent=handleSubmit>
  <fieldset #if=options.size #if.detach><label #for="option of options">{{option.label}}：<input #key=option.value type=radio name=platform_source :value=option.value></label></fieldset><svg></svg></form>`
  static styleSheets = []
}
define(App)
