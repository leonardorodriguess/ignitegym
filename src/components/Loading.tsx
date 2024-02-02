// import { Spinner } from '@gluestack-ui/config/build/theme';
import { 
  Center,
  Spinner
} from '@gluestack-ui/themed';
import { config } from 'config/gluestack-ui.config';
// import { Spinner } from 'config/theme';

export function Loading() {
  return (
    <Center flex={1} bg="$gray700">
      <Spinner />
    </Center>
  );
}