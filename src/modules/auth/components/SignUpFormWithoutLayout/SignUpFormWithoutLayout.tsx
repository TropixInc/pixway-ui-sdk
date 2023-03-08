import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { yupResolver } from '@hookform/resolvers/yup';
import { I18NLocaleEnum } from '@w3block/sdk-id';
import { AxiosError } from 'axios';
import { boolean, object, string } from 'yup';

import { useRouterConnect } from '../../../shared';
import { Alert } from '../../../shared/components/Alert';
import { PixwayAppRoutes } from '../../../shared/enums/PixwayAppRoutes';
import { useCompanyConfig } from '../../../shared/hooks/useCompanyConfig';
import { usePasswordValidationSchema } from '../../hooks/usePasswordValidationSchema';
import { useSignUp } from '../../hooks/useSignUp';
import { AuthButton } from '../AuthButton';
import { AuthCheckbox } from '../AuthCheckbox';
import { AuthFooter } from '../AuthFooter';
import { AuthLayoutBaseClasses } from '../AuthLayoutBase';
import { AuthPasswordTips } from '../AuthPasswordTips';
import { AuthTextController } from '../AuthTextController';
import { SignUpFormData } from '../SignUpForm/interface';
import { EMAIL_ALREADY_IN_USE_API_MESSAGE } from '../SignUpTemplate';
import { VerifySignUpWithCodeWithoutLayout } from '../VerifySignUpWithCodeWithoutLayout';

interface Props {
  onSubmit?: (data: SignUpFormData) => void;
  isLoading?: boolean;
  email?: string;
  error?: string;
  classes?: AuthLayoutBaseClasses;
  privacyRedirect?: string;
  termsRedirect?: string;
  title?: string;
  hasSignUp?: boolean;
}

enum Steps {
  SIGN_UP = 1,
  SUCCESS,
}

