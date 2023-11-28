// 扩展URL模式匹配
interface URLPatternOptions {
  hash?: string
  hostname?: string
  password?: string
  pathname?: string
  port?: string
  protocol?: string
  search?: string
  username?: string
}
interface URLPatternExecEntry {
  groups: Record<string | number, string>
  input: string
}
interface URLPatternExecRecord {
  hash: URLPatternExecEntry
  hostname: URLPatternExecEntry
  password: URLPatternExecEntry
  pathname: URLPatternExecEntry
  port: URLPatternExecEntry
  protocol: URLPatternExecEntry
  search: URLPatternExecEntry
  username: URLPatternExecEntry
}
interface URLPattern {
  readonly hash: string
  readonly hostname: string
  readonly password: string
  readonly pathname: string
  readonly port: string
  readonly protocol: string
  readonly search: string
  readonly username: string
  exec(input: string | URL | URLPatternOptions, baseURL?: string | URL): URLPatternExecRecord
  test(input: string | URL | URLPatternOptions, baseURL?: string | URL): boolean
}
declare const URLPattern: {
  prototype: URLPattern
  new (url: string | URL | URLPatternOptions, baseURL?: string | URL): URLPattern
}
