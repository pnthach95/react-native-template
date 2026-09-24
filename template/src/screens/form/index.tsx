import {KeyboardAwareScrollView, MaterialDesignIcons} from 'components/uniwind';
import {Button} from 'heroui-native/button';
import {FieldError} from 'heroui-native/field-error';
import {Input} from 'heroui-native/input';
import {Label} from 'heroui-native/label';
import {Spinner} from 'heroui-native/spinner';
import {Surface} from 'heroui-native/surface';
import {TextField} from 'heroui-native/text-field';
import {useToast} from 'heroui-native/toast';
import {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {FadeIn} from 'react-native-reanimated';
import {useStorage} from 'stores/localstorage';
import type {TextInput as RNTextInput} from 'react-native';

type SignInForm = {
  username: string;
  password: string;
};

const FormScreen = () => {
  const passRef = useRef<RNTextInput>(null);
  const {toast} = useToast();
  const {t} = useTranslation();
  const [savedUsername, setSavedUsername] = useStorage('username', '');
  const {control, setError, handleSubmit} = useForm<SignInForm>({
    defaultValues: {username: savedUsername},
  });
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignIn = handleSubmit(async ({username}) => {
    setLoading(true);
    setHidePass(true);
    try {
      // TODO: login
      await new Promise(r => setTimeout(r, 2000));
      setSavedUsername(username);
      toast.show({label: 'Đăng nhập thành công', variant: 'success'});
    } catch (error) {
      if (error instanceof Error) {
        setError('password', {message: error.message, type: 'validate'});
      }
    } finally {
      setLoading(false);
    }
  });

  const onPressHidePass = () => setHidePass(!hidePass);

  const jumpToPass = () => {
    passRef.current?.focus();
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerClassName="grow justify-center px-5 sm:px-20"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <Surface className="gap-y-3">
        <Controller
          control={control}
          name="username"
          render={({field: {onChange}, fieldState: {error}}) => (
            <TextField isRequired isInvalid={!!error}>
              <Label>{t('username')}</Label>
              <Input
                autoCapitalize="none"
                defaultValue={savedUsername}
                isDisabled={loading}
                returnKeyType="next"
                submitBehavior="submit"
                onChangeText={onChange}
                onSubmitEditing={jumpToPass}
              />
              <FieldError>{error?.message}</FieldError>
            </TextField>
          )}
          rules={{
            required: t('errors.no-username'),
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({field: {onChange}, fieldState: {error}}) => (
            <TextField isRequired isInvalid={!!error}>
              <Label>{t('password')}</Label>
              <View className="w-full flex-row items-center">
                <Input
                  ref={passRef}
                  autoCapitalize="none"
                  className="flex-1 pr-10"
                  isDisabled={loading}
                  returnKeyType="send"
                  secureTextEntry={hidePass}
                  onChangeText={onChange}
                  onSubmitEditing={onSignIn}
                />
                <Button
                  isIconOnly
                  className="absolute right-0"
                  isDisabled={loading}
                  variant="ghost"
                  onPress={onPressHidePass}>
                  <MaterialDesignIcons
                    name={hidePass ? 'eye-outline' : 'eye-off-outline'}
                  />
                </Button>
              </View>
              <FieldError>{error?.message}</FieldError>
            </TextField>
          )}
          rules={{required: t('errors.no-password')}}
        />
        <Button isDisabled={loading} onPress={onSignIn}>
          {loading ? (
            <Spinner color="warning" entering={FadeIn.delay(50)} />
          ) : (
            t('sign-in')
          )}
        </Button>
      </Surface>
    </KeyboardAwareScrollView>
  );
};

export default FormScreen;
