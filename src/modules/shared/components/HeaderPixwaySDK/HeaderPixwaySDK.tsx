import { lazy, useContext, useEffect, useMemo, useState } from 'react';

import classNames from 'classnames';

import { ThemeContext } from '../../../storefront/contexts';
import { PixwayAppRoutes } from '../../enums/PixwayAppRoutes';
import { useRouterConnect } from '../../hooks';
import { useCompanyConfig } from '../../hooks/useCompanyConfig';
import { useUtms } from '../../hooks/useUtms/useUtms';
import { AttachWalletProvider } from '../../providers/AttachWalletProvider/AttachWalletProvider';
import { AppDownloadModal } from '../AppDownloadModal';
import TranslatableComponent from '../TranslatableComponent';
import { NavigationTabsPixwaySDKTabs } from './components';
const NavigationLoginPixwaySDK = lazy(() =>
  import('./components/NavigationLoginPixwaySDK/NavigationLoginPixwaySDK').then(
    (mod) => ({ default: mod.NavigationLoginPixwaySDK })
  )
);
const NavigationTabsPixwaySDK = lazy(() => {
  return import(
    './components/NavigationTabsPixwaySDK/NavigationTabsPixwaySDK'
  ).then((mod) => ({ default: mod.NavigationTabsPixwaySDK }));
});
const CartButton = lazy(() =>
  import('../CartButton/CartButton').then((mod) => ({
    default: mod.CartButton,
  }))
);

interface HeaderPixwaySDKProps {
  headerClassName?: string;
  logoHeight?: number;
  tabs?: NavigationTabsPixwaySDKTabs[];
  signInRouter?: string;
  signUpRouter?: string;
  openedMenu?: boolean;
  toogleOpenedTabs?: () => void;
  openedLogin?: boolean;
  toggleOpenedLogin?: () => void;
  bgColor?: string;
  textColor?: string;
  hasSignUp?: boolean;
  brandText?: string;
  logoSrc?: string;
  margin?: string;
  padding?: string;
  fontFamily?: string;
  hasCart?: boolean;
  logoLink?: string;
  standalone?: boolean;
  hasLogIn?: boolean;
}

