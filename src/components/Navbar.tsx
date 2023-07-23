import { Box, Link, Stack } from "@mui/joy";
import Logo from '../assets/logo.jpeg';
import { useUserContext } from "../contexts/UserContext";

export default function Navbar() {

  const { user } = useUserContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <img src={Logo} alt='logo' style={{ width: '50px', height: '50px' }} />
        <Box sx={{ m: 0.5 }} />
        <p>Interactive<br /><strong>Cookbook</strong></p>
      </Box>
      {user ? <p>Logged in as: <Link underline="none" variant="plain"><strong>{user.email}</strong></Link></p> :
        <Stack direction="row" spacing={4} >
          <Link underline="none" variant="plain">Home</Link>
          <Link underline="none" variant="plain">About</Link>
        </Stack>
      }
    </Box>
  );
}