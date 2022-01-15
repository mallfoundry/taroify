import { Events } from "@tarojs/taro"
import * as _ from "lodash"
import { useEffect, useMemo } from "react"
import { FormItemInstance } from "./form.shared"
import { validateAll } from "./form.validate"

function toMapValueArray<T>(map: Map<string, T>): T[] {
  const array: T[] = []
  map?.forEach((value) => array.push(value))
  return array
}

const containerForms = new Map<string, FormAttributes>()
const containerFormRefs = new Map<string, number>()

function getAttributiveForm(formName: string) {
  return containerForms.get(formName) as FormAttributes
}

class FormAttributes {
  #fields = new Map<string, FormItemInstance>()
  #fieldsValue: any = {}
  #events = new Events()

  get fields() {
    return this.#fields
  }

  get fieldsValue() {
    return this.#fieldsValue
  }

  set fieldsValue(value: any) {
    this.#fieldsValue = value
  }

  getFieldsValue<V>(nameNames?: string | string[]) {
    const names = _.isUndefined(nameNames) ? [] : _.isArray(nameNames) ? nameNames : [nameNames]

    const values: any = {}

    if (_.isEmpty(names)) {
      for (const field of this.fields.values()) {
        if (field.name) {
          values[field.name] = _.get(this.fieldsValue, field.name)
        }
      }
      return values
    }

    for (let attr of names) {
      _.set(values, attr, _.get(this.fieldsValue, attr))
    }

    return values as V
  }

  findFields(predicate: (field: FormItemInstance) => boolean) {
    const fields = toMapValueArray(this.fields)
    return _.filter<FormItemInstance>(fields, predicate) as FormItemInstance[]
  }

  addField(name: string, field: FormItemInstance) {
    this.#fields.set(name, field)
  }

  hasField(name: string) {
    return this.#fields.has(name)
  }

  removeField(name: string) {
    this.#fields.delete(name)
    _.unset(this.#fieldsValue, name)
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

  release() {
    this.#events?.off()
  }
}

interface Form {
  readonly name: string

  addEventListener(event: string | symbol, listener: (...args: any[]) => void): void

  removeEventListener(event: string | symbol, listener: (...args: any[]) => void): void

  linkField(name?: string, field?: FormItemInstance): void

  unlinkField(name?: string): void

  getFields(): FormItemInstance[]

  findFields(predicate: (field: FormItemInstance) => boolean): FormItemInstance[]

  validateFields<V>(name?: string | string[]): Promise<V>

  setFieldsDefaultValue(values: any): void

  setFieldsValue(values: any): void

  getFieldsValue<V>(name?: string | string[]): V
}

function defineForm(formName: string) {
  return class DelegatingForm {
    get name() {
      return formName
    }

    addEventListener(event: string, listener: (...args: any[]) => void) {
      getAttributiveForm(formName)?.addEventListener(event, listener)
    }

    removeEventListener(event: string, listener: (...args: any[]) => void) {
      getAttributiveForm(formName)?.removeEventListener(event, listener)
    }

    setFieldsDefaultValue(newValues: any) {
      const form = getAttributiveForm(formName)
      if (form) {
        const { fieldsValue } = form
        _.forEach(newValues, (value, name) => _.set(fieldsValue, name, value))
      }
    }

    setFieldsValue(newValues: any) {
      const form = getAttributiveForm(formName)
      if (form) {
        let changed = false
        const { fieldsValue } = form
        _.forEach(newValues, (value, name) => {
          const oldValue = _.get(fieldsValue, name)
          if (oldValue !== value) {
            changed = true
            _.set(fieldsValue, name, value)
            form.emitEvent(`fields.${name}.value.change`, value)
          }
        })
        if (changed) {
          form.emitEvent("change", newValues, fieldsValue)
        }
      }
    }

    getFieldsValue<V>(name?: string | string[]) {
      return getAttributiveForm(formName)?.getFieldsValue<V>(name)
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

    validateFields<V>(name?: string | string[]) {
      return Promise.resolve<string[]>(_.isUndefined(name) ? [] : _.isArray(name) ? name : [name])
        .then((names: string[]) =>
          getAttributiveForm(formName)?.findFields(
            (field) => _.isEmpty(names) || _.includes(names, field.name),
          ),
        )
        .then(validateAll)
        .then<V>(() => getAttributiveForm(formName)?.getFieldsValue(name) as V)
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

export default function useForm<V = any>(name: string, options: UseFormOptions<V> = {}) {
  const { defaultValues, values } = options
  if (name && !formContainer.hasForm(name)) {
    formContainer.newForm(name)
  }

  useEffect(() => () => formContainer.releaseForm(name), [name])

  useEffect(
    () => formContainer.getForm(name)?.setFieldsValue(defaultValues),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(
    () => formContainer.getForm(name)?.setFieldsValue(values),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values],
  )

  return useMemo<Form>(() => formContainer.getForm(name) as Form, [name])
}
