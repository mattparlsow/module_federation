import { TextField, TextFieldProps } from '@mui/material'
import React, { ChangeEvent, memo, useMemo } from 'react'

const defaultStyles = {}

const TextFieldComponent = (
  props: Omit<TextFieldProps, 'onChange'> & { onChange?: Function }
) => {
  const { sx, ...other } = props

  const styles = useMemo(() => {
    if (sx) return { ...sx, ...defaultStyles }
    else return defaultStyles
  }, [sx])

  return (
    <TextField
      {...other}
      fullWidth
      variant={other.variant || 'outlined'}
      sx={styles}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        other.onChange && other.onChange(event.target.name, event.target.value)
      }}
    ></TextField>
  )
}

export default memo(TextFieldComponent)
