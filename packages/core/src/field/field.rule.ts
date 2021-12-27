import * as _ from "lodash"
import { ReactNode } from "react"
import { isPromise } from "../utils/promisify"
import { FieldRule } from "./field.shared"

function isEmptyValue(value: any) {
  if (Array.isArray(value)) {
    return !value.length
  }
  if (value === 0) {
    return false
  }
  return !value
}

function getRuleMessage(value: any, rule: FieldRule) {
  const { message } = rule

  if (_.isFunction(message)) {
    return message(value, rule)
  }
  return message
}

function getSyncRule(value: any, rule: FieldRule) {
  if (rule.required && isEmptyValue(value)) {
    return Promise.resolve(getRuleMessage(value, rule))
  }

  if (rule.pattern && !rule.pattern.test(String(value))) {
    return Promise.resolve(getRuleMessage(value, rule))
  }
}

function getValidatorRule(value: any, rule: FieldRule) {
  return new Promise<ReactNode>((resolve) => {
    const promise = rule.validator?.(value, rule)
    if (isPromise(promise)) {
      promise
        .then((error) => (_.isBoolean(error) && !error ? getRuleMessage(value, rule) : error))
        .then(resolve)
      return
    }

    if (_.isBoolean(promise) && !promise) {
      resolve(getRuleMessage(value, rule))
      return
    }
    resolve(promise)
  })
}

function validateRule(value: any, rule: FieldRule): Promise<ReactNode> {
  return getSyncRule(value, rule) ?? getValidatorRule(value, rule)
}

export function validateRules(value: any, rules: FieldRule[]): Promise<ReactNode[]> {
  return rules.reduce(
    (promise, rule) =>
      promise.then((errors) => {
        if (rule.formatter) {
          value = rule.formatter(value, rule)
        }

        return validateRule(value, rule).then((error) => {
          if (error) {
            errors.push(error)
          }
          return errors
        })
      }),
    Promise.resolve<ReactNode[]>([]),
  )
}
