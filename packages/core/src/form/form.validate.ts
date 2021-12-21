import * as _ from "lodash"
import { FieldInstance } from "../field"
import { FieldValidError } from "../field/field.shared"

export function validateAll(fields: FieldInstance[]) {
  return new Promise<void>((resolve, reject) => {
    Promise.all(
      fields.map((field) =>
        field.validate().then(
          () => [],
          (reason) => [reason],
        ),
      ),
    ).then((errors) => {
      errors = _.flatMap(errors, (error) => error)
      if (errors.length) {
        reject(errors)
      } else {
        resolve()
      }
    })
  })
}

export function validateSequence(fields: FieldInstance[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fields
      .reduce(
        (promise, field) =>
          promise.then((errors) => {
            if (_.isEmpty(errors)) {
              return field.validate().then(
                () => [],
                (error) => [error],
              )
            }
            return errors
          }),
        Promise.resolve<FieldValidError[]>([]),
      )
      .then((errors) => {
        if (_.isEmpty(errors)) {
          resolve()
        } else {
          reject(errors)
        }
      })
  })
}
