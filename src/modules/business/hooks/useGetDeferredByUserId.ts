/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';

import { ErcTokenHistoryInterfaceResponse } from '../../dashboard/interface/ercTokenHistoryInterface';
import { PixwayAPIRoutes } from '../../shared/enums/PixwayAPIRoutes';
import { W3blockAPI } from '../../shared/enums/W3blockAPI';
import { useAxios } from '../../shared/hooks/useAxios';
import { useCompanyConfig } from '../../shared/hooks/useCompanyConfig';
import { cleanObject } from '../../shared/utils/validators';

export const useGetDeferredByUserId = (
  userId: string,
  filter?: any,
  enabled?: boolean,
  status?: string
) => {
  const { companyId } = useCompanyConfig();
  const axios = useAxios(W3blockAPI.KEY);
  const cleaned = cleanObject(filter ?? {});
  const queryString = new URLSearchParams(cleaned).toString();
  const statusQuery = () => {
    if (status === 'all')
      return 'status=deferred&status=pending&status=started&status=success';
    else if (status === 'success') return 'status=success';
    else return 'status=deferred&status=pending&status=started';
  };
  return useQuery(
    [PixwayAPIRoutes.GET_DEFERRED_BY_USER_ID, queryString, companyId, status],
    (): Promise<ErcTokenHistoryInterfaceResponse> =>
      axios
        .get(
          PixwayAPIRoutes.GET_DEFERRED_BY_USER_ID.replace(
            '{companyId}',
            companyId
          ).replace('{userId}', userId) + `?${queryString}&${statusQuery()}`
        )
        .then((res) => res?.data),
    {
      enabled: !!userId && !!companyId && enabled,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
