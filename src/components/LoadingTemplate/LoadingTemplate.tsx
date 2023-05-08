'use client';
import { Box, CircularProgress } from '@chakra-ui/react';

const LoadingTemplate = () => {
  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <CircularProgress isIndeterminate />
    </Box>
  );
};

export default LoadingTemplate;
