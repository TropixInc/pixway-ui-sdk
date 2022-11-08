/* eslint-disable react-hooks/exhaustive-deps */
import { Trans } from 'react-i18next';
import { useToggle } from 'react-use';

import { WalletTypes } from '@w3block/sdk-id';

import { useProfile } from '../../../shared';
import { ReactComponent as CashIcon } from '../../../shared/assets/icons/cashFilled.svg';
import { ReactComponent as ExternalLinkIcon } from '../../../shared/assets/icons/externalLink.svg';
import { ReactComponent as EyeIcon } from '../../../shared/assets/icons/eyeIcon.svg';
import { ReactComponent as EyeCrossedIcon } from '../../../shared/assets/icons/eyeIconCrossed.svg';
// import { ReactComponent as FilterIcon } from '../../../shared/assets/icons/filterOutlined.svg';
import { ReactComponent as MetamaskIcon } from '../../../shared/assets/icons/metamask.svg';
import { ReactComponent as WalletIcon } from '../../../shared/assets/icons/walletOutlined.svg';
import { InternalPagesLayoutBase } from '../../../shared/components/InternalPagesLayoutBase';
import { Link } from '../../../shared/components/Link';
import TranslatableComponent from '../../../shared/components/TranslatableComponent';
import { ChainScan } from '../../../shared/enums/ChainId';
import { PixwayAppRoutes } from '../../../shared/enums/PixwayAppRoutes';
import { useHasWallet } from '../../../shared/hooks/useHasWallet';
import useRouter from '../../../shared/hooks/useRouter';
import useTranslation from '../../../shared/hooks/useTranslation';
import { useUserWallet } from '../../../shared/hooks/useUserWallet';
// import { WalletExtract } from '../WalletExtract';
import { CardWallet } from './CardWallet';
import { ChipWallet } from './ChipWallet';

