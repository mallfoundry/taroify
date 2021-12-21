import * as _ from "lodash"
import { ReactNode } from "react"
import { isPromise } from "../utils/promisify"
import { FieldRule } from "./field.shared"

export interface FieldValidResult {
  invalid: boolean
  message?: ReactNode
}

function isEmptyValue(value: unknown) {
  if (Array.isArray(value)) {
    return !value.length
  }
  if (value === 0) {
    return false
  }
  return !value
}

function getRuleMessage(value: unknown, rule: FieldRule) {
  const { message } = rule

  if (_.isFunction(message)) {
    return message(value, rule)
  }
  return message || ""
}

function getSyncRule(value: unknown, rule: FieldRule) {
  if (rule.required && isEmptyValue(value)) {
    return Promise.resolve({
      invalid: true,
      message: getRuleMessage(value, rule),
    })
  }

  if (rule.pattern && !rule.pattern.test(String(value))) {
    return Promise.resolve({
      invalid: true,
      message: getRuleMessage(value, rule),
    })
  }
}

function getValidatorRule(value: unknown, rule: FieldRule) {
  return new Promise((resolve) => {
    const result = rule.validator?.(value, rule)

    if (isPromise(result)) {
      return result.then(resolve)
    }

    resolve(result)
  }).then((result) => {
    if (result && typeof result === "string") {
      return {
        invalid: true,
        message: result,
      }
    } else if (result === false) {
      return {
        invalid: true,
        message: getRuleMessage(value, rule),
      }
    }

    return {
      invalid: false,
    }
  })
}

function validateRule(value: unknown, rule: FieldRule): Promise<FieldValidResult> {
  return getSyncRule(value, rule) ?? getValidatorRule(value, rule)
}

export function validateRules(value: unknown, rules: FieldRule[]): Promise<FieldValidResult> {
  return rules.reduce(
    (promise, rule) =>
      promise.then((stepResult) => {
        if (stepResult.invalid) {
          return stepResult
        }

        if (rule.formatter) {
          value = rule.formatter(value, rule)
        }

        return validateRule(value, rule)
      }),
    Promise.resolve({ invalid: false }),
  )
}
