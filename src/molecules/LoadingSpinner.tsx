import { CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';

type LoadingSpinnerProps = {
  isLoading: boolean;
};

export function LoadingSpinner({ children, isLoading }: PropsWithChildren<LoadingSpinnerProps>) {
  if (isLoading) {
    return <CircularProgress style={{alignSelf: 'center'}}/>;
  }

  return <>{children}</>;
}