const _HeaderPixwaySDK = ({
  headerClassName,
  logoHeight = 50,
  tabs,
  signInRouter,
  signUpRouter,
  openedMenu,
  toogleOpenedTabs,
  openedLogin,
  toggleOpenedLogin,
  bgColor,
  textColor = 'black',
  hasSignUp = true,
  brandText = '',
  logoSrc = '',
  margin,
  padding,
  fontFamily,
  hasCart = true,
  logoLink,
  standalone = false,
  hasLogIn = true,
}: HeaderPixwaySDKProps) => {
  const context = useContext(ThemeContext);
  const utm = useUtms();
  const { query } = useRouterConnect();
  const [isOpen, setIsOpen] = useState(false);
  const [openedTabs, setOpenedTabs] = useState<boolean>(false);
  const [openedloginState, setopenedLoginState] = useState<boolean>(false);
  const { logoUrl } = useCompanyConfig();
  useEffect(() => {
    if (context?.defaultTheme?.configurations?.contentData?.developerPreview) {
      if (utm?.utm_campaign === 'm2m' && query?.testPreview?.includes('true')) {
        setIsOpen(true);
      }
    } else if (utm?.utm_campaign === 'm2m') {
      setIsOpen(true);
    }
  }, [
    context?.defaultTheme?.configurations?.contentData?.developerPreview,
    query?.testPreview,
    utm,
  ]);

  const toggleMenuMemo = () => {
    if (openedMenu || openedTabs) {
      toggleTabsMemo();
    }
    if (toggleOpenedLogin) {
      toggleOpenedLogin();
    } else setopenedLoginState(!openedloginState);
  };

  const toggleTabsMemo = () => {
    if (openedLogin || openedloginState) {
      toggleMenuMemo();
    }
    if (toogleOpenedTabs) {
      toogleOpenedTabs();
    } else setOpenedTabs(!openedTabs);
  };

  const defaultTabs = context?.defaultTheme?.header?.styleData?.tabs;
  const tabsToPass = tabs ? tabs : defaultTabs;

  const LogoToShow = useMemo(() => {
    if (
      logoSrc ||
      context?.defaultTheme?.header?.styleData?.logoSrc?.assetUrl
    ) {
      return (
        <img
          style={{ height: logoHeight + 'px' }}
          src={
            logoSrc ??
            context?.defaultTheme?.header?.styleData?.logoSrc?.assetUrl
          }
          className="pw-object-contain pw-max-w-[150px]"
        />
      );
    } else if (
      brandText ||
      context?.defaultTheme?.header?.styleData?.brandName
    ) {
      return (
        <div
          className="pw-text-[16px] pw-font-[600] pw-flex pw-full pw-items-center"
          style={{ color: textColor, height: logoHeight + 'px' }}
        >
          <p>
            {brandText ?? context?.defaultTheme?.header?.styleData?.brandName}
          </p>
        </div>
      );
    } else {
      return (
        <img
          style={{ height: logoHeight + 'px' }}
          src={logoUrl}
          className="pw-object-contain pw-max-w-[150px]"
        />
      );
    }
  }, [
    brandText,
    context?.defaultTheme?.header?.styleData?.brandName,
    context?.defaultTheme?.header?.styleData?.logoSrc?.assetUrl,
    logoHeight,
    logoSrc,
    logoUrl,
    textColor,
  ]);

  const defaultBgColor =
    context?.defaultTheme?.header?.styleData?.backgroundColor;
  const headerBgColor = bgColor ?? defaultBgColor;

  return context?.defaultTheme || standalone ? (
    <div
      id="sf-header"
      style={{
        minHeight: '90px',
        backgroundColor: headerBgColor,
        margin,
        fontFamily:
          (fontFamily || context?.defaultTheme?.header?.styleData?.fontFamily
            ? fontFamily ?? context?.defaultTheme?.header?.styleData?.fontFamily
            : 'Poppins') + ', sans-serif',
      }}
      className="w-full pw-shadow-md"
    >
      <div
        style={{
          backgroundColor: headerBgColor,
          padding: padding ?? context?.defaultTheme?.header?.styleData?.padding,
        }}
        className={classNames(
          'pw-container pw-mx-auto pw-px-4 sm:pw-px-0',
          headerClassName ?? ''
        )}
      >
        <div className="pw-flex pw-justify-between pw-py-5 pw-items-center">
          <div className="pw-flex pw-items-center pw-justify-start pw-gap-x-4 pw-pl-4">
            <div className="sm:pw-hidden">
              <NavigationTabsPixwaySDK
                tabs={tabsToPass}
                toogleMenu={toggleTabsMemo}
                opened={openedMenu ? openedMenu : openedTabs}
                hasSignUp={hasSignUp}
                textColor={
                  textColor ??
                  context?.defaultTheme?.header?.styleData?.textColor
                }
                bgColor={headerBgColor}
                fontFamily={
                  (fontFamily ||
                  context?.defaultTheme?.header?.styleData?.fontFamily
                    ? fontFamily ??
                      context?.defaultTheme?.header?.styleData?.fontFamily
                    : 'Poppins') + ', sans-serif'
                }
                hasLogIn={hasLogIn}
              />
            </div>
            <a
              href={
                logoLink && logoLink.trim() != ''
                  ? logoLink
                  : PixwayAppRoutes.HOME
              }
            >
              {LogoToShow}
            </a>
          </div>

          <div className="pw-flex pw-items-center">
            <div className="pw-order-1 sm:pw-order-1 pw-hidden sm:pw-block">
              <NavigationTabsPixwaySDK
                tabs={tabsToPass}
                toogleMenu={toggleTabsMemo}
                opened={openedMenu ? openedMenu : openedTabs}
                hasSignUp={hasSignUp}
                textColor={
                  textColor ??
                  context?.defaultTheme?.header?.styleData?.textColor
                }
                bgColor={headerBgColor}
                fontFamily={
                  (fontFamily ||
                  context?.defaultTheme?.header?.styleData?.fontFamily
                    ? fontFamily ??
                      context?.defaultTheme?.header?.styleData?.fontFamily
                    : 'Poppins') + ', sans-serif'
                }
                hasLogIn={hasLogIn}
              />
            </div>
            {hasCart && (
              <CartButton
                iconColor={
                  textColor ??
                  context?.defaultTheme?.header?.styleData?.textColor
                }
                borderColor={
                  textColor ??
                  context?.defaultTheme?.header?.styleData?.textColor
                }
                className="sm:pw-border-l sm:pw-ml-4"
              />
            )}
            {hasLogIn && (
              <div className="pw-order-3 sm:pw-order-3 sm:pw-border-l sm:pw-ml-3">
                <NavigationLoginPixwaySDK
                  backgroundColor={headerBgColor}
                  hasSignUp={hasSignUp}
                  textColor={
                    textColor ??
                    context?.defaultTheme?.header?.styleData?.textColor
                  }
                  signInRouter={signInRouter}
                  signUpRouter={signUpRouter}
                  fontFamily={
                    (fontFamily ||
                    context?.defaultTheme?.header?.styleData?.fontFamily
                      ? fontFamily ??
                        context?.defaultTheme?.header?.styleData?.fontFamily
                      : 'Poppins') + ', sans-serif'
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <AppDownloadModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  ) : null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeaderPixwaySDK = (props: HeaderPixwaySDKProps) => (
  <TranslatableComponent>
    <AttachWalletProvider>
      <_HeaderPixwaySDK {...props} />
    </AttachWalletProvider>
  </TranslatableComponent>
);
