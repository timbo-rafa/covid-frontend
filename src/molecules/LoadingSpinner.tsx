import { CircularProgress, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';

type LoadingSpinnerProps = {
  isLoading: boolean;
};

export function LoadingSpinner({ children, isLoading }: PropsWithChildren<LoadingSpinnerProps>) {
  const theme = useTheme();
  if (isLoading) {
    return <CircularProgress style={{alignSelf: 'center', justifyContent: 'center'}} sx={{margin: theme.spacing(2)}}/>;
  }

  return <>{children}</>;
}
