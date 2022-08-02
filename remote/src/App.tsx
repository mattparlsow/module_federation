import React, { useState } from 'react'
import Form from './components/formik'

type fieldsT = {
  fieldType: 'switch' | 'text' | 'date' | 'autocomplete'
  fieldProps: {
    name: string
    label?: string
    onChange: Function
    required?: boolean
    options?: Array<{ label: string; value: any }>
  }
}

function App() {
  const [formValues, setFormValue] = useState<
    Array<{ name: string; value: any }>
  >([])

  const fieldOnChange = (value: string | number | object, name: string) => {
    setFormValue([
      ...formValues.filter((field) => field.name !== name),
      { name: name, value: value },
    ])
  }

  const onSubmit = (values: any) => {
    console.log(values)
  }

  const fields: Array<fieldsT> = [
    {
      fieldType: 'text',
      fieldProps: {
        name: 'text',
        label: 'Text field',
        onChange: fieldOnChange,
      },
    },
    {
      fieldType: 'date',
      fieldProps: {
        name: 'date',
        onChange: fieldOnChange,
        required: true,
      },
    },
    {
      fieldType: 'autocomplete',
      fieldProps: {
        name: 'autocomplete',
        options: [
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 },
        ],
        onChange: fieldOnChange,
        label: 'Autocomplete',
        required: true,
      },
    },
    {
      fieldType: 'switch',
      fieldProps: {
        name: 'switch',
        label: 'Switch',
        onChange: fieldOnChange,
      },
    },
  ]

  return (
    <div className='App'>
      <h1>Dynamic Formik </h1>
      <Form origin={'home'} fields={fields} onSubmit={onSubmit} />
    </div>
  )
}

export default App
