import {
  FormControlLabel,
  Stack,
  Switch,
  SwitchProps,
  Typography,
} from '@mui/material'
import React, { ChangeEvent, memo, useMemo } from 'react'

type SwtichComponentT = {
  label?: string
  twoLabels?: boolean
  labelPrefix?: string
  labelSuffix?: string
  onChange: Function
}

const defaultStyles = {}

const SwitchComponent = (
  props: SwtichComponentT & Omit<SwitchProps, 'onChange'>
) => {
  const { label, twoLabels, labelPrefix, labelSuffix, sx, ...other } = props

  const styles = useMemo(() => {
    if (sx) return { ...sx, ...defaultStyles }
    else return defaultStyles
  }, [sx])

  return twoLabels ? (
    <Stack direction={'row'} spacing={1} alignItems='center' sx={styles}>
      <Typography>{labelPrefix}</Typography>
      <Switch
        {...other}
        sx={styles}
        onChange={(event) => {
          other.onChange(other.name, event.target.checked)
        }}
      />
      <Typography>{labelSuffix}</Typography>
    </Stack>
  ) : (
    <FormControlLabel
      sx={styles}
      control={
        <Switch
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            other.onChange(other.name, event.target.checked)
          }}
        />
      }
      label={label || ''}
    />
  )
}

export default memo(SwitchComponent)
