import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { FormControl, InputLabel, Input, Button  } from '@material-ui/core'


function Register() {

  const [datas, setDatas] = useState({})
  const [error, setError] = useState()

  const handleChange = (e) => {
    setDatas({
      ...datas,
      [e.target.name] : e.target.value
    })
  }
console.log(datas)
  const register = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4040/register', {...datas})
      .then(res => res.datas)
      .then(data => console.log(datas))
      .catch(err => setError(err.message))
  }

  return (
    <>
      {
        error ? <h1>{error}</h1>
     : (
      <div>
        <h1>Please register</h1>
        <h2>Or
          <Button><Link to="/login">login in</Link></Button>
        </h2>
        <form onSubmit={register}>
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
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={!datas.email || !datas.password}
              >
                  Register
              </Button>
              <Link to="/login">
                to login
              </Link>
        </form>
      </div>
      )
    }
    </>
  )
}

export default Register
