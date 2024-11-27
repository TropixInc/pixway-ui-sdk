import { useMutation } from 'react-query';

import { W3blockAPI } from '../../enums';
import { PixwayAPIRoutes } from '../../enums/PixwayAPIRoutes';
import { useAxios } from '../useAxios';
import { useCompanyConfig } from '../useCompanyConfig';

export const useTransfer = () => {
  const axios = useAxios(W3blockAPI.KEY);
  const { companyId } = useCompanyConfig();

  return useMutation(
    [PixwayAPIRoutes.TRANSFER_COIN, companyId as string],
    ({
      to,
      from,
      amount,
      id,
    }: {
      to: string;
      from: string;
      amount: string;
      id: string;
    }) =>
      axios
        .patch(
          PixwayAPIRoutes.TRANSFER_COIN.replace(
            '{companyId}',
            companyId ?? ''
          ).replace('{id}', id ?? ''),
          { to, from, amount }
        )
        .then((data) => data.data)
  );
};
