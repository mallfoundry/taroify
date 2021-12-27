import * as _ from "lodash"
import { FieldInstance, FieldValidError } from "../field"

export function validateAll(fields: FieldInstance[]) {
  return new Promise<void>((resolve, reject) => {
    Promise.all(
      fields.map((field) =>
        field.validate().then(
          () => [] as FieldValidError[],
          (reason) => [reason] as FieldValidError[],
        ),
      ),
    )
      .then((errors) => _.flatMap<FieldValidError[], FieldValidError>(errors, (error) => error))
      .then((errors) => _.filter<FieldValidError>(errors, (error) => !_.isEmpty(error.errors)))
      .then((errors) => {
        if (!_.isEmpty(errors)) {
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
