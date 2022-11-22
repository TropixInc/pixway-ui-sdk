import { useLocation } from 'react-use';

import { useCompanyConfig } from '../useCompanyConfig';
import useRouter from '../useRouter';

export const useRouterConnect = () => {
  const router = useRouter();
  const { connectProxyPass } = useCompanyConfig();
  const location = useLocation();

  const pushConnect = (path: string) => {
    router.push(routerToHref(path));
  };
  const routerToHref = (path: string) => {
    return (
      (location.hostname?.includes('localhost') ||
      location.href?.includes('/connect/')
        ? ''
        : connectProxyPass) + path
    );
  };
  return { ...router, pushConnect, routerToHref };
};
