// 扩展Navigation
interface NavigationEventMap {
  navigate: NavigateEvent
  navigateerror: Event
  navigatesuccess: ErrorEvent
  currententrychange: NavigationCurrentEntryChangeEvent // TODO:
}
interface NavigationEventListenerObject<E extends Event> {
  handleEvent(event: E): void
}
/**
 * @see https://wicg.github.io/navigation-api/#navigation
 */
interface Navigation extends EventTarget {
  readonly [Symbol.toStringTag]: 'Navigation'
  entries(): Array<NavigationHistoryEntry>
  get currentEntry(): NavigationHistoryEntry
  updateCurrentEntry(options: NavigationUpdateCurrentEntryOptions): void
  get transition(): NavigationTransition

  get canGoBack(): boolean
  get canGoForward(): boolean

  navigate(url: string, options?: NavigationNavigateOptions): NavigationResult
  reload(options?: NavigationReloadOptions): NavigationResult

  traverseTo(key: string, options?: NavigationOptions): NavigationResult
  back(options?: NavigationOptions): NavigationResult
  forward(options?: NavigationOptions): NavigationResult

  onnavigate(ev: NavigateEvent): any
  onnavigatesuccess(ev: Event): any
  onnavigateerror(ev: ErrorEvent): any
  oncurrententrychange(ev: NavigationCurrentEntryChangeEvent): any

  addEventListener<K extends keyof NavigationEventMap>(type: K, listener: ((this: this, ev: NavigationEventMap[K]) => any) | NavigationEventListenerObject<NavigationEventMap[K]>, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof NavigationEventMap>(type: K, listener: ((this: this, ev: NavigationEventMap[K]) => any) | NavigationEventListenerObject<NavigationEventMap[K]>, options?: boolean | EventListenerOptions): void
}
interface NavigationConstructor {
  readonly prototype: Navigation
  new (): never
}
declare var navigation: Navigation
declare var Navigation: NavigationConstructor
interface NavigationUpdateCurrentEntryOptions {
  state?: any
}
interface NavigationOptions {
  info?: any
}
interface NavigationNavigateOptions extends NavigationOptions {
  state?: any
  history?: NavigationHistoryBehavior
}
interface NavigationReloadOptions extends NavigationOptions {
  state?: any
}
interface NavigationResult {
  committed: Promise<NavigationHistoryEntry>
  finished: Promise<NavigationHistoryEntry>
}
enum NavigationHistoryBehavior {
  AUTO = 'auto',
  PUSH = 'push',
  REPLACE = 'replace'
}
interface NavigationCurrentEntryChangeEvent extends Event {
  readonly [Symbol.toStringTag]: 'NavigationCurrentEntryChangeEvent'
  get navigationType(): NavigationType
  get from(): NavigationHistoryEntry
}
declare var NavigationCurrentEntryChangeEvent: {
  readonly prototype: NavigationCurrentEntryChangeEvent
  new (type: string, event: NavigationCurrentEntryChangeEventInit): NavigationCurrentEntryChangeEvent
}
interface NavigationCurrentEntryChangeEventInit extends EventInit {
  navigationType?: NavigationType
  destination: NavigationHistoryEntry
}
interface NavigationTransition {
  readonly [Symbol.toStringTag]: 'NavigationTransition'
  get navigationType(): NavigationType
  get from(): NavigationHistoryEntry
  get finished(): Promise<void>
}
interface NavigationTransitionConstructor {
  readonly prototype: NavigationTransition
  new (): never
}
declare var NavigationTransition: NavigationTransitionConstructor
interface NavigateEvent extends Event {
  readonly [Symbol.toStringTag]: NavigateEvent
  get navigationType(): NavigationType
  get destination(): NavigationDestination
  get canIntercept(): boolean
  get userInitiated(): boolean
  get hashChange(): boolean
  get signal(): AbortSignal
  get formData(): FormData
  get downloadRequest(): string
  get info(): any

  transitionWhile(p: Promise<any>): void
  intercept(options?: NavigationInterceptOptions): void
  restoreScroll(): void
}
interface NavigateEventConstructor {
  readonly prototype: NavigateEvent
  new (type: string, eventInit: NavigateEventInit): NavigateEvent
}
declare var NavigateEvent: NavigateEventConstructor
interface NavigateEventInit extends EventInit {
  navigationType?: NavigationType
  destination: NavigationDestination
  canIntercept?: boolean
  userInitiated?: boolean
  hashChange?: boolean
  signal: AbortSignal
  formData?: FormData
}
interface NavigationInterceptOptions {
  handler: NavigationInterceptHandler
  focusReset?: NavigationFocusReset
  scrollRestoration?: NavigationScrollRestoration
}
enum NavigationFocusReset {
  AFTER_TRANSITION = 'after-transition',
  MANUAL = 'manual'
}
enum NavigationScrollRestoration {
  AFTER_TRANSITION = 'after-transition',
  MANUAL = 'manual'
}
interface NavigationInterceptHandler {
  (this: NavigateEvent): Promise<void>
}
enum NavigationType {
  RELOAD = 'reload',
  PUSH = 'push',
  REPLACE = 'replace',
  TRAVERSE = 'traverse'
}
interface NavigationDestination {
  get url(): string
  get key(): string
  get id(): string
  get index(): number
  get sameDocument(): boolean

  getState(): any
}
interface NavigationDestinationConstructor {
  readonly prototype: NavigationDestination
  new (): never
}
declare var NavigationDestination: NavigationDestinationConstructor
interface NavigationHistoryEntry extends EventTarget {
  get url(): string
  get key(): string
  get id(): string
  get index(): number
  get sameDocument(): boolean

  getState(): any

  ondispose(ev: Event): any

  addEventListener(type: 'dispose', listener: (this: this, ev: Event) => any, options?: boolean | AddEventListenerOptions): void
  removeEventListener(type: 'dispose', listener: (this: this, ev: Event) => any, options?: boolean | EventListenerOptions): void
}
interface NavigationHistoryEntryConstructor {
  readonly prototype: NavigationHistoryEntry
  new (): never
}
declare var NavigationHistoryEntry: NavigationHistoryEntryConstructor
