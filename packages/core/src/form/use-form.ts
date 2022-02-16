import { Events } from "@tarojs/taro"
import * as _ from "lodash"
import { useEffect, useMemo } from "react"
import { getLogger } from "../utils/logger"
import { useToRef } from "../utils/state"
import { FormItemInstance, FormValidError } from "./form.shared"
import { validateAll } from "./form.validate"

const { warn } = getLogger("useForm")

const containerForms = new Map<string, FormAttributes>()
const containerFormRefs = new Map<string, number>()

function toMapValueArray<T>(map?: Map<string, T>): T[] {
  const array: T[] = []
  map?.forEach((value) => array.push(value))
  return array
}

function getAttributiveForm(formName: string) {
  return containerForms.get(formName)
}

class FormAttributes {
  #fields = new Map<string, FormItemInstance>()
  #defaultValues: any = {}
  #values: any = {}
  #errors: Record<string, FormValidError> = {}
  #events = new Events()

  get fields() {
    return this.#fields
  }

  get defaultValues() {
    return this.#defaultValues
  }

  set defaultValues(defaultValues: any) {
    this.#defaultValues = defaultValues
  }

  get values() {
    return this.#values
  }

  set values(value: any) {
    this.#values = value
  }

  get errors() {
    return this.#errors
  }

  set errors(errors: Record<string, FormValidError>) {
    this.#errors = errors
  }

  addEventListener(event: string, listener: (...args: any[]) => void) {
    this.#events?.on(event, listener)
  }

  removeEventListener(event: string, listener: (...args: any[]) => void) {
    this.#events?.off(event, listener)
  }

  emitEvent(event: string, ...args: any[]) {
    this.#events.trigger(event, ...args)
  }

  findFields(predicate: (field: FormItemInstance) => boolean) {
    const fields = toMapValueArray(this.fields)
    return _.filter<FormItemInstance>(fields, predicate) as FormItemInstance[]
  }

  addField(name: string, field: FormItemInstance) {
    this.#fields.set(name, field)
  }

  removeField(name: string) {
    this.#fields.delete(name)
    _.unset(this.#values, name)
  }

  hasField(name: string) {
    return this.#fields.has(name)
  }

  getErrors(nameNames?: string | string[]): Record<string, FormValidError> {
    const names = _.isUndefined(nameNames) ? [] : _.isArray(nameNames) ? nameNames : [nameNames]
    const { errors } = this

    if (_.isEmpty(names)) {
      return errors
    }

    return _.reduce<string, Record<string, FormValidError>>(
      names,
      (nameErrors, name) => {
        const error = _.get(errors, name)
        if (error) {
          nameErrors[name] = error
        }
        return nameErrors
      },
      {},
    )
  }

  setErrors(newErrors: FormValidError[], emitChange: boolean = true) {
    const { errors } = this
    _.forEach(newErrors, (error) => {
      const { name } = error
      if (name) {
        const oldError = _.get(errors, name)
        if (!_.isEqual(oldError?.errors, error?.errors)) {
          _.set(errors, name, error)
          if (emitChange) {
            this.emitEvent(`fields.${name}.error.change`, errors)
          }
        }
      }
    })
  }

  resetErrors(errors: Record<string, FormValidError> = {}) {
    this.errors = errors
  }

  getValues<V>(nameNames?: string | string[]) {
    const names = _.isUndefined(nameNames) ? [] : _.isArray(nameNames) ? nameNames : [nameNames]

    const values: any = {}

    if (_.isEmpty(names)) {
      for (const field of this.fields.values()) {
        if (field.name) {
          values[field.name] = _.get(this.values, field.name)
        }
      }
      return values
    }

    for (let attr of names) {
      _.set(values, attr, _.get(this.values, attr))
    }

    return values as V
  }

  setValues(newValues: any, emitChange: boolean = true) {
    let changed = false
    const { values } = this
    _.forEach(newValues, (value, name) => {
      const oldValue = _.get(values, name)
      if (oldValue !== value) {
        _.set(values, name, value)
        if (emitChange) {
          this.emitEvent(`fields.${name}.value.change`, value)
          changed = true
        }
      }
    })
    if (changed) {
      this.emitEvent("change", newValues, values)
    }
  }

  resetValues(values: any = {}) {
    this.values = values
  }

  release() {
    this.#events?.off()
  }
}

function validateForm<V>(formName: string, name?: string | string[]) {
  return new Promise<V>((resolve, reject) => {
    const form = getAttributiveForm(formName)
    Promise.resolve<string[]>(_.isUndefined(name) ? [] : _.isArray(name) ? name : [name])
      .then((names: string[]) =>
        form?.findFields((field) => _.isEmpty(names) || _.includes(names, field.name)),
      )
      .then((items) => items && validateAll(items))
      .then<V>(() => form?.getValues(name) as V)
      .then(resolve)
      .catch((errors: FormValidError[]) => {
        form?.resetErrors()
        form?.setErrors(errors)
        reject(errors)
      })
  })
}

interface Form {
  readonly name: string

  addEventListener(event: string | symbol, listener: (...args: any[]) => void): void

  removeEventListener(event: string | symbol, listener: (...args: any[]) => void): void

  linkField(name?: string, field?: FormItemInstance): void

  unlinkField(name?: string): void

  getFields(): FormItemInstance[]

  findFields(predicate: (field: FormItemInstance) => boolean): FormItemInstance[] | undefined

  setErrors(errors: FormValidError[]): void

  resetErrors(): void

  getErrors(name?: string | string[]): FormValidError[]

  setDefaultValues(values: any): void

