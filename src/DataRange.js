import { useState } from 'react'
import styled from 'styled-components'
import { TextField, InputAdornment } from '@mui/material'
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import brLocale from 'date-fns/locale/pt-BR'
import { Event as EventIcon } from '@mui/icons-material'

const DateRange = ({
  disabled,
  values,
  setValues,
  labels = ['Início', 'Fim'],
  error
}) => {
  const [helperText, setHelperText] = useState([null, null])

  const inputProps = {
    endAdornment: (
      <InputAdornment position='end'>
        <EventIcon style={{ pointerEvents: 'none' }} />
      </InputAdornment>
    )
  }

  const handleDataChange = (newValue) => {
    setValues(newValue)

    if (
      String(newValue[0]) === 'Invalid Date' ||
      newValue[0] === null ||
      String(newValue[1]) === 'Invalid Date'
    ) {
      if (newValue[0] === null) {
        helperText[0] = `Data ${labels[0]} obrigatória.`
        setHelperText(helperText)
      } else if (String(newValue[0]) === 'Invalid Date') {
        helperText[0] = `Data ${labels[0]} inválida.`
        setHelperText(helperText)
      } else {
        helperText[0] = null
        setHelperText(helperText)
      }
      if (String(newValue[1]) === 'Invalid Date') {
        helperText[1] = `Data ${labels[1]} inválida.`
        setHelperText(helperText)
      } else {
        helperText[1] = null
        setHelperText(helperText)
      }
    } else {
      setHelperText([null, null])

      if (newValue[0] && newValue[1]) {
        if (newValue[0] > newValue[1]) {
          helperText[1] = `Data ${label[0]} deve ser menor que a data ${label[1]}.`
          setHelperText(helperText)
        } else {
          setHelperText([null, null])
        }
      }
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
      <DateRangePicker
        startText={labels[0]}
        endText={labels[1]}
        value={values}
        calendars={2}
        onChange={(newValue) => {
          handleDataChange(newValue)
        }}
        renderInput={(startProps, endProps) => {
          return (
            <Wrapper error={helperText}>
              <TextField
                {...startProps}
                autoComplete='off'
                size='small'
                variant='outlined'
                disabled={disabled}
                error={!!helperText[0]}
                helperText={!!helperText[0] && helperText[0]}
                InputLabelProps={{
                  shrink: true
                }}
                type='date'
                InputProps={inputProps}
              />
              <TextField
                {...endProps}
                autoComplete='off'
                size='small'
                variant='outlined'
                disabled={disabled}
                error={!!helperText[1]}
                helperText={!!helperText[1] && helperText[1]}
                InputLabelProps={{
                  shrink: true
                }}
                type='date'
                InputProps={inputProps}
              />
            </Wrapper>
          )
        }}
      />
    </LocalizationProvider>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  overflow-y: auto;
  padding-top: 0.5rem;

  &div {
    padding: 0;
    margin-left: 8px;
    margin-right: 8px;
  }

  & div:nth-of-type(1) > div > div > svg {
    color: ${({ error }) => (error[0] ? '#d32f2f' : 'inherit')};
  }
  & div:nth-of-type(2) > div > div > svg {
    color: ${({ error }) => (error[1] ? '#d32f2f' : 'inherit')};
  }
`

export default DateRange
