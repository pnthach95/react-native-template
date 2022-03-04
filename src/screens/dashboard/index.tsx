import API, {LINKS} from 'api';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import AppStyles from 'utils/styles';

const DashboardScreen = () => {
  const [data, setData] = useState<TPokemon | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await API.get<TPokemon>(LINKS.TEST);
      if (response.ok && response.data) {
        setData(response.data);
      }
    } catch (error) {
      //
    }
  };

  return (
    <ScrollView contentContainerStyle={AppStyles.padding}>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </ScrollView>
  );
};

export default DashboardScreen;
