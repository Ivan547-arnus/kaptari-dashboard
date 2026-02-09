

import type { Ref } from 'vue'
export type RuleResult = boolean | string
export type RuleFn = (val: unknown) => RuleResult
export type ConditionRef =
  | boolean
  | Ref<boolean>
  | (() => boolean)
  | Ref<unknown>
  | (() => unknown)
export interface IRules {
  is(value: string | number , message?: string | false): RuleFn

  required(message?: string | false): RuleFn
  requiredIf(ref: ConditionRef, message?: string | false): RuleFn
  requiredUnless(ref: ConditionRef, message?: string | false): RuleFn

  minLength(length: number, message?: string | false): RuleFn
  maxLength(length: number, message?: string | false): RuleFn

  minValue(value: number, message?: string | false): RuleFn
  maxValue(value: number, message?: string | false): RuleFn

  between(min: number, max: number, message?: string | false): RuleFn

  alpha(message?: string | false): RuleFn
  alphaNum(message?: string | false): RuleFn
  numeric(message?: string | false): RuleFn
  integer(message?: string | false): RuleFn
  decimal(message?: string | false): RuleFn
  email(message?: string | false): RuleFn
  ipAddress(message?: string | false): RuleFn
  url(message?: string | false): RuleFn

  macAddress(separator?: string, message?: string | false): RuleFn

  or(...args: Array<RuleFn | string>): RuleFn
  and(...args: Array<RuleFn | string>): RuleFn

  not(rule: RuleFn, message?: string | false): RuleFn

  sameAs(locator: unknown, message?: string | false): RuleFn
}