export const SignUpFormWithoutLayout = ({
  onSubmit,
  isLoading,
  email,
  error,
  privacyRedirect = 'https://w3block.io/en/privacy-policy',
  termsRedirect = 'https://w3block.io/en/terms',
  title,
  hasSignUp = true,
}: Props) => {
  const passwordSchema = usePasswordValidationSchema();
  const [translate] = useTranslation();
  const router = useRouterConnect();
  const [step, setStep] = useState(Steps.SIGN_UP);
  const [emailLocal, setEmail] = useState('');
  const [language, _] = useState(() => {
    if (window) {
      return window.navigator.language === 'pt-BR'
        ? I18NLocaleEnum.PtBr
        : I18NLocaleEnum.En;
    } else {
      return I18NLocaleEnum.En;
    }
  });

  const { connectProxyPass, companyId } = useCompanyConfig();
  const {
    mutate,
    isLoading: signUpLoading,
    error: signUpError,
    isSuccess,
  } = useSignUp();

  useEffect(() => {
    if (!hasSignUp) router.pushConnect(PixwayAppRoutes.SIGN_IN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSignUp]);

  useEffect(() => {
    if (isSuccess) {
      setStep(Steps.SUCCESS);
    }
  }, [isSuccess]);

  const onSubmitLocal = () => {
    const getMethodsValue = methods.getValues();

    setEmail(getMethodsValue.email);

    mutate({
      confirmation: getMethodsValue.confirmation,
      email: getMethodsValue.email,
      password: getMethodsValue.email,
      callbackUrl: connectProxyPass + PixwayAppRoutes.SIGN_UP_MAIL_CONFIRMATION,
      tenantId: companyId,
      i18nLocale: language,
    });
  };

  const getErrorMessage = () => {
    if (!signUpError) return undefined;
    const typedError = signUpError as AxiosError;
    return (typedError.response?.data as Record<string, string>)?.message ===
      EMAIL_ALREADY_IN_USE_API_MESSAGE
      ? translate('auth>signUpError>emailAlreadyInUse')
      : translate('auth>signUpError>genericErrorMessage');
  };

  const schema = object().shape({
    email: string().email(),
    password: passwordSchema,
    confirmation: string()
      .required(translate('auth>signUp>confirmationRequired'))
      .test(
        'Ok',
        translate('auth>signUp>passwordConfirmation'),
        (value, context) => value === context.parent.password
      ),
    acceptsPolicyTerms: boolean().required().isTrue(),
    acceptsTermsOfUse: boolean().required().isTrue(),
  });

  const methods = useForm<SignUpFormData>({
    defaultValues: {
      confirmation: '',
      email: email ? decodeURIComponent(email) : '',
      password: '',
      acceptsPolicyTerms: false,
      acceptsTermsOfUse: false,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (email)
      methods.setValue('email', email ? decodeURIComponent(email) : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return step === Steps.SIGN_UP ? (
    <div>
      {error || signUpError ? (
        <Alert
          variant="error"
          className="pw-flex pw-items-center pw-gap-x-2 pw-my-3"
        >
          <Alert.Icon />{' '}
          <span className="pw-text-xs">
            {error ? error : getErrorMessage()}
          </span>
        </Alert>
      ) : null}
      <FormProvider {...methods}>
        {title ? (
          <p className="pw-font-poppins pw-text-[24px] pw-text-[#35394C] pw-mb-8 pw-text-center pw-font-[700]">
            {title}
          </p>
        ) : null}

        <form
          onSubmit={
            onSubmit
              ? methods.handleSubmit(onSubmit)
              : methods.handleSubmit(onSubmitLocal)
          }
          className="sm:pw-mt-6"
        >
          <AuthTextController
            disabled={Boolean(email)}
            name="email"
            label={translate('home>contactModal>email')}
            className="pw-mb-3"
            placeholder={translate('companyAuth>newPassword>enterYourEmail')}
          />
          <AuthTextController
            name="password"
            label={translate('companyAuth>newPassword>passwordFieldLabel')}
            className="pw-mb-3"
            placeholder={translate('companyAuth>newPassword>enterYourPassword')}
            type="password"
          />
          <AuthTextController
            name="confirmation"
            label={translate(
              'companyAuth>newPassword>passwordConfirmationFieldLabel'
            )}
            className="pw-mb-6"
            placeholder={translate(
              'companyAuth>newPassword>passwordConfirmationFieldLabel'
            )}
            type="password"
          />

          <AuthPasswordTips passwordFieldName="password" className="pw-mb-6" />
          <div className="pw-flex pw-flex-col pw-gap-y-[4.5px] pw-mb-[26px]">
            <AuthCheckbox
              name="acceptsTermsOfUse"
              label="Aceito os"
              keyTrans="companyAuth>signUp>acceptTermsOfUse"
              linkText="Termos de uso"
              redirectLink={termsRedirect}
            />
            <AuthCheckbox
              name="acceptsPolicyTerms"
              keyTrans="companyAuth>signUp>acceptPrivacyPolicy"
              linkText="Política de Privacidade"
              label="Aceito os"
              redirectLink={privacyRedirect}
            />
          </div>

          <AuthButton
            type="submit"
            fullWidth
            className="pw-mb-1"
            disabled={isLoading || signUpLoading || !methods.formState.isValid}
          >
            {translate('components>advanceButton>continue')}
          </AuthButton>
          <p className="pw-font-poppins pw-text-[13px] pw-leading-[19.5px] pw-text-center pw-mb-[27px]">
            <Trans i18nKey={'auth>signUpForm>alreadyHaveAccount'}>
              Já possui uma conta?
              <a
                className="pw-text-brand-primary pw-underline"
                href={router.routerToHref(PixwayAppRoutes.SIGN_IN)}
              >
                Login
              </a>
            </Trans>
          </p>
          <AuthFooter />
        </form>
      </FormProvider>
    </div>
  ) : (
    <VerifySignUpWithCodeWithoutLayout
      emailLocal={emailLocal}
      password={methods.getValues('password')}
    />
  );
};
