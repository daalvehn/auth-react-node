import { Link } from 'react-router-dom'
import { Button  } from '@material-ui/core'


function Home() {
  return (
    <>
      <h1>Hi !! Welcome in my auth app !</h1>
      <h2>New user ? Please
        <Button>
          <Link to="/register">register</Link>
        </Button>
        or
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      </h2>
    </>
  )
}

export default Home
