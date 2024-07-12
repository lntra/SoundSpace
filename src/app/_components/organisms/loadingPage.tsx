import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const LoadingPage = () => {

    return <>
        <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            bgcolor="rgba(0, 0, 0, 0.5)"
            position="fixed"
            top={0}
            left={0}
            zIndex={9999}
        >
            <Stack sx={{ color: 'grey.100' }} direction="row">
                <CircularProgress color="secondary" />
            </Stack>
        </Box>
    </>
}

export default LoadingPage