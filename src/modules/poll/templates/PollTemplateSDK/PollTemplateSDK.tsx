import {
  ContainerControllerClasses,
  ContainerControllerSDK,
  position,
  PoweredBy,
} from '../../../shared';
import { ContainerTextBesideProps } from '../../../shared/components/ContainerTextBeside/ContainerTextBeside';
import { FAQContextEnum } from '../../../shared/enums/FAQContext';
import { PixwayAppRoutes } from '../../../shared/enums/PixwayAppRoutes';
import { PollBox } from '../../components';
import { contentTypeEnum } from '../../enums/contentType';

interface PolltemplateSDKProps {
  bgColor?: string;
  infoPosition?: position;
  contentType?: contentTypeEnum;
  FAQContext?: FAQContextEnum;
  classes?: ContainerControllerClasses;
  separation?: boolean;
  logoUrl?: string;
  textContainer?: ContainerTextBesideProps;
  className?: string;
  pollId?: string;
  redirectWithoutPoll?: string;
}

export const PollTemplateSDK = ({
  bgColor = 'rgba(0,0,0)',
  infoPosition = position.CENTER,
  contentType = contentTypeEnum.TEXT_LOGO,
  FAQContext,
  separation,
  classes,
  logoUrl,
  textContainer,
  className = '',
  pollId,
  redirectWithoutPoll = PixwayAppRoutes.SIGN_IN,
}: PolltemplateSDKProps) => {
  return (
    <div style={{ backgroundColor: bgColor }}>
      <ContainerControllerSDK
        className={className}
        logoUrl={logoUrl}
        FAQContext={FAQContext}
        classes={classes}
        contentType={contentType}
        bgColor={bgColor}
        infoPosition={infoPosition}
        separation={separation}
        textContainer={textContainer}
        infoComponent={
          <PollBox redirectWithoutPoll={redirectWithoutPoll} pollId={pollId} />
        }
      />
      <PoweredBy
        PwPosition={position.RIGHT}
        logoColor="white"
        classes={{ title: 'pw-text-white' }}
      />
    </div>
  );
};
