import { ReactNode, useEffect } from 'react';
import { useSessionStorage } from 'react-use';

import { useRouterConnect } from '../../../shared';
import { UtmContext, UtmContextInterface } from '../../context/UtmContext';

export const UiSDKUtmProvider = ({
  children,
  expiration,
}: {
  children: ReactNode;
  expiration?: number;
}) => {
  const [utm, setUtm] = useSessionStorage<UtmContextInterface>('utm', {});
  const router = useRouterConnect();
  useEffect(() => {
    if (router.query.utm_source && router.query.utm_campaign) {
      const newUtm = {
        utm_source: router.query.utm_source as string,
        utm_medium: router.query.utm_medium as string,
        utm_campaign: router.query.utm_campaign as string,
        utm_term: router.query.utm_term as string,
        utm_content: router.query.utm_content as string,
        expires:
          new Date().getTime() + (expiration ? expiration : 1000 * 60 * 60),
      };
      setUtm(newUtm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return <UtmContext.Provider value={utm}>{children}</UtmContext.Provider>;
};
