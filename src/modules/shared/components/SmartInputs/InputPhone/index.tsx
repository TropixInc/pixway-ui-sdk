import { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';

import { UserDocumentStatus } from '@w3block/sdk-id';
import classNames from 'classnames';

import { validateIfStatusKycIsReadonly } from '../../../utils/validReadOnlyKycStatus';
import { FormItemContainer } from '../../Form/FormItemContainer';
import LabelWithRequired from '../../LabelWithRequired';
import { InputError } from '../../SmartInputsController';
import InputStatus from '../InputStatus';

interface InputPhoneProps {
  label: string;
  name: string;

  docValue?: string;
  docStatus?: UserDocumentStatus;
  hidenValidations?: boolean;
  required?: boolean;
}

const InputPhone = ({
  label,
  name,
  docValue,
  docStatus,
  hidenValidations = false,
  required,
}: InputPhoneProps) => {
  const { field, fieldState } = useController({ name });
  const [inputValue, setInputValue] = useState<string | undefined>();
  const error = fieldState?.error as unknown as InputError;

  const handleChange = (value: string) => {
    if (value) {
      setInputValue(value);
      field.onChange({ inputId: name, value: value });
    } else {
      setInputValue('');
      field.onChange({
        inputId: undefined,
        value: undefined,
      });
    }
  };

  useEffect(() => {
    if (docValue && docStatus !== UserDocumentStatus.RequiredReview) {
      setInputValue(docValue);
      field.onChange({ inputId: name, value: docValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docValue]);

  return (
    <div className="pw-mb-2 pw-w-full">
      <LabelWithRequired name={name} required={required}>
        {label}
      </LabelWithRequired>
      <FormItemContainer invalid={fieldState.invalid}>
        <ReactInputMask
          readOnly={docStatus && validateIfStatusKycIsReadonly(docStatus)}
          name={name}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="+XX XX XXXXX XXXX"
          mask={
            inputValue && inputValue?.length <= 16
              ? '+99 99 9999-99999'
              : '+99 99 99999-9999'
          }
          maskChar={''}
          className={classNames(
            'pw-mt-1 pw-text-base pw-h-[48px] pw-text-[#969696] pw-leading-4 pw-w-full pw-shadow-[0_4px_15px_#00000012] !pw-rounded-lg pw-outline-none pw-bg-transparent pw-px-[10px] autofill:pw-bg-transparent'
          )}
        />
      </FormItemContainer>
      <p className="mt-5 pw-h-[16px]">
        {!hidenValidations && field.value && (
          <InputStatus
            invalid={fieldState.invalid}
            errorMessage={error?.value?.message}
          />
        )}
      </p>
    </div>
  );
};

export default InputPhone;
