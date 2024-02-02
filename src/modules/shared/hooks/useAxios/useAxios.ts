import { useMemo } from 'react';

import { usePixwayAuthentication } from '../../../auth/hooks/usePixwayAuthentication';
import { getPublicAPI, getSecureApi, validateJwtToken } from '../../config/api';
import { W3blockAPI } from '../../enums/W3blockAPI';
import { usePixwayAPIURL } from '../usePixwayAPIURL/usePixwayAPIURL';
import { useRouterConnect } from '../useRouterConnect';
import { useToken } from '../useToken';

export const useAxios = (type: W3blockAPI) => {
  const apisUrl = usePixwayAPIURL();
  const token = useToken();
  const router = useRouterConnect();
  const { signOut } = usePixwayAuthentication();
  const apiBaseURLMap = new Map([
    [W3blockAPI.ID, apisUrl.w3blockIdAPIUrl],
    [W3blockAPI.KEY, apisUrl.w3blockKeyAPIUrl],
    [W3blockAPI.COMMERCE, apisUrl.w3blockCommerceAPIUrl],
    [W3blockAPI.POLL, apisUrl.w3BlockPollApiUrl],
    [W3blockAPI.PASS, apisUrl.w3BlockPassApiUrl],
  ]);
  const baseUrl = apiBaseURLMap.get(type) ?? '';
  return useMemo(() => {
    if (token && !validateJwtToken(token)) {
      const query = window ? { callbackUrl: window?.location?.href } : '';
      const queryString = new URLSearchParams(query).toString();
      const callbackUrl = `${router.basePath}/auth/signIn?${queryString}`;
      signOut({ callbackUrl });
    }
    return token ? getSecureApi(token, baseUrl) : getPublicAPI(baseUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, baseUrl]);
};
