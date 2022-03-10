import * as _ from "lodash"
import { ReactNode } from "react"
import { isPromise } from "../utils/promisify"
import { FormRule } from "./form.shared"

function isEmptyValue(value: any) {
  if (Array.isArray(value)) {
    return !value.length
  }
  if (value === 0) {
    return false
  }
  return !value
}

function getRuleMessage(value: any, rule: FormRule) {
  const { message } = rule

  if (_.isFunction(message)) {
    return message(value, rule)
  }
  return message
}

function getSyncRule(value: any, rule: FormRule) {
  if (rule.required && isEmptyValue(value)) {
    return Promise.resolve(getRuleMessage(value, rule))
  }

  if (rule.pattern && !rule.pattern.test(String(value))) {
    return Promise.resolve(getRuleMessage(value, rule))
  }
}

function getValidatorRule(value: any, rule: FormRule) {
  function obtainInvalidMessage(error?: boolean | string | Error) {
    if (_.isBoolean(error) && !error) {
      return getRuleMessage(value, rule)
    }
    if (_.isError(error)) {
      return error.message
    }
    return error
  }

  return new Promise<ReactNode>((resolve) => {
    const promise = rule.validator?.(value, rule)
    if (isPromise(promise)) {
      // Process then, catch to then
      promise.then(obtainInvalidMessage).catch(obtainInvalidMessage).then(resolve)
    } else {
      resolve(obtainInvalidMessage(promise))
    }
  })
}

function validateRule(value: any, rule: FormRule): Promise<ReactNode> {
  return getSyncRule(value, rule) ?? getValidatorRule(value, rule)
}

export function validateRules(value: any, rules: FormRule[]): Promise<ReactNode[]> {
  return rules.reduce(
    (promise, rule) =>
      promise.then((errors) => {
        if (rule.formatter) {
          value = rule.formatter(value, rule)
        }

        return validateRule(value, rule).then((error) => {
          // Push string only,
          // Because error could be true or undefined
          if (_.isString(error)) {
            errors.push(error)
          }
          return errors
        })
      }),
    Promise.resolve<ReactNode[]>([]),
  )
}
