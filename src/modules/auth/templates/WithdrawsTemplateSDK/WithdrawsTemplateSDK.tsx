/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, useState } from 'react';
const InternalPagesLayoutBase = lazy(() =>
  import(
    '../../../shared/components/InternalPagesLayoutBase/InternalPagesLayoutBase'
  ).then((m) => ({
    default: m.InternalPagesLayoutBase,
  }))
);

import {
  ConfigGenericTable,
  FilterTableType,
  FormatTypeColumn,
  GenericTable,
  W3blockAPI,
} from '../../../shared';
import TranslatableComponent from '../../../shared/components/TranslatableComponent';
import { useCompanyConfig } from '../../../shared/hooks/useCompanyConfig';
import { OffpixButtonBase } from '../../../tokens/components/DisplayCards/OffpixButtonBase';
import WithdrawModal from '../../components/WithdrawModal/WithdrawModal';

const _WithdrawsTemplateSDK = () => {
  const { companyId: tenantId } = useCompanyConfig();
  const [isOpen, setIsOpen] = useState(false);
  const configTable: ConfigGenericTable = {
    localeItems: 'data.items',
    isLineExplansible: false,
    externalFilterClasses: {
      buttonsContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        gap: '10px',
        fontSize: '14px',
      },
      reportsButton: {
        fontSize: '14px',
        backgroundColor: '#0050FF',
      },
    },
    dataSource: {
      url: `/${tenantId}/withdraws`,
      urlContext: W3blockAPI.KEY,
      type: FilterTableType.DYNAMIC,
      isPublicApi: false,
    },
    tableStyles: {
      root: { width: '100%' },
      header: '!pw-grid-cols-[18%_20%]',
      line: '!pw-grid-cols-[18%_20%]',
    },
    columns: [
      {
        format: { type: FormatTypeColumn.LOCALTIME },
        key: 'createdAt',
        sortable: false,
        header: {
          label: 'Data',
        },
      },
      {
        format: {
          type: FormatTypeColumn.TEXT,
        },
        key: 'amount',
        sortable: false,
        header: {
          label: 'Valor',
        },
      },
      {
        format: {
          type: FormatTypeColumn.MAPPING,
          mapping: {
            pending: 'Pendente',
            escrowing_resources: 'Retendo valor',
            ready_to_transfer_funds: 'Pendente',
            concluded: 'Concluído',
            failed: 'Falha',
            refused: 'Recusado',
          },
        },
        key: 'status',
        sortable: false,
        header: {
          label: 'Status',
        },
      },
    ],
  };

  return (
    <>
      <div className="pw-flex pw-flex-col pw-px-4 pw-pt-5 pw-shadow-lg sm:pw-px-0 ">
        {isOpen ? (
          <WithdrawModal onClose={() => setIsOpen(false)} />
        ) : (
          <>
            <div className="pw-flex pw-pr-5 pw-items-end pw-justify-end pw-w-full">
              <OffpixButtonBase
                className="pw-max-w-[320px] pw-w-full"
                variant="filled"
                onClick={() => setIsOpen(true)}
              >
                Realizar saque
              </OffpixButtonBase>
            </div>

            <GenericTable
              config={configTable}
              classes={{
                grid: {
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1.6fr 0.7fr 1fr 1fr 0.2fr',
                } as any,
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export const WithdrawsTemplateSDK = () => {
  return (
    <TranslatableComponent>
      <InternalPagesLayoutBase
        classes={{ middleSectionContainer: 'pw-mb-[85px]' }}
      >
        <_WithdrawsTemplateSDK />
      </InternalPagesLayoutBase>
    </TranslatableComponent>
  );
};
