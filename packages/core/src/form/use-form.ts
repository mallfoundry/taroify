import { Events } from "@tarojs/taro"
import * as _ from "lodash"
import { useEffect, useMemo, useState } from "react"
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
  #inFormListFields = new Map<string, FormItemInstance>()
  #defaultValues: any = {}
  #values: any = {}
  #errors: Record<string, FormValidError> = {}
  #events = new Events()

  get fields() {
    return this.#fields
  }

  get inFormListFields() {
    return this.#inFormListFields
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
    const inFormListFields = toMapValueArray(this.#inFormListFields)
    return _.filter<FormItemInstance>(fields.concat(inFormListFields), predicate) as FormItemInstance[]
  }

  addField(name: string, field: FormItemInstance, inFormList?: boolean) {
    if (inFormList) {
      this.#inFormListFields.set(name, field)
    } else {
      this.#fields.set(name, field)
    }
  }

  removeField(name: string, inFormList?: boolean) {
    if (inFormList) {
      this.#inFormListFields.delete(name)
    } else {
      this.#fields.delete(name)
    }

    // This is no need to delete value, because it'll be filtered by fields when you call getValues
    // Also use key refresh FormItem, which will unmount and then remount, the value will unset when unmounted, it causes an exception

    // _.unset(this.#values, name)
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
    let prevValues
    _.forEach(newValues, (value, name) => {
      const oldValue = _.get(values, name)
      if (oldValue !== value) {
        if (!changed) {
          changed = true
          prevValues = _.cloneDeep(values)
        }
        const copyValue = _.cloneDeep(value)
        _.set(values, name, copyValue)
        if (emitChange) {
          this.emitEvent(`fields.${name}.value.change`, copyValue)
        }
      }
    })
    if (changed) {
      this.emitEvent("shouldUpdate", prevValues, values)
      this.emitEvent("change", newValues, values)
    }
  }

  resetValues(newValues: any = {}) {
    this.values = newValues
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

  linkField(name?: string, field?: FormItemInstance, inFormList?: boolean): void

  unlinkField(name?: string, inFormList?: boolean): void

  hasField(name?: string): boolean

  getFields(): FormItemInstance[]

  findFields(predicate: (field: FormItemInstance) => boolean): FormItemInstance[] | undefined

  setErrors(errors: FormValidError[]): void

  resetErrors(): void

  getErrors(name?: string | string[]): FormValidError[]

  setDefaultValues(values: any, inFormList?: boolean): void

  setValues(values: any, emitChange?: boolean): void

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

  getAttributiveForm(): FormAttributes | undefined
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

    linkField(name?: string, field?: FormItemInstance, inFormList?: boolean) {
      if (name && field) {
        getAttributiveForm(formName)?.addField(name, field, inFormList)
      }
    }

    hasField(name?: string) {
      return !!(name && getAttributiveForm(formName)?.hasField(name))
    }

    unlinkField(name?: string, inFormList?: boolean) {
      if (name) {
        getAttributiveForm(formName)?.removeField(name, inFormList)
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

    setDefaultValues(defaultValues: any, inFormList?: boolean): void {
      const form = getAttributiveForm(formName)
      if (form) {
        const newValues = {}
        _.forEach(defaultValues, (value, name) => {
          if (!inFormList) {
            _.set(form.defaultValues, name, value)
          }
          newValues[name] = _.get(form.values, name) || value
        })
        form?.setValues(newValues)
      }
    }

    setValues(newValues: any, emitChange?: boolean) {
      getAttributiveForm(formName)?.setValues(newValues, emitChange)
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
      const newValues = _.cloneDeep(form?.defaultValues)
      form?.resetValues(newValues)
      form?.resetErrors()
      form?.emitEvent("change", newValues, newValues)
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

    getAttributiveForm() {
      return getAttributiveForm(this.name)
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

  hasForm(name?: string) {
    return name && containerForms.has(name)
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

function useConstant<V = any>(value?: V) {
  const [constant] = useState<V | undefined>(value)
  return constant
}

interface UseFormOptions<V> {
  defaultValues?: V
  values?: V
}

export default function useForm<V = any>(name: string = "", options: UseFormOptions<V> = {}): Form | undefined {
  const { defaultValues, values } = options
  const hasForm = formContainer.hasForm(name)
  const immutableHasForm = useConstant(hasForm)
  const nameRef = useToRef(name)

  if (!hasForm && !_.isEmpty(name)) {
    formContainer.newForm(name)
  }

  useEffect(
    () => {
      //  First time if hasForm is false,
      //  Set the form to defaultValues when defaultValues is value object
      if (!immutableHasForm && _.isPlainObject(defaultValues)) {
        formContainer.getForm(nameRef.current)?.setDefaultValues(defaultValues)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(
    () => {
      //  First time if hasForm is false,
      //  Set the form to values when values is value object
      if (!immutableHasForm && _.isPlainObject(values)) {
        formContainer.getForm(nameRef.current)?.setValues(values)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nameRef, values],
  )

  useEffect(() => () => formContainer.releaseForm(name), [name])

  return useMemo<Form>(() => formContainer.getForm(name) as Form, [name])
}
