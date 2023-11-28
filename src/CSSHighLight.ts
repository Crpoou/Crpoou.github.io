/** Token类型 */
const CSSParserTokenType = {
  IdentToken: Symbol(),
  FunctionToken: Symbol(),
  AtKeywordToken: Symbol(),
  HashToken: Symbol(),
  UrlToken: Symbol(),
  BadUrlToken: Symbol(),
  DelimiterToken: Symbol(),
  NumberToken: Symbol(),
  UnitToken: Symbol(),
  PercentageToken: Symbol(),
  DimensionToken: Symbol(),
  IncludeMatchToken: Symbol(),
  DashMatchToken: Symbol(),
  PrefixMatchToken: Symbol(),
  SuffixMatchToken: Symbol(),
  SubstringMatchToken: Symbol(),
  ColumnToken: Symbol(),
  UnicodeRangeToken: Symbol(),
  WhitespaceToken: Symbol(),
  CDOToken: Symbol(),
  CDCToken: Symbol(),
  ColonToken: Symbol(),
  SemicolonToken: Symbol(),
  CommaToken: Symbol(),
  LeftParenthesisToken: Symbol(),
  RightParenthesisToken: Symbol(),
  LeftBracketToken: Symbol(),
  RightBracketToken: Symbol(),
  LeftBraceToken: Symbol(),
  RightBraceToken: Symbol(),
  StringToken: Symbol(),
  BadStringToken: Symbol(),
  EOFToken: Symbol(),
  CommentToken: Symbol()
}
const CSSNestingType = {
  None: Symbol()
}
/** 规则集类型 */
const RuleListType = {
  TopLevelRuleList: Symbol(),
  RegularRuleList: Symbol(),
  KeyframesRuleList: Symbol(),
  FontFeatureRuleList: Symbol(),
  PositionFallbackRuleList: Symbol()
}
const AllowedRulesType = {
  AllowCharsetRules: Symbol(),
  AllowLayerStatementRules: Symbol(),
  AllowImportRules: Symbol(),
  AllowNamespaceRules: Symbol(),
  RegularRules: Symbol(),
  KeyframeRules: Symbol(),
  FontFeatureRules: Symbol(),
  TryRules: Symbol(),
  NoRules: Symbol(),
  NestedGroupRules: Symbol()
}
const BlockType = {
  kNotBlock: Symbol(),
  kBlockStart: Symbol(),
  kBlockEnd: Symbol()
}
const CSSAtRuleID = {
  CSSAtRuleInvalid: Symbol(),
  CSSAtRuleViewTransitions: Symbol(),
  CSSAtRuleCharset: Symbol(),
  CSSAtRuleFontFace: Symbol(),
  CSSAtRuleFontPaletteValues: Symbol(),
  CSSAtRuleImport: Symbol(),
  CSSAtRuleKeyframes: Symbol(),
  CSSAtRuleLayer: Symbol(),
  CSSAtRuleMedia: Symbol(),
  CSSAtRuleNamespace: Symbol(),
  CSSAtRulePage: Symbol(),
  CSSAtRulePositionFallback: Symbol(),
  CSSAtRuleProperty: Symbol(),
  CSSAtRuleContainer: Symbol(),
  CSSAtRuleCounterStyle: Symbol(),
  CSSAtRuleScope: Symbol(),
  CSSAtRuleStartingStyle: Symbol(),
  CSSAtRuleSupports: Symbol(),
  CSSAtRuleTry: Symbol(),
  CSSAtRuleWebkitKeyframes: Symbol(),
  // Font-feature-values related at-rule ids below:
  CSSAtRuleAnnotation: Symbol(),
  CSSAtRuleCharacterVariant: Symbol(),
  CSSAtRuleFontFeatureValues: Symbol(),
  CSSAtRuleOrnaments: Symbol(),
  CSSAtRuleStylistic: Symbol(),
  CSSAtRuleStyleset: Symbol(),
  CSSAtRuleSwash: Symbol()
}
const CSSAtRuleIDMap = {
  __proto__: null,
  'view-transitions': CSSAtRuleID.CSSAtRuleViewTransitions,
  charset: CSSAtRuleID.CSSAtRuleCharset,
  'font-face': CSSAtRuleID.CSSAtRuleFontFace,
  'font-palette-values': CSSAtRuleID.CSSAtRuleFontPaletteValues,
  'font-feature-values': CSSAtRuleID.CSSAtRuleFontFeatureValues,
  stylistic: CSSAtRuleID.CSSAtRuleStylistic,
  styleset: CSSAtRuleID.CSSAtRuleStyleset,
  'character-variant': CSSAtRuleID.CSSAtRuleCharacterVariant,
  swash: CSSAtRuleID.CSSAtRuleSwash,
  ornaments: CSSAtRuleID.CSSAtRuleOrnaments,
  annotation: CSSAtRuleID.CSSAtRuleAnnotation,
  import: CSSAtRuleID.CSSAtRuleImport,
  keyframes: CSSAtRuleID.CSSAtRuleKeyframes,
  layer: CSSAtRuleID.CSSAtRuleLayer,
  media: CSSAtRuleID.CSSAtRuleMedia,
  namespace: CSSAtRuleID.CSSAtRuleNamespace,
  page: CSSAtRuleID.CSSAtRulePage,
  'position-fallback': CSSAtRuleID.CSSAtRulePositionFallback,
  property: CSSAtRuleID.CSSAtRuleProperty,
  container: CSSAtRuleID.CSSAtRuleContainer,
  'counter-style': CSSAtRuleID.CSSAtRuleCounterStyle,
  scope: CSSAtRuleID.CSSAtRuleScope,
  supports: CSSAtRuleID.CSSAtRuleSupports,
  try: CSSAtRuleID.CSSAtRuleTry,
  'starting-style': CSSAtRuleID.CSSAtRuleStartingStyle,
  '-webkit-keyframes': CSSAtRuleID.CSSAtRuleWebkitKeyframes,
  DEFAULT: CSSAtRuleID.CSSAtRuleInvalid
}
/** 文件结束符号 */
const EDN_FILE = String.fromCodePoint(0)
const BACKSLASH = String.fromCodePoint(92)
const EMPTY_STRING = String()
function IsASCII(c: string) {
  return c <= ''
}
function IsASCIIAlpha(c: string) {
  return ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z')
}
function IsASCIIDigit(c: string) {
  return '0' <= c && c <= '9'
}
function IsASCIIAlphanumeric(c: string) {
  return IsASCIIDigit(c) || IsASCIIAlpha(c)
}
function IsASCIIHexDigit(c: string) {
  return IsASCIIDigit(c) || ('a' <= c && c <= 'f') || ('A' <= c && c <= 'F')
}
function IsASCIILower(c: string) {
  return 'a' <= c && c <= 'z'
}
function IsASCIIPrintable(c: string) {
  return c <= '~' && c >= ' '
}
function IsNameStartCodePoint(c: string) {
  return IsASCIIAlpha(c) || c == '_' || !IsASCII(c)
}
function IsNameCodePoint(c: string) {
  return IsNameStartCodePoint(c) || IsASCIIDigit(c) || c == '-'
}
function TwoCharsAreValidEscape(first: string, second: string) {
  return first == BACKSLASH && !IsCSSNewLine(second)
}
const CSSNewLineCollection = new Set(`\r\n\f`)
function IsCSSNewLine(c: string) {
  return CSSNewLineCollection.has(c)
}
const HTMLSpaceCollection = new Set(` \n\t\r\f`)
function IsHTMLSpace(c: string) {
  return HTMLSpaceCollection.has(c)
}
interface CSSParserToken {
  token: symbol
  start: number
  end: number
}
function CSSParserToken(token: symbol, start: number, end: number): CSSParserToken {
  return {start, end, token}
}
class CSSParser {
  static parser(string: string) {
    return new CSSParser().ConsumeRuleList(new CSSParserTokenStream(new CSSTokenizer(string)), RuleListType.TopLevelRuleList, CSSNestingType.None, null)
  }
  context = new CSSParserContext()
  style_sheet = new StyleSheetContents()
  ConsumeRuleList(stream: CSSParserTokenStream, rule_list_type: symbol, nesting_type: symbol, parent_rule_for_nesting: CSSStyleRule) {
    let allowed_rules = AllowedRulesType.RegularRules
    switch (rule_list_type) {
      case RuleListType.TopLevelRuleList:
        allowed_rules = AllowedRulesType.AllowCharsetRules
        break
      case RuleListType.RegularRuleList:
        allowed_rules = AllowedRulesType.RegularRules
        break
      case RuleListType.KeyframesRuleList:
        allowed_rules = AllowedRulesType.KeyframeRules
        break
      case RuleListType.FontFeatureRuleList:
        allowed_rules = AllowedRulesType.FontFeatureRules
        break
      case RuleListType.PositionFallbackRuleList:
        allowed_rules = AllowedRulesType.TryRules
    }
    while (!stream.AtEnd()) {
      const offset = stream.offset
      /** @type {StyleRuleBase} */
      let rule = null
      switch (stream.UncheckedPeek().token) {
        case CSSParserTokenType.WhitespaceToken:
          stream.UncheckedConsume()
          continue
        case CSSParserTokenType.AtKeywordToken:
          rule = this.ConsumeAtRule(stream, allowed_rules, nesting_type, parent_rule_for_nesting)
          break
        case CSSParserTokenType.CDOToken:
        case CSSParserTokenType.CDCToken:
          if (rule_list_type == RuleListType.TopLevelRuleList) {
            stream.UncheckedConsume()
            continue
          }
        // [[fallthrough]];
        default:
          rule = ConsumeQualifiedRule(stream, allowed_rules, nesting_type, parent_rule_for_nesting)
      }
      if (rule) {
        allowed_rules = ComputeNewAllowedRules(allowed_rules, rule)
        callback(rule, offset)
      }
    }
    return this
  }
  ConsumeAtRule(stream: CSSParserTokenStream, allowed_rules: symbol, nesting_type: symbol, parent_rule_for_nesting: CSSStyleRule) {
    const name_token = stream.ConsumeIncludingWhitespace()
    const name = stream.tokenizer.input.string.slice(name_token.start, name_token.end)
    const id: symbol = CSSAtRuleIDMap[name] || CSSAtRuleIDMap.DEFAULT
    return this.ConsumeAtRuleContents(id, stream)
  }
  ConsumeAtRuleContents(id, stream) {
    return this.ConsumeErroneousAtRule(stream, id)
  }
  ConsumeErroneousAtRule(stream,id) {
// Consume the prelude and block if present.
ConsumeAtRulePrelude(stream);
if (!stream.AtEnd()) {
if (stream.UncheckedPeek().GetType() == kLeftBraceToken) {
CSSParserTokenStream::BlockGuard guard(stream);
} else {
stream.UncheckedConsume();  // kSemicolonToken
}
}
}
ConsumeAtRulePrelude( stream) {
  return stream.ConsumeUntilPeekedTypeIs<kLeftBraceToken, kSemicolonToken>();
}
}
class CSSParserContext {}
class StyleSheetContents {
  ParserAppendRule() {}
}
class CSSTokenizerInputStream {
  #string = String()
  #offset = 0
  constructor(string: string) {
    this.#string = string
  }
  get string() {
    return this.#string
  }
  Advance(offset = 1) {
    this.#offset += offset
  }
  PushBack() {
    --this.#offset
  }
  get length() {
    return this.#string.length
  }
  get offset() {
    return Math.min(this.#offset, this.length)
  }
  get #char() {
    return this.#string[this.#offset]
  }
  NextInputChar() {
    if (this.#offset >= this.length) return EDN_FILE
    return this.#char
  }
  AdvanceUntilNonWhitespace() {
    while (this.#offset < this.length && IsHTMLSpace(this.#char)) ++this.#offset
  }
  Peek() {
    return this.#string.slice(this.#offset)
  }
  PeekWithoutReplacement(lookahead_offset = 0) {
    if (this.#offset + lookahead_offset >= this.length) return EDN_FILE
    return this.#string[this.#offset + lookahead_offset]
  }
  SkipWhilePredicate(offset: number, predicate: Function) {
    while (this.#offset + offset < this.length && predicate(this.#char)) offset++
    return offset
  }
  ConsumeSingleWhitespaceIfNext() {
    const next = this.PeekWithoutReplacement(0)
    if (next == '\r' && this.PeekWithoutReplacement(1) == '\n') {
      this.Advance(2)
    } else if (IsHTMLSpace(next)) {
      this.Advance()
    }
  }
  NextCharsAreIdentifier(first: string) {
    const second = this.PeekWithoutReplacement()
    if (IsNameStartCodePoint(first) || TwoCharsAreValidEscape(first, second)) {
      return true
    }
    if (first == '-') {
      return IsNameStartCodePoint(second) || second == '-' || TwoCharsAreValidEscape(second, this.PeekWithoutReplacement(1))
    }
    return false
  }
  ConsumeName() {
    let result = EMPTY_STRING
    while (true) {
      const c = this.NextInputChar()
      this.Advance()
      if (IsNameCodePoint(c)) {
        result += c
        continue
      }
      if (TwoCharsAreValidEscape(c, this.PeekWithoutReplacement())) {
        result += this.ConsumeEscape()
        continue
      }
      this.PushBack()
      return result
    }
  }
  ConsumeEscape() {
    let c = this.NextInputChar()
    this.Advance()
    if (IsASCIIHexDigit(c)) {
      let consumed_hex_digits = 1
      let hex_chars = c
      while (consumed_hex_digits < 6 && IsASCIIHexDigit(this.PeekWithoutReplacement())) {
        c = this.NextInputChar()
        this.Advance()
        hex_chars += c
        consumed_hex_digits++
      }
      this.ConsumeSingleWhitespaceIfNext()
    }
    return c
  }
}
class CSSTokenizer {
  #input: CSSTokenizerInputStream
  #prev_offset = 0
  #token_count = 0
  #block_stack: symbol[] = []
  constructor(string: string) {
    this.#input = new CSSTokenizerInputStream(string)
  }
  get input() {
    return this.#input
  }
  get offset() {
    return this.#input.offset
  }
  Consume() {
    const current = this.#input.NextInputChar()
    this.#input.Advance()
    return current
  }
  Reconsume() {
    this.#input.PushBack()
  }
  NextToken() {
    this.#prev_offset = this.#input.offset
    const c = this.Consume()
    ++this.#token_count
    switch (c) {
      case EDN_FILE:
        return CSSParserToken(CSSParserTokenType.EOFToken, this.#prev_offset, this.#input.offset)
      case '\t':
      case '\n':
      case '\f':
      case '\r':
      case ' ':
        return this.WhiteSpace()
      case "'":
      case '"':
        return this.StringStart(c)
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return this.AsciiDigit()
      case '(':
        return CSSParserToken(CSSParserTokenType.LeftParenthesisToken, this.#prev_offset, this.#input.offset)
      case ')':
        return CSSParserToken(CSSParserTokenType.RightParenthesisToken, this.#prev_offset, this.#input.offset)
      case '[':
        return CSSParserToken(CSSParserTokenType.LeftBracketToken, this.#prev_offset, this.#input.offset)
      case ']':
        return CSSParserToken(CSSParserTokenType.RightBracketToken, this.#prev_offset, this.#input.offset)
      case '{':
        return CSSParserToken(CSSParserTokenType.LeftBraceToken, this.#prev_offset, this.#input.offset)
      case '}':
        return CSSParserToken(CSSParserTokenType.RightBraceToken, this.#prev_offset, this.#input.offset)
      case '+':
      case '.':
        return this.PlusOrFullStop(c)
      case '-':
        return this.HyphenMinus(c)
      case '*':
        return Asterisk(c)
      case '<':
        return LessThan(c)
      case ',':
        return Comma(c)
      case '/':
        if (ConsumeIfNext('*')) {
          ConsumeUntilCommentEndFound()
          return CSSParserToken(kCommentToken)
        }
        return CSSParserToken(kDelimiterToken, c)
      case BACKSLASH:
        return ReverseSolidus(c)
      case ':':
        return CSSParserToken(CSSParserTokenType.ColonToken, this.#prev_offset, this.#input.offset)
      case ';':
        return SemiColon(c)
      case '#':
        return Hash(c)
      case '^':
        return CircumflexAccent(c)
      case '$':
        return DollarSign(c)
      case '|':
        return VerticalLine(c)
      case '~':
        return Tilde(c)
      case '@':
        return CommercialAt(c)
      case 'u':
      case 'U':
        return LetterU(c)
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 11:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 26:
      case 27:
      case 28:
      case 29:
      case 30:
      case 31:
      case '!':
      case '%':
      case '&':
      case '=':
      case '>':
      case '?':
      case '`':
      case 127:
        return CSSParserToken(kDelimiterToken, c)
      default:
        return NameStart(c)
    }
  }
  TokenizeSingle() {
    return this.NextToken()
  }
  TokenizeSingleWithComments() {
    return this.NextToken()
  }
  WhiteSpace() {
    this.#input.AdvanceUntilNonWhitespace()
    return CSSParserToken(CSSParserTokenType.WhitespaceToken, this.#prev_offset, this.#input.offset)
  }
  StringStart(c: string) {
    return this.ConsumeStringTokenUntil(c)
  }
  ConsumeStringTokenUntil(ending_code_point: string) {
    for (let size = 0; ; size++) {
      const c = this.#input.PeekWithoutReplacement(size)
      if (c == ending_code_point) {
        this.#input.Advance(size + 1)
        return CSSParserToken(CSSParserTokenType.StringToken, this.#prev_offset, this.#input.offset)
      }
      // FIXME:
      // if (IsCSSNewLine(c)) {
      //   this.#input.Advance(size)
      //   return CSSParserToken(CSSParserTokenType.kBadStringToken)
      // }
    }
  }
  ConsumeSingleWhitespaceIfNext() {
    this.#input.ConsumeSingleWhitespaceIfNext()
  }
  AsciiDigit() {
    this.Reconsume()
    return this.ConsumeNumericToken()
  }
  ConsumeNumericToken() {
    const token = this.ConsumeNumber()
    if (this.NextCharsAreIdentifier()) {
      const prev_offset = this.#input.offset
      this.ConsumeName()
      return [token, CSSParserToken(CSSParserTokenType.UnitToken, prev_offset, this.#input.offset)]
    } else if (this.ConsumeIfNext('%')) {
      return [token, CSSParserToken(CSSParserTokenType.UnitToken, this.#input.offset - 1, this.#input.offset)]
    }
    return token
  }
  NextCharsAreIdentifier() {
    const first = this.Consume()
    const are_identifier = this.#input.NextCharsAreIdentifier(first)
    this.Reconsume()
    return are_identifier
  }
  ConsumeIfNext(c: string) {
    if (this.#input.PeekWithoutReplacement(0) == c) {
      this.#input.Advance()
      return true
    }
    return false
  }
  ConsumeNumber() {
    let number_length = 0
    let next = this.#input.PeekWithoutReplacement(0)
    if (next == '+') {
      ++number_length
    } else if (next == '-') {
      ++number_length
    }
    number_length = this.#input.SkipWhilePredicate(number_length, IsASCIIDigit)
    next = this.#input.PeekWithoutReplacement(number_length)
    if (next == '.' && IsASCIIDigit(this.#input.PeekWithoutReplacement(number_length + 1))) {
      number_length = this.#input.SkipWhilePredicate(number_length + 2, IsASCIIDigit)
      next = this.#input.PeekWithoutReplacement(number_length)
    }

    if (next == 'E' || next == 'e') {
      next = this.#input.PeekWithoutReplacement(number_length + 1)
      if (IsASCIIDigit(next)) {
        number_length = this.#input.SkipWhilePredicate(number_length + 1, IsASCIIDigit)
      } else if ((next == '+' || next == '-') && IsASCIIDigit(this.#input.PeekWithoutReplacement(number_length + 2))) {
        number_length = this.#input.SkipWhilePredicate(number_length + 3, IsASCIIDigit)
      }
    }
    this.#input.Advance(number_length)
    return CSSParserToken(CSSParserTokenType.NumberToken, this.#prev_offset, this.#input.offset)
  }
  ConsumeName() {
    const buffer = this.#input.Peek()
    let size = 0
    // Slow path for non-UTF-8 and tokens near the end of the string.
    for (; size < buffer.length; ++size) {
      const c = buffer[size]
      if (!IsNameCodePoint(c)) {
        // End of this token, but not end of the string.
        if (c == EDN_FILE || c == BACKSLASH) {
          // We need escape-aware parsing.
          return this.#input.ConsumeName()
        } else {
          // Names without escapes get handled without allocations
          this.#input.Advance(size)
          return buffer.slice(0, size)
        }
      }
    }
    // The entire rest of the string is a name.
    this.#input.Advance(size)
    return buffer
  }
  PlusOrFullStop(c: string) {
    if (this.NextCharsAreNumber(c)) {
      this.Reconsume()
      return this.ConsumeNumericToken()
    }
    return CSSParserToken(CSSParserTokenType.DelimiterToken, this.#prev_offset, this.#input.offset)
  }
  NextCharsAreNumber(first: string) {
    const second = this.#input.PeekWithoutReplacement(0)
    if (IsASCIIDigit(first)) {
      return true
    }
    if (first == '+' || first == '-') {
      return IsASCIIDigit(second) || (second == '.' && IsASCIIDigit(this.#input.PeekWithoutReplacement(1)))
    }
    if (first == '.') {
      return IsASCIIDigit(second)
    }
    return false
  }
  HyphenMinus(c: string) {
    if (this.NextCharsAreNumber(c)) {
      this.Reconsume()
      return this.ConsumeNumericToken()
    }
    if (this.#input.PeekWithoutReplacement() == '-' && this.#input.PeekWithoutReplacement(1) == '>') {
      this.#input.Advance(2)
      return CSSParserToken(CSSParserTokenType.CDCToken, this.#prev_offset, this.#input.offset)
    }
    if (this.NextCharsAreIdentifier()) {
      this.Reconsume()
      return this.ConsumeIdentLikeToken()
    }
    return CSSParserToken(CSSParserTokenType.DelimiterToken, this.#prev_offset, this.#input.offset)
  }
  ConsumeIdentLikeToken() {
    const name = this.ConsumeName()
    if (this.ConsumeIfNext('(')) {
      if (name === 'url') {
        // The spec is slightly different so as to avoid dropping whitespace
        // tokens, but they wouldn't be used and this is easier.
        this.#input.AdvanceUntilNonWhitespace()
        const next = this.#input.PeekWithoutReplacement()
        if (next != '"' && next != "'") {
          // TODO:
          return this.ConsumeUrlToken()
        }
      }
      CSSParserToken(CSSParserTokenType.LeftParenthesisToken, this.#prev_offset)
      return BlockStart(kLeftParenthesisToken, kFunctionToken, name)
    }
    return CSSParserToken(CSSParserTokenType.IdentToken, name)
  }
}
class CSSParserTokenStream {
  #tokenizer: CSSTokenizer
  #has_look_ahead = false
  #offset = 0
  #next: CSSParserToken
  #boundaries = null
  constructor(tokenizer: CSSTokenizer) {
    this.#tokenizer = tokenizer
  }
  get tokenizer() {
    return this.#tokenizer
  }
  get offset() {
    return this.#offset
  }
  Peek() {
    this.EnsureLookAhead()
    return this.#next
  }
  EnsureLookAhead() {
    if (!this.#has_look_ahead) {
      this.#has_look_ahead = true
      this.#next = this.#tokenizer.TokenizeSingle()
    }
  }
  AtEnd() {
    this.EnsureLookAhead()
    return this.UncheckedAtEnd()
  }
  UncheckedAtEnd() {
    return true
    // TODO:
    // return (boundaries_ & FlagForTokenType(next_.GetType())) ||
    //        next_.GetBlockType() == CSSParserToken::kBlockEnd;
  }
  UncheckedPeek() {
    return this.#next
  }
  UncheckedConsume() {
    this.#has_look_ahead = false
    this.#offset = this.#tokenizer.offset
    return this.#next
  }
  Consume() {
    this.EnsureLookAhead()
    return this.UncheckedConsume()
  }
  ConsumeWhitespace() {
    while (this.Peek().token == CSSParserTokenType.WhitespaceToken) {
      this.UncheckedConsume()
    }
  }
  ConsumeIncludingWhitespace() {
    const result = this.Consume()
    this.ConsumeWhitespace()
    return result
  }
}

CSSParser.parser(`:root{color:red}`)

class Parser {
  string = EMPTY_STRING
  offset = 0
  parser(string: string) {
    this.string = string
  }
}

// double total_price = price_config.author_price * 100ull * playlet_investment.playlet_chapters * price_config.discount_rate  / 10000ull
// double unit_price = total_price / playlet_investment.playlet_marketing_chapters
