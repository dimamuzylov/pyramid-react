import { Select, SelectItem } from '@nextui-org/select';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import { IconName } from '../Icon/Icon';

type LanguageSelectorProps = HTMLAttributes<unknown>;
type LanguageItem = { key: string; icon: IconName };

export function LanguageSelector(props: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [values, setValues] = useState(new Set([i18n.language]));

  useEffect(() => {
    setLanguages(
      i18n.languages.map((language) => ({
        key: language,
        icon: `Flag${language.charAt(0).toUpperCase()}${language.slice(
          1
        )}` as IconName,
      }))
    ); // FlagEn, FlagRu, FlagUa
  }, [i18n.languages]);

  useEffect(() => {
    i18n.changeLanguage(Array.from(values)[0]); // 'en', 'ru', 'ua'
  }, [values]);

  return (
    <Select
      aria-label='Language'
      items={languages}
      className={`${props.className} w-20`}
      selectionMode='single'
      selectedKeys={values}
      onSelectionChange={setValues}
      renderValue={(items) =>
        items.map((item) => (
          <div key={item.data!.key}>
            <Icon icon={item.data!.icon} />
          </div>
        ))
      }
    >
      {({ key, icon }) => (
        <SelectItem key={key}>
          <Icon icon={icon} />
        </SelectItem>
      )}
    </Select>
  );
}

export default LanguageSelector;
