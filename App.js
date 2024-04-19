import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';



export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [portalUrl, setPortalUrl] = useState('');

  const login = async () => {
    try {
      const response = await fetch('https://safeguard-me-coding-exercise.azurewebsites.net/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const data = await response.json();
      setAccessToken(data.accessToken);
      fetchPortalUrl(data.accessToken);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const fetchPortalUrl = async (accessToken) => {
    try {
      const response = await fetch('https://safeguard-me-coding-exercise.azurewebsites.net/api/PortalUrl', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.text();
      setPortalUrl(data);
    } catch (error) {
      console.error('Fetch Portal URL Error:', error);
    }
  };


  const handleNavigationStateChange = () => {
    if (portalUrl) {
      console.log("hi");
      Linking.openURL(portalUrl);
    }


  };
  //  onClick={handleNavigationStateChange}
  return (
    <View style={styles.container}>
      {portalUrl !== '' && (
        <View style={styles.webViewWrapper}>
          <webview style={styles.link} source={{ uri: portalUrl }}
          >{portalUrl}</webview>
          <Button
            title="Navigate"
            onPress={handleNavigationStateChange}
          />
        </View>
      )}

      {portalUrl === '' && (
        <>
          <TextInput
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
            style={styles.input}
          />
          <Button
            title="Login"
            onPress={login}
          />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 300,
  },

  webViewWrapper: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    padding: 10,
  },



  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
