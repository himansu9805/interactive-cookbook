import React from 'react';
import { Grid, Input, Button, Box, Divider, Typography } from '@mui/joy';
import { Link, Navigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { supabase } from '../supabaseClient';
import { Toaster, toast } from 'sonner';
import '../styles/auth.css';
import { useUserContext } from '../contexts/UserContext';


export default function Login() {

  const { setUser } = useUserContext();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState<undefined | boolean>(undefined);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: event.target.email.value,
      password: event.target.password.value
    });
    setIsLoading(false);
    if (error) {
      setIsSuccess(false);
      toast.error(error.message + '.');
    } else {
      await supabase.from('users').select('*').eq('id', data!.user!.id).then((res: any) => {
        setUser({ id: data.user.id, email: data.user.email!, name: res.data[0].name, preferences: res.data[0].preferences });
        setIsSuccess(true);
      });
    }
  }

  return (
    <div className='App'>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid xs={12} md={7}><Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
          <Box sx={{ width: '80%', margin: '0.75rem' }}>
            <Navbar />
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', my: { xs: 8, md: 0 } }}>
            <Box sx={{ width: { xs: '75%', md: '50%' } }}>
              <Typography level='h2'>Log in to your account</Typography>
              <Box sx={{ m: 0.5 }} />
              <Typography level="h6" fontWeight={"100"}>Welcome back</Typography>
            </Box>
            <br />
            {
              isSuccess === undefined ?
                null : isSuccess === false ?
                  <Toaster richColors position="bottom-left" /> :
                  <Navigate to='/home' />
            }
            <Box sx={{ width: { xs: '75%', md: '50%' } }}>
              <form onSubmit={handleLogin}>
                <label htmlFor='email'>Email</label>
                <Box sx={{ m: 1 }} />
                <Input name='email' size='lg' variant='outlined' />
                <Box sx={{ m: 2 }} />
                <label htmlFor='email'>Password</label>
                <Box sx={{ m: 1 }} />
                <Input type='password' name='password' size='lg' variant='outlined' />
                <br />
                <Button type='submit' size='lg' sx={{ width: '100%' }}>Log In</Button>
                <p>Don't have an account?</p>
                <Link to={'/signup'}><Button onClick={function () { }} size='lg' variant='outlined' sx={{ width: '100%' }}>Sign Up</Button></Link>
              </form>
            </Box>
          </Box>
        </Box>
        </Grid>
        <Grid xs={12} md={5}>
          <div className='auth-background'></div>
        </Grid>
      </Grid>

    </div>
  );
}