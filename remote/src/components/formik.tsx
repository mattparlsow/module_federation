import React, { MemoExoticComponent, useMemo } from 'react'
import AutoComplete from './AutoComplete'
import DateField from './DateField'
import Switch from './Switch'
import TextField from './TextField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Stack } from '@mui/material'

type FormT = React.FormHTMLAttributes<HTMLFormElement> & {
  origin: string
  onSubmit: Function
  fields: Array<{
    fieldType: 'date' | 'text' | 'switch' | 'autocomplete'
    fieldProps: {
      name: string
      label?: string
      onChange: Function
      required?: boolean
      options?: Array<{ label: string; value: any }>
    }
  }>
}

const defaultStylesField = {
  marginTop: 2,
}

const Form = (props: FormT) => {
  const fieldRef: Array<{
    fieldType: string
    component: MemoExoticComponent<any>
  }> = [
    { fieldType: 'date', component: DateField },
    { fieldType: 'text', component: TextField },
    { fieldType: 'switch', component: Switch },
    { fieldType: 'autocomplete', component: AutoComplete },
  ]

  const validationSchema = useMemo(() => {
    var schema: { [n: string]: any } = {}
    props.fields.forEach((field: { fieldType: string; fieldProps: any }) => {
      if (field.fieldProps.required && field.fieldType === 'autocomplete') {
        schema[field.fieldProps.name] = Yup.object().required()
      } else if (field.fieldProps.required) {
        schema[field.fieldProps.name] = Yup.string().required()
      }
    })
    return Yup.object(schema)
  }, [props.fields])

  const initialValues = useMemo(() => {
    var values: { [n: string]: string } = {}
    props.fields.forEach((field: any) => {
      if (field.fieldProps.required) {
        values[field.fieldProps.name] = ''
      }
    })
    return values
  }, [props.fields])

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      props.onSubmit(values)
    },
    validationSchema: validationSchema,
  })

  const components = (formik: any) =>
    props.fields.flatMap((field: any, index: number) => {
      if (field) {
        const component = fieldRef.find(
          (ref) => ref.fieldType === field.fieldType
        )!.component

        const fieldStyles = () => {
          if (field.fieldProps.sx)
            return { ...defaultStylesField, ...field.fieldProps.sx }
          else return defaultStylesField
        }

        return React.createElement(component, {
          ...field.fieldProps,
          sx: fieldStyles(),
          value: formik.values[field.fieldProps.name] || '',
          onChange: (field: string, value: any) =>
            formik.setFieldValue(field, value),
          onBlur: () => {
            formik.setTouched({
              ...formik.touched,
              [field.fieldProps.name]: true,
            })
          },
          error:
            formik.touched[field.fieldProps.name] &&
            Boolean(formik.errors[field.fieldProps.name]),
          key: `form-${props.origin}-${field.fieldType}-${index}`,
        })
      } else {
        return []
      }
    })

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      {components(formik)}
      <Stack
        direction={'row'}
        justifyContent='flex-start'
        spacing={2}
        marginTop={2}
      >
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disableElevation
        >
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default Form
