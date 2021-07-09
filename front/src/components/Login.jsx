import { useState } from 'react'
import axios from 'axios'
import { FormControl, InputLabel, Input, Button  } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

function Register() {

  const [datas, setDatas] = useState({})
  const [error, setError] = useState()
  const history = useHistory();

  const handleChange = (e) => {
    setDatas({
      ...datas,
      [e.target.name] : e.target.value
    })
  }

  const login = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4040/login', {...datas})
      .then(res => {
        console.log(res)
        history.push("/check")
      })
      .then(data => console.log(datas))
      .catch(err => setError(err.message))
  }

  return (
    <>
      {
        error && <h1>{error}</h1>
      }
      <div>
        <h1>Login</h1>
        <form onSubmit={login}>
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              itype="email"
              id="email"
              name="email"
              onChange={handleChange}
              aria-describedby="email"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              itype="password"
              id="password"
              name="password"
              onChange={handleChange}
              aria-describedby="password"
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
              Log In
          </Button>
        </form>
      </div>
    </>
  )
}

export default Register
