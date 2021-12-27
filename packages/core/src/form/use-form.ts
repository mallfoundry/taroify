import * as Events from "events"
import * as _ from "lodash"
import { useEffect, useMemo } from "react"
import { FieldInstance } from "../field"
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
  #fields = new Map<string, FieldInstance>()
  #fieldsValue = {}
  // #options: UseFormOptions<any> = {}
  #events = new Events()

  get fields() {
    return this.#fields
  }

  get fieldsValue() {
    return this.#fieldsValue
  }

  findFields(predicate: (field: FieldInstance) => boolean) {
    const fields = toMapValueArray(this.fields)
    return _.filter<FieldInstance>(fields, predicate) as FieldInstance[]
  }

  addField(name: string, field: FieldInstance) {
    this.#fields.set(name, field)
  }

  hasField(name: string) {
    return this.#fields.has(name)
  }

  removeField(name: string) {
    this.#fields.delete(name)
  }

  addEventListener(event: string | symbol, listener: (...args: any[]) => void) {
    this.#events?.addListener(event, listener)
  }

  removeEventListener(event: string | symbol, listener: (...args: any[]) => void) {
    this.#events?.removeListener(event, listener)
  }

  emitEvent(event: string | symbol, ...args: any[]) {
    this.#events.emit(event, ...args)
  }

  release() {
    this.#events?.removeAllListeners()
  }
}

interface Form {
  readonly name: string

  addEventListener(event: string | symbol, listener: (...args: any[]) => void): void

  removeEventListener(event: string | symbol, listener: (...args: any[]) => void): void

  linkField(name?: string, field?: FieldInstance): void

  unlinkField(name?: string): void

  getFields(): FieldInstance[]

  findFields(predicate: (field: FieldInstance) => boolean): FieldInstance[]

  validateFields(name?: string | string[]): Promise<void>

  setFieldsValue(values: any): void

  getFieldsValue<V>(): V
}

function defineForm(formName: string) {
  return class DelegatingForm {
    get name() {
      return formName
    }

    addEventListener(event: string | symbol, listener: (...args: any[]) => void) {
      getAttributiveForm(formName)?.addEventListener(event, listener)
    }

    removeEventListener(event: string | symbol, listener: (...args: any[]) => void) {
      getAttributiveForm(formName)?.removeEventListener(event, listener)
    }

    setFieldsValue(newValues: any) {
      const values = getAttributiveForm(formName)?.fieldsValue
      _.forEach(newValues, (value, name) => {
        const oldValue = _.get(values, name)
        _.set(values, name, value)
        if (oldValue !== value) {
          getAttributiveForm(formName)?.emitEvent(`fields.${name}.value.change`, value)
        }
      })
      getAttributiveForm(formName)?.emitEvent("change", values)
    }

    getFieldsValue<V>() {
      return getAttributiveForm(formName)?.fieldsValue as V
    }

    linkField(name?: string, field?: FieldInstance) {
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

    findFields(predicate: (field: FieldInstance) => boolean) {
      return getAttributiveForm(formName)?.findFields(predicate)
    }

    validateFields(name?: string | string[]) {
      return Promise.resolve<string[]>(_.isUndefined(name) ? [] : _.isArray(name) ? name : [name])
        .then((names: string[]) =>
          getAttributiveForm(formName)?.findFields(
            (field) => _.isEmpty(names) || _.includes(names, field.name),
          ),
        )
        .then(validateAll)
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
