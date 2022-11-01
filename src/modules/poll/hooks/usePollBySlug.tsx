import { useQuery } from 'react-query';

import { PixwayAPIRoutes } from '../../shared/enums/PixwayAPIRoutes';
import { W3blockAPI } from '../../shared/enums/W3blockAPI';
import { useAxios } from '../../shared/hooks/useAxios';
import { useCompanyConfig } from '../../shared/hooks/useCompanyConfig';
import { PollResponseInterface } from '../interfaces/PollResponseInterface';

export const usePollBySlug = (slug: string) => {
  const { companyId } = useCompanyConfig();
  const axios = useAxios(W3blockAPI.POLL);
  return useQuery(
    [slug],
    async (): Promise<PollResponseInterface> => {
      const poll = await axios.get(
        PixwayAPIRoutes.GET_POLL_BY_SLUG.replace(
          '{companyId}',
          companyId
        ).replace('{slug}', slug)
      );
      return poll.data;
    },
    { refetchOnWindowFocus: false }
  );
};
