import * as _ from "lodash"
import { FormItemInstance, FormValidError } from "./form.shared"

export function validateAll(fields: FormItemInstance[]) {
  return new Promise<void>((resolve, reject) => {
    Promise.all(
      fields.map((field) =>
        field.validate().then(
          () => [] as FormValidError[],
          (reason) => [reason] as FormValidError[],
        ),
      ),
    )
      .then((errors) => _.flatMap<FormValidError[], FormValidError>(errors, (error) => error))
      .then((errors) => _.filter<FormValidError>(errors, (error) => !_.isEmpty(error.errors)))
      .then((errors) => {
        if (!_.isEmpty(errors)) {
          reject(errors)
        } else {
          resolve()
        }
      })
  })
}

export function validateSequence(fields: FormItemInstance[]): Promise<void> {
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
        Promise.resolve<FormValidError[]>([]),
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
