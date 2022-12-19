import { useEffect } from 'react';

import { useProfile } from '..';

import { PixwayAppRoutes } from '../../enums/PixwayAppRoutes';
import { usePixwaySession } from '../usePixwaySession';
import { useRouterConnect } from '../useRouterConnect';

interface useHasWalletProps {
  redirectRoute?: string;
  needsSession?: boolean;
}

export const useHasWallet = ({
  redirectRoute = PixwayAppRoutes.CONNECT_EXTERNAL_WALLET,
  needsSession = false,
}: useHasWalletProps) => {
  const { data: session } = usePixwaySession();
  const { data: profile, isLoading, isSuccess } = useProfile();
  const router = useRouterConnect();

  useEffect(() => {
    if (needsSession) {
      if (
        !profile?.data.mainWallet &&
        !isLoading &&
        router.isReady &&
        isSuccess &&
        session
      ) {
        router.pushConnect(redirectRoute);
      }
    } else {
      if (
        !profile?.data.mainWallet &&
        !isLoading &&
        router.isReady &&
        isSuccess
      ) {
        router.pushConnect(redirectRoute);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, redirectRoute, isLoading, isSuccess, session]);
  return;
};
