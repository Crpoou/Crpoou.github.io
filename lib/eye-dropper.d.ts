// 扩展拾颜器
interface EyeDropperOptions {
  /** 信号 */
  signal?: AbortSignal
}
interface EyeDropperResult {
  /** RGB格式颜色 */
  sRGBHex: string
}
interface EyeDropper {
  open(options?: EyeDropperOptions): Promise<EyeDropperResult>
}
declare var EyeDropper: {
  prototype: EyeDropper
  new (): EyeDropper
}
