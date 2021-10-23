import { useState } from "react"
import DateRange from "./DataRange"

const App = () => {
  const [values, setValues] = useState([null, null])

  return (
    <>
      <p>{JSON.stringify(values)}</p>
      <DateRange
        disabled={false}
        values={values}
        setValues={setValues}
        label={["Início", "Fim"]}
      />
    </>
  )
}

export default App
