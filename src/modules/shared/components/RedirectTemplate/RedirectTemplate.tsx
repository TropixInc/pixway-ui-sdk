import { useEffect } from 'react';

import useGetProductById from '../../../storefront/hooks/useGetProductById/useGetProductById';
import { PixwayAppRoutes } from '../../enums/PixwayAppRoutes';
import { useRouterConnect } from '../../hooks';
import { useSessionUser } from '../../hooks/useSessionUser';
import { Spinner } from '../Spinner';
import TranslatableComponent from '../TranslatableComponent';

const _RedirectTemplate = () => {
  const router = useRouterConnect();
  const user = useSessionUser();
  const productId = (router.query.productId as string) ?? '';
  const { data: product } = useGetProductById(productId);

  useEffect(() => {
    if (!user) {
      router.pushConnect(PixwayAppRoutes.SIGN_IN, {
        callbackPath: PixwayAppRoutes.PRODUCT_PAGE.replace(
          '{slug}',
          product?.slug ?? ''
        ),
      });
    } else if (product?.slug && user) {
      router.pushConnect(
        PixwayAppRoutes.PRODUCT_PAGE.replace('{slug}', product?.slug ?? '')
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.slug, user]);

  return (
    <div className="pw-h-[80vh]">
      <div className="pw-flex pw-justify-center pw-items-center pw-flex-col pw-h-full">
        <h1 className="pw-font-bold pw-text-3xl pw-text-black pw-mb-5">
          Redirecionando
        </h1>
        <Spinner className="!pw-h-20 !pw-w-20" />
      </div>
    </div>
  );
};

export const RedirectTemplate = () => {
  return (
    <TranslatableComponent>
      <_RedirectTemplate />
    </TranslatableComponent>
  );
};
