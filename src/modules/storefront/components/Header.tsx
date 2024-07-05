import { lazy } from 'react';

import { NavigationTabsPixwaySDKTabs } from '../../shared';
const NavigationTabsPixwaySDKTabs = lazy(() =>
  import(
    '../../shared/components/HeaderPixwaySDK/components/NavigationTabsPixwaySDK/NavigationTabsPixwaySDK'
  ).then((module) => ({
    default: module.NavigationTabsPixwaySDK,
  }))
);
const HeaderPixwaySDK = lazy(() =>
  import('../../shared/components/HeaderPixwaySDK/HeaderPixwaySDK').then(
    (module) => ({
      default: module.HeaderPixwaySDK,
    })
  )
);
import { convertSpacingToCSS } from '../../shared/utils/convertSpacingToCSS';
import { useMobilePreferenceDataWhenMobile } from '../hooks/useMergeMobileData/useMergeMobileData';
import { MainModuleThemeInterface } from '../interfaces';

import _ from 'lodash';

export const Header = ({ data }: { data: MainModuleThemeInterface }) => {
  const { styleData, mobileStyleData } = data;

  const mergedStyleData = useMobilePreferenceDataWhenMobile(
    styleData,
    mobileStyleData
  );

  const {
    backgroundColor,
    textColor,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hoverTextColor,
    tabs,
    logoSrc,
    brandName,
    margin,
    padding,
    fontFamily,
    hasCart,
    logoLink,
    hasLogIn,
    hasSignUp,
    bgSelectionColor,
    textSelectionColor,
  } = mergedStyleData;

  return (
    <>
      <HeaderPixwaySDK
        logoLink={logoLink}
        hasCart={hasCart}
        logoSrc={logoSrc?.assetUrl}
        bgColor={backgroundColor}
        textColor={textColor}
        brandText={brandName}
        margin={convertSpacingToCSS(margin)}
        padding={convertSpacingToCSS(padding)}
        tabs={tabs?.map(mapOptionsToTabs)}
        fontFamily={fontFamily}
        hasLogIn={hasLogIn}
        hasSignUp={hasSignUp}
        bgSelectionColor={bgSelectionColor}
        textSelectionColor={textSelectionColor}
      />
    </>
  );
};

type Item = {
  label: string;
  value: string;
  children?: Array<any>;
};

type ItemWithTabs = Item & { tabs: { label: string; value: string }[] };

const mountTabs = (item: any) => {
  if (item?.children && item?.children?.length) {
    return {
      name: item?.label,
      tabs: item.children?.map((item: any) => mountTabs(item)),
    };
  } else {
    return { name: (item as any)?.label, router: (item as any)?.value };
  }
};

const mapOptionsToTabs = (item: ItemWithTabs): NavigationTabsPixwaySDKTabs => {
  if (item?.value) return { name: item?.label, router: item?.value };

  if (item?.children?.length)
    return {
      name: item?.label,
      tabs: item.children?.map((item) => mountTabs(item)),
    };

  return {
    name: item?.label,
    tabs: item?.tabs?.map((t: Item) => ({ name: t?.label, router: t?.value })),
  };
};
