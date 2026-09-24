import LanguageModal from 'components/lauguagemodal';
import {MaterialDesignIcons} from 'components/uniwind';
import {ListGroup} from 'heroui-native/list-group';
import {Separator} from 'heroui-native/separator';
import {Typography} from 'heroui-native/text';
import {useTranslation} from 'react-i18next';
import {onSwitchTheme, useAppColorScheme} from 'stores';

const SettingsScreen = () => {
  const {t} = useTranslation();
  const appTheme = useAppColorScheme();

  return (
    <ListGroup className="m-3">
      <ListGroup.Item onPress={onSwitchTheme}>
        <ListGroup.ItemPrefix>
          <MaterialDesignIcons name="theme-light-dark" />
        </ListGroup.ItemPrefix>
        <ListGroup.ItemContent>
          <Typography>{t('theme')}</Typography>
        </ListGroup.ItemContent>
        <ListGroup.ItemSuffix>
          <Typography>{t(appTheme)}</Typography>
        </ListGroup.ItemSuffix>
      </ListGroup.Item>
      <Separator />
      <LanguageModal />
    </ListGroup>
  );
};

export default SettingsScreen;
