import { useTranslation } from 'react-i18next';

import PlusIcon from '../../../../shared/assets/icons/plusCircle.svg?react';
import { OffpixButtonBase } from '../../../../tokens/components/DisplayCards/OffpixButtonBase';
import { TimeItem } from './TimeItem';

interface ConfigPanelProps {
  activeDay: string;
  panelItems: Array<{ start: string; end: string }>;
  onChangePanelItems: (value: Array<{ start: string; end: string }>) => void;
}

export const ConfigPanel = ({
  activeDay,
  onChangePanelItems,
  panelItems,
}: ConfigPanelProps) => {
  const [translate] = useTranslation();

  const weekday: { [key: string]: string } = {
    ['mon']: translate('pass>configTimeModal>monday'),
    ['tue']: translate('pass>configTimeModal>tuesday'),
    ['wed']: translate('pass>configTimeModal>wednesday'),
    ['thu']: translate('pass>configTimeModal>thursday'),
    ['fri']: translate('pass>configTimeModal>friday'),
    ['sat']: translate('pass>configTimeModal>saturday'),
    ['sun']: translate('pass>configTimeModal>sunday'),
  };

  const handleUpdateItem = (
    index: number,
    newItem: { start: string; end: string }
  ) => {
    const updatedItems = panelItems.map((item, i) =>
      i === index ? newItem : item
    );
    onChangePanelItems(updatedItems);
  };

  const handleAddTime = () => {
    const newItem = { start: '', end: '' };
    if (panelItems?.length) {
      const updatedItems = [...panelItems, newItem];
      onChangePanelItems(updatedItems);
    } else {
      onChangePanelItems([newItem]);
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = panelItems.filter((_, i) => i !== index);
    onChangePanelItems(updatedItems); // Atualiza a lista de itens removendo o item
  };

  return (
    <div className="pw-w-full pw-flex pw-flex-col pw-items-center pw-px-6 pw-mt-6">
      <p className="pw-text-lg pw-font-medium">{weekday[activeDay]}</p>
      <p className="pw-text-sm pw-opacity-80 pw-mb-2">
        {translate('pass>configPanel>configTimeForDay')}
      </p>
      {panelItems?.map((item, index: number) => (
        <TimeItem
          key={index}
          index={index}
          start={item.start}
          end={item.end}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
        />
      ))}
      <div className="pw-flex pw-w-full pw-justify-end">
        <OffpixButtonBase
          variant="outlined"
          className="pw-h-8 pw-px-2 pw-text-xs pw-flex pw-gap-x-2 pw-items-center"
          onClick={handleAddTime}
        >
          <PlusIcon />
          {translate('pass>configPanel>addTime')}
        </OffpixButtonBase>
      </div>
    </div>
  );
};