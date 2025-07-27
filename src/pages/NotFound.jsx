import { Error as ErrorIcon } from '@mui/icons-material'
import { Container, Link, Stack, Typography } from '@mui/material'

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{ height: '100vh', textAlign: 'center', marginTop: 5 }}>
      <Stack alignItems={"center"} spacing={2}>
        <ErrorIcon sx={{ fontSize: '10rem' }} />
        <Typography variant='h1'>404</Typography>
        <Typography variant='h3'>Not Found</Typography>
        <Link href="/">Go back to home</Link>
      </Stack>
    </Container>
  )
}


export default NotFound


