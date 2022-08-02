import React, { memo, useMemo } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
  DesktopDatePicker,
  DesktopDatePickerProps,
} from '@mui/x-date-pickers/DesktopDatePicker'
import TextField from './TextField'
import { SxProps, Theme } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField'

type DateFieldComponentT = {
  label?: string
  value?: Date | String
  sx?: SxProps
  onChange: Function
  name: string
}

const defaultStyles: SxProps<Theme> = {}

const DateFieldComponent = (props: DateFieldComponentT & TextFieldProps) => {
  const { sx, ...other } = props

  const styles = useMemo<SxProps<Theme>>(() => {
    if (sx) return { ...defaultStyles, ...sx }
    else return defaultStyles
  }, [sx])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        inputFormat='dd/MM/yyyy'
        value={other.value || ''}
        onChange={(newValue: string) => {
          other.onChange(
            other.name,
            newValue ? newValue.toString() : null,
            true
          )
        }}
        disablePast={true}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={styles}
            required={other.required}
            name={other.name}
            label={other.label || 'Select Date'}
            type='date'
            error={other.error}
            onBlur={other.onBlur}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default memo(DateFieldComponent)
