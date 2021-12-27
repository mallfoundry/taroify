export interface FormInstance {
  validateFields(name?: string | string[]): Promise<void>

  setFieldsValue(values: any): void

  getFieldsValue<V>(): V
}
