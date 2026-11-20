import {MaterialDesignIcons} from 'components/uniwind';
import {BottomSheet, type BottomSheetRef} from 'heroui-native/bottom-sheet';
import {Button} from 'heroui-native/button';
import {ListGroup} from 'heroui-native/list-group';
import {Typography} from 'heroui-native/text';
import {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {setAppLanguage, useAppLanguage} from 'stores';

const LanguageModal = () => {
  const appLanguage = useAppLanguage();
  const {t} = useTranslation();
  const sheetRef = useRef<BottomSheetRef>(null);

  const onPressEnglish = () => {
    setAppLanguage('en');
    sheetRef.current?.dismiss();
  };
  const onPressVietnamese = () => {
    setAppLanguage('vi');
    sheetRef.current?.dismiss();
  };

  const onOpen = () => {
    sheetRef.current?.present();
  };

  return (
    <>
      <ListGroup.Item onPress={onOpen}>
        <ListGroup.ItemPrefix>
          <MaterialDesignIcons name="earth" />
        </ListGroup.ItemPrefix>
        <ListGroup.ItemContent>
          <Typography>{t('language')}</Typography>
        </ListGroup.ItemContent>
        <ListGroup.ItemSuffix>
          <Typography>{t(`lang.${appLanguage}`)}</Typography>
        </ListGroup.ItemSuffix>
      </ListGroup.Item>
      <BottomSheet ref={sheetRef}>
        <BottomSheet.Content>
          <View className="gap-3">
            <BottomSheet.Title>{t('language')}</BottomSheet.Title>
            <Button
              variant={appLanguage === 'en' ? 'primary' : 'secondary'}
              onPress={onPressEnglish}>
              {t('lang.en')}
            </Button>
            <Button
              variant={appLanguage === 'vi' ? 'primary' : 'secondary'}
              onPress={onPressVietnamese}>
              {t('lang.vi')}
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};

export default LanguageModal;
