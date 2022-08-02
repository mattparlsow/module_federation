import { Autocomplete, AutocompleteProps, TextFieldProps } from '@mui/material'
import React, { useMemo, memo, SyntheticEvent } from 'react'
import TextFieldComponent from './TextField'

type AutoCompleteValueT = {
  label: string
  value: string | number
}

type AutoCompleteComponentT = Omit<
  AutocompleteProps<
    any,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  >,
  'onChange'
> &
  Omit<TextFieldProps, 'onChange'> & {
    onChange: (name: string, value: AutoCompleteValueT | null) => void
  }

const defaultStyles = {}

const AutoCompleteComponent = (props: AutoCompleteComponentT) => {
  const { sx, ...other } = props

  const styles = useMemo(() => {
    if (sx) return { ...sx, ...defaultStyles }
    else return defaultStyles
  }, [sx])

  return (
    <>
      <Autocomplete
        sx={styles}
        options={other.options}
        autoHighlight
        getOptionLabel={(option: AutoCompleteValueT) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disabled={other.disabled}
        disableClearable={
          other.disableClearable !== undefined ? other.disableClearable : false
        }
        onChange={(
          event: SyntheticEvent,
          newValue: AutoCompleteValueT | null
        ) => {
          other.onChange && other.onChange(other.name!, newValue)
        }}
        value={other.value || null}
        placeholder={other.placeholder}
        openOnFocus={true}
        renderInput={(params: TextFieldProps) => (
          <TextFieldComponent
            {...params}
            onBlur={other.onBlur}
            name={other.name}
            label={other.label}
            required={other.required}
            variant={other.variant || 'outlined'}
            inputProps={{ ...params.inputProps }}
            error={other.error}
          />
        )}
      />
    </>
  )
}

export default memo(AutoCompleteComponent)
