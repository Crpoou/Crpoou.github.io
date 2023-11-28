/////////////////////////////
/// 扩展CSSOM
/////////////////////////////

interface CSSStyleSheet {
  /** 异步解析 */
  replace(text: string): Promise<this>
  /** 同步解析 */
  replaceSync(text: string): void
}
