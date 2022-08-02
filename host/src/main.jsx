import { Box } from '@mui/material'
import React, { useState } from 'react'

const Form = React.lazy(() => import('Components/Form'))

function Main() {
  const [formValues, setFormValue] = useState([])

  const fieldOnChange = (value, name) => {
    setFormValue([
      ...formValues.filter((field) => field.name !== name),
      { name: name, value: value },
    ])
  }

  const onSubmit = (values) => {
    console.log(values)
  }

  const fields = [
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
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      backgroundColor={'#fff'}
      padding={'10px'}
      borderRadius={'10px'}
      boxShadow={'rgb(149 157 165 / 30%) 0px 8px 24px'}
    >
      <h1>Dynamic Formik </h1>
      <p>This form is loaded at run time from the remote server.</p>
      <React.Suspense fallback='Loading...'>
        <Form origin={'home'} fields={fields} onSubmit={onSubmit} />
      </React.Suspense>
    </Box>
  )
}

export default Main
