import { CSSProperties } from 'react';

import ArrowDownIcon from '../../shared/assets/icons/chevronDownOutlined.svg?react';
import { convertSpacingToCSS } from '../../shared/utils/convertSpacingToCSS';
import { useMobilePreferenceDataWhenMobile } from '../hooks/useMergeMobileData/useMergeMobileData';
import { AccordionsData, SpecificContentAccordion } from '../interfaces';
import './Accordions.css';

export const Accordions = ({ data }: { data: AccordionsData }) => {
  const { styleData, contentData, mobileStyleData, mobileContentData } = data;

  const mergedStyleData = useMobilePreferenceDataWhenMobile(
    styleData,
    mobileStyleData
  );
  const mergedContentData = useMobilePreferenceDataWhenMobile(
    contentData,
    mobileContentData
  );

  const { margin, padding } = mergedStyleData;
  const { accordionsItems } = mergedContentData;

  return (
    <div
      className="pw-container pw-mx-auto"
      style={{
        margin: convertSpacingToCSS(margin),
        padding: convertSpacingToCSS(padding),
      }}
    >
      <div className="pw-flex pw-flex-col pw-gap-8 pw-px-2 sm:pw-px-0">
        {accordionsItems?.map((accordion) => (
          <Accordion
            key={accordion.title}
            styleData={mergedStyleData}
            contentData={accordion}
          />
        ))}
      </div>
    </div>
  );
};

interface AccordionProps {
  styleData: AccordionsData['styleData'];
  contentData: SpecificContentAccordion;
}

const Accordion = ({ styleData, contentData }: AccordionProps) => {
  const {
    titleAndArrowColor,
    titleAndArrowHoverColor,
    contentColor,
    backgroundColor,
  } = styleData;

  return (
    <details
      className="pw-box-border pw-min-h-20 pw-shadow-[0_4px_11px_rgba(0,0,0,0.15)] pw-rounded-2xl pw-px-8 pw-py-[22px]"
      style={
        {
          background: backgroundColor || 'white',
        } as CSSProperties
      }
    >
      <summary
        className="accordions-title pw-cursor-pointer pw-font-bold pw-text-2xl pw-list-none pw-flex pw-justify-between pw-items-center"
        style={
          {
            '--accordions-title-color': titleAndArrowColor,
            '--accordions-title-hover-color': titleAndArrowHoverColor,
          } as CSSProperties
        }
      >
        {contentData.title}
        <div
          style={
            {
              '--accordions-arrow-color': titleAndArrowColor,
              '--accordions-arrow-hover-color': titleAndArrowHoverColor,
              '--accordions-arrow-selected-bg-color': titleAndArrowColor,
            } as CSSProperties
          }
          className="accordions-arrow pw-shadow-[0_4px_11px_rgba(0,0,0,0.15)] pw-min-w-[40px] pw-min-h-[40px] pw-grid pw-place-items-center pw-rounded-3xl"
        >
          <ArrowDownIcon />
        </div>
      </summary>

      <div
        className="pw-text-[15px] pw-leading-[22.5px]"
        style={{ color: contentColor || 'black' }}
        dangerouslySetInnerHTML={{ __html: contentData.content ?? '' }}
      />
    </details>
  );
};
