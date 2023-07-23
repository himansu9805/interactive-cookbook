import { Grid, Input, Button, Box, Divider, Typography } from '@mui/joy';
import { Link } from "react-router-dom";
import { supabase } from '../supabaseClient';
import Navbar from '../components/Navbar';
import '../styles/auth.css';
import React from 'react';
import { Toaster, toast } from 'sonner';

export default function Signup() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState<undefined | boolean>(undefined);

  const handleSignup = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: event.target.email.value,
      password: event.target.password.value
    });
    setIsLoading(false);
    if (error) {
      setIsSuccess(false);
      toast.error(error.message + '.');
    } else {
      if (data!.user!.id !== null) {
        await supabase.from('Users').insert([{ id: data!.user!.id, name: event.target.name.value }])
          .then((res: any) => {
            console.log(res);
            setIsSuccess(true);
            toast.success('Account created successfully. Check your email for the confirmation link.');
          });
      } else {
        setIsSuccess(false);
        toast.error('Something went wrong at our end.');
      }

    }
  }


  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid xs={12} md={7} >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
          <Box sx={{ width: '80%', margin: '0.75rem' }}>
            <Navbar />
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', my: { xs: 8, md: 0 } }}>
            <Box sx={{ width: { xs: '75%', md: '50%' } }}>
              <Typography level='h2'>Create an account</Typography>
              <Box sx={{ m: 0.5 }} />
              <Typography level="h6" fontWeight={"100"}>Get started in seconds</Typography>
            </Box>
            <br />
            {
              isSuccess === undefined ?
                null :
                < Toaster richColors position="bottom-left" />
            }
            <Box sx={{ width: { xs: '75%', md: '50%' } }}>
              <form onSubmit={handleSignup}>
                <label htmlFor='name'>Name</label>
                <Box sx={{ m: 1 }} />
                <Input name='name' size='lg' variant='outlined' />
                <Box sx={{ m: 2 }} />
                <label htmlFor='email'>Email</label>
                <Box sx={{ m: 1 }} />
                <Input name='email' size='lg' variant='outlined' />
                <Box sx={{ m: 2 }} />
                <label htmlFor='email'>Password</label>
                <Box sx={{ m: 1 }} />
                <Input type='password' name='password' size='lg' variant='outlined' />
                <br />
                <Button type='submit' size='lg' sx={{ width: '100%' }}>Sign Up</Button>
                <p>Already have an account?</p>
                <Link to={'/login'}><Button onClick={function () { }} size='lg' variant='outlined' sx={{ width: '100%' }}>Log In</Button></Link>
              </form>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} md={5}>
        <div className='auth-background'></div>
      </Grid>
    </Grid>
  );
}