import { useState, useRef } from "react"
import styled from "styled-components"
import { TextField, InputAdornment } from "@mui/material"
import DateRangePicker from "@mui/lab/DateRangePicker"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import brLocale from "date-fns/locale/pt-BR"
import { Event as EventIcon } from "@mui/icons-material"

const DateRange = ({
  disabled,
  values,
  setValues,
  labels = ["Início", "Fim"],
  error
}) => {
  const [localError, setLocalError] = useState([null, null])
  const [helperText, setHelperText] = useState(["", ""])
  const dtRangeIni = useRef()
  const dtRangeFim = useRef()

  const handleDataChange = (newValue) => {
    console.log("teste: ", newValue[0] === null)
    setValues(newValue)

    if (
      String(newValue[0]) === "Invalid Date" ||
      newValue[0] === null ||
      String(newValue[1]) === "Invalid Date"
    ) {
      if (newValue[0] === null) {
        localError[0] = true
        helperText[0] = `Data ${labels[0]} obrigatória.`
        setLocalError(localError)
        setHelperText(helperText)
      } else if (String(newValue[0]) === "Invalid Date") {
        localError[0] = true
        helperText[0] = `Data ${labels[0]} inválida.`
        setLocalError(localError)
        setHelperText(helperText)
      } else {
        localError[0] = false
        helperText[0] = ""
        setLocalError(localError)
        setHelperText(helperText)
      }
      if (String(newValue[1]) === "Invalid Date") {
        localError[1] = true
        helperText[1] = `Data ${labels[1]} inválida.`
        setLocalError(localError)
        setHelperText(helperText)
      } else {
        localError[1] = false
        helperText[1] = ""
        setLocalError(localError)
        setHelperText(helperText)
      }
      console.log(localError, helperText)
    } else {
      setLocalError([false, false])
      setHelperText(["", ""])

      if (newValue[0] && newValue[1]) {
        if (newValue[0] > newValue[1]) {
          setLocalError([null, true])
          setHelperText(["", "Data Início deve ser menor que a data Fim!"])
        } else {
          setLocalError([null, null])
          setHelperText(["", ""])
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
            <Wrapper>
              <TextField
                {...startProps}
                ref={dtRangeIni}
                autoComplete="off"
                size="small"
                variant="outlined"
                disabled={disabled}
                error={localError[0]}
                helperText={localError[0] && helperText[0]}
                InputLabelProps={{
                  shrink: true
                }}
                type="date"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EventIcon style={{ pointerEvents: "none" }} />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                {...endProps}
                ref={dtRangeFim}
                autoComplete="off"
                size="small"
                variant="outlined"
                disabled={disabled}
                error={localError[1]}
                helperText={localError[1] && helperText[1]}
                InputLabelProps={{
                  shrink: true
                }}
                type="date"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EventIcon style={{ pointerEvents: "none" }} />
                    </InputAdornment>
                  )
                }}
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
`

export default DateRange
