import logo from 'assets/images/logo.png';
import Space from 'components/space';
import React, {useEffect, useRef} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Headline, HelperText, TextInput} from 'react-native-paper';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {setRouteState} from 'store';
import {useStorage} from 'store/localstorage';
import AppStyles from 'utils/styles';
import type {TextInput as RNTextInput} from 'react-native';

type SignInForm = {
  username: string;
  password: string;
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: (responsiveScreenWidth(50) * 415) / 911,
    width: responsiveScreenWidth(50),
  },
});

const SignInScreen = () => {
  const pwRef = useRef<RNTextInput>(null);
  const [savedUsername, setSavedUsername] = useStorage('username', '');
  const [savedPassword, setSavedPassword] = useStorage('password', '');
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<SignInForm>();

  useEffect(() => {
    setValue('password', savedPassword || '');
    setValue('username', savedUsername || '');
  }, []);

  const onSubmit = handleSubmit(({password, username}) => {
    setSavedPassword(password);
    setSavedUsername(username);
    setRouteState('MAIN');
  });

  const jumpToPW = () => pwRef.current?.focus();

  return (
    <ScrollView
      contentContainerStyle={[AppStyles.growCenter, AppStyles.padding]}
      keyboardShouldPersistTaps="handled">
      <FastImage resizeMode="center" source={logo} style={styles.image} />
      <Space height={30} />
      <Headline style={[AppStyles.textCenter, AppStyles.textPrimary]}>
        Đăng nhập
      </Headline>
      <Space height={30} />
      <Controller
        control={control}
        name="username"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            autoCapitalize="none"
            placeholder="Tài khoản"
            style={AppStyles.textInput}
            textContentType="username"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={jumpToPW}
          />
        )}
        rules={{
          required: true,
        }}
      />
      {errors.username && (
        <HelperText type="error">Vui lòng nhập tài khoản</HelperText>
      )}
      <Space />
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            ref={pwRef}
            secureTextEntry
            placeholder="Mật khẩu"
            style={AppStyles.textInput}
            textContentType="password"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
          />
        )}
        rules={{
          required: 'Vui lòng nhập mật khẩu',
          minLength: {message: 'Vui lòng nhập ít nhất 6 ký tự', value: 6},
        }}
      />
      {errors.password && (
        <HelperText type="error">{errors.password.message}</HelperText>
      )}
      <Space height={30} />
      <Button dark mode="contained" onPress={onSubmit}>
        Đăng nhập
      </Button>
    </ScrollView>
  );
};

export default SignInScreen;