  setValues(values: any): void

  resetValues(values: any): void

  getValues<V>(name?: string | string[]): V

  validate<V>(name?: string | string[]): Promise<V>

  reset(): void

  /**
   * @deprecated
   */
  setFieldsValue(values: any): void

  /**
   * @deprecated
   */
  getFieldsValue<V>(name?: string | string[]): V

  /**
   * @deprecated
   */
  validateFields<V>(name?: string | string[]): Promise<V>
}

function defineForm(formName: string) {
  return class DelegatingForm implements Form {
    get name() {
      return formName
    }

    addEventListener(event: string, listener: (...args: any[]) => void) {
      getAttributiveForm(formName)?.addEventListener(event, listener)
    }

    removeEventListener(event: string, listener: (...args: any[]) => void) {
      getAttributiveForm(formName)?.removeEventListener(event, listener)
    }

    linkField(name?: string, field?: FormItemInstance) {
      if (name && field) {
        getAttributiveForm(formName)?.addField(name, field)
      }
    }

    hasField(name?: string) {
      return name && getAttributiveForm(formName)?.hasField(name)
    }

    unlinkField(name?: string) {
      if (name) {
        getAttributiveForm(formName)?.removeField(name)
      }
    }

    getFields() {
      return toMapValueArray(getAttributiveForm(formName)?.fields)
    }

    findFields(predicate: (field: FormItemInstance) => boolean) {
      return getAttributiveForm(formName)?.findFields(predicate)
    }

    setErrors(errors: FormValidError[]) {
      getAttributiveForm(formName)?.setErrors(errors)
    }

    resetErrors() {
      getAttributiveForm(formName)?.resetErrors()
    }

    getErrors(name?: string | string[]): FormValidError[] {
      const form = getAttributiveForm(formName)
      return _.reduce<FormValidError, FormValidError[]>(
        form?.getErrors(name) as any,
        (errors, error) => {
          errors.push(error)
          return errors
        },
        [],
      )
    }

    setDefaultValues(defaultValues: any): void {
      const form = getAttributiveForm(formName)
      if (form) {
        form.defaultValues = defaultValues
        form?.setValues(defaultValues)
      }
    }

    setValues(newValues: any) {
      getAttributiveForm(formName)?.setValues(newValues)
    }

    resetValues(values: any) {}

    getValues<V>(name?: string | string[]): V {
      return getAttributiveForm(formName)?.getValues<V>(name)
    }

    validate<V>(name?: string | string[]): Promise<V> {
      return validateForm<V>(formName, name)
    }

    reset() {
      const form = getAttributiveForm(formName)
      const oldValues = _.cloneDeep(form?.values)
      const newValues = _.cloneDeep(form?.defaultValues)
      form?.resetValues(newValues)
      form?.resetErrors()
      form?.emitEvent("change", newValues, oldValues)
      form?.emitEvent("reset")
    }

    setFieldsValue(newValues: any, emitChange?: boolean) {
      warn("Please use setValues instead of setFieldsValue")
      getAttributiveForm(formName)?.setValues(newValues)
    }

    getFieldsValue<V>(name?: string | string[]) {
      warn("Please use getValues instead of getFieldsValue")
      return getAttributiveForm(formName)?.getValues<V>(name)
    }

    validateFields<V>(name?: string | string[]) {
      warn("Please use validate instead of validateFields")
      return validateForm<V>(formName, name)
    }
  }
}

class FormContainer {
  private static increaseFormRef(name: string) {
    const count = containerFormRefs.get(name)
    containerFormRefs.set(name, (count ?? 0) + 1)
  }

  private static decreaseFormRef(name: string) {
    const count = containerFormRefs.get(name)
    containerFormRefs.set(name, (count ?? 0) - 1)
  }

  private static hasFormRef(name: string) {
    const count = containerFormRefs.get(name)
    return !_.isUndefined(count) && count > 0
  }

  getForms() {
    return _.toArray(containerForms.values())
  }

  getForm(name: string) {
    if (!containerForms.has(name)) {
      return undefined
    }
    FormContainer.increaseFormRef(name)
    const DelegatingForm = defineForm(name)
    return new DelegatingForm()
  }

  hasForm(name: string) {
    return containerForms.has(name)
  }

  newForm(name: string) {
    if (_.isEmpty(name)) {
      return
    }
    containerForms.set(name, new FormAttributes())
  }

  releaseForm(name: string) {
    if (_.isEmpty(name)) {
      return
    }
    FormContainer.decreaseFormRef(name)
    if (!FormContainer.hasFormRef(name)) {
      containerForms.get(name)?.release()
      containerForms.delete(name)
    }
  }
}

const formContainer = new FormContainer()

interface UseFormOptions<V> {
  defaultValues?: V
  values?: V
}

export default function useForm<V = any>(name: string = "", options: UseFormOptions<V> = {}): Form {
  const { defaultValues, values } = options
  const nameRef = useToRef(name)
  const hasForm = formContainer.hasForm(name)
  const hasFormRef = useToRef(hasForm)

  if (!hasForm && !_.isEmpty(name)) {
    formContainer.newForm(name)
  }

  useEffect(
    () => {
      if (hasFormRef.current) {
        formContainer.getForm(nameRef.current)?.setDefaultValues(defaultValues)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    if (hasFormRef.current) {
      formContainer.getForm(nameRef.current)?.setValues(values)
    }
  }, [hasFormRef, nameRef, values])

  useEffect(() => () => formContainer.releaseForm(name), [name])

  return useMemo<Form>(() => formContainer.getForm(name) as Form, [name])
}