const _WalletInternalTemplate = () => {
  const [showValue, toggleShowValue] = useToggle(false);
  useHasWallet();
  const { data: profile } = useProfile();
  const [translate] = useTranslation();
  const { wallet } = useUserWallet();
  const router = useRouter();

  const isLoading = wallet == undefined;

  const extractLink = () => {
    if (wallet?.chainId === ChainScan.POLYGON)
      return `https://polygonscan.com/address/${wallet.address}`;
    if (wallet?.chainId === ChainScan.MUMBAI)
      return `https://mumbai.polygonscan.com/address/${wallet.address}`;
    return '';
  };

  return (
    <div className="pw-flex pw-flex-col pw-px-4 sm:pw-px-0">
      <div className="pw-w-full pw-font-bold pw-text-[18px] pw-leading-[23px] sm:pw-hidden pw-mb-[30px]">
        {translate('components>menu>wallet')}
      </div>
      <div className="pw-bg-[#F7F7F7] pw-border pw-border-[#E4E4E4] pw-rounded-[14px] pw-p-6 pw-shadow-[0px_4px_20px_rgba(0,0,0,0.12)] pw-flex pw-flex-col pw-gap-[24px]">
        <div className="pw-w-full pw-items-center pw-justify-between pw-hidden sm:pw-flex">
          <span className="pw-font-semibold pw-text-[23px] pw-leading-[32px]">
            {translate('components>menu>wallet')}
          </span>
          <div className="pw-flex pw-items-center pw-gap-4">
            <div
              className="pw-w-[33px] pw-h-[33px] pw-border-2 pw-border-[#353945] pw-rounded-full pw-cursor-pointer pw-flex pw-justify-center pw-items-center"
              onClick={() => toggleShowValue()}
            >
              {showValue ? (
                <EyeIcon className="pw-stroke-brand-primary" />
              ) : (
                <EyeCrossedIcon className="pw-stroke-brand-primary" />
              )}
            </div>
            {isLoading ? (
              <ChipWallet.Skeleton />
            ) : (
              profile?.data.wallets?.map((wallet) => {
                return wallet.type === WalletTypes.Vault ? (
                  <ChipWallet
                    key={wallet.id}
                    showValue={showValue}
                    Icon={() => (
                      <WalletIcon className="pw-stroke-brand-primary" />
                    )}
                    title={translate('wallet>page>balance')}
                  />
                ) : (
                  <ChipWallet
                    key={wallet.id}
                    showValue={showValue}
                    Icon={() => (
                      <MetamaskIcon className="pw-stroke-brand-primary" />
                    )}
                    title={translate('wallet>page>metamask')}
                  />
                );
              })
            )}
            <Link href={PixwayAppRoutes.ADD_FUNDS_TYPE}>
              <div className="pw-w-[165px] pw-bg-brand-primary pw-p-[8px_16px_8px_11px] pw-border-2 pw-border-[#353945] pw-rounded-[48px] pw-flex pw-justify-start pw-items-center pw-gap-2">
                <div className="pw-rounded-full pw-border pw-bg-brand-primary pw-border-white pw-w-[30px] pw-h-[30px] pw-p-[5px] pw-flex pw-justify-center pw-items-center">
                  <CashIcon className="pw-fill-white" />
                </div>
                <div className="pw-w-[1px] pw-bg-[#DCDCDC] pw-h-[32px]" />
                <div className="pw-flex pw-flex-col pw-items-start pw-text-white pw-font-semibold pw-text-[13px] pw-leading-[13px] pw-cursor-pointer">
                  <Trans i18nKey={'wallet>page>addFunds'}>
                    <span>Adicionar</span>
                    Fundos
                  </Trans>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="pw-w-full pw-grid pw-grid-cols-1 sm:pw-grid-cols-2 pw-gap-[23px]">
          {isLoading ? (
            <CardWallet.Skeleton />
          ) : (
            profile?.data.wallets?.map((wallet) => {
              return wallet.type === WalletTypes.Vault ? (
                <CardWallet
                  key={wallet.id}
                  showValue={showValue}
                  title={translate('wallet>page>principal')}
                  walletAddress={profile?.data.mainWallet?.address ?? ''}
                  onClick={() => router.push(PixwayAppRoutes.ADD_FUNDS_TYPE)}
                  textButton={translate('wallet>page>addFunds')}
                />
              ) : (
                <CardWallet
                  key={wallet.id}
                  showValue={showValue}
                  title={translate('wallet>page>metamask')}
                  walletAddress={profile?.data.mainWallet?.address ?? ''}
                />
              );
            })
          )}
        </div>
      </div>
      <div className="pw-flex pw-items-center pw-text-[#777E8F] pw-font-bold pw-text-2xl pw-my-[30px]">
        {translate('wallet>page>extract')}
        <a href={extractLink()} target="_blank" rel="noreferrer">
          <ExternalLinkIcon className="pw-ml-3 pw-stroke-[#777E8F] hover:pw-stroke-brand-primary" />
        </a>
      </div>

      {/* Componente comentado enquando não possuimos rota para mostrar os dados do extrato
       <WalletExtract /> 
      */}

      {/* 
        Comentado para poder fazer função futuramente
      <div
        className="pw-w-full pw-py-[13.75px] pw-px-[48px] pw-rounded-[48px] pw-bg-[#EFEFEF] pw-border pw-border-[#DCDCDC] pw-flex pw-justify-center pw-items-center pw-mt-[26px] pw-text-[#090909] pw-text-[12px] pw-font-medium pw-leading-[15px] pw-cursor-pointer"
        onClick={() => console.log('Desconectar')}
      >
        <FilterIcon className="pw-stroke-brand-primary" />
        {translate('wallet>page>disconnect')}
      </div> */}
    </div>
  );
};

export const WalletInternalTemplate = () => {
  return (
    <TranslatableComponent>
      <InternalPagesLayoutBase
        classes={{ middleSectionContainer: 'pw-mb-[85px]' }}
      >
        <_WalletInternalTemplate />
      </InternalPagesLayoutBase>
    </TranslatableComponent>
  );
};
