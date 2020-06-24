import React, { useState, useReducer, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import { AsyncStorage, Alert, Button, Platform, Text, View } from "react-native";
import Home from "./screens/home";
import Event from "./screens/event";
import NewEvent from "./screens/newEvent";
import { CafeProvider } from "./cafeContext";
import styles from "./styles";

const auth0ClientId = "tA2jtuw4Hjq3kgdXQCGAfA7k4924o5lh";
const authorizationEndpoint = "https://cafetest.us.auth0.com/authorize";


const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

const Stack = createStackNavigator();
const layoutOptions = {
  headerStyle: {
    backgroundColor: 'rgba(12,6,63,0.91)',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};


const App = () => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [selected, setSelected] = useState(null);
  const [events, setEvents] = useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      responseType: "id_token",
      scopes: ["openid", "profile"],
      extraParams: {
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );


  const [_, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      events: [{
        pic: "test picture",
        name: "Test Name"
      }]
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
    const validateAuth = async () => {
      if (result) {
        if (result.error) {
          Alert.alert(
            "Authentication error",
            result.params.error_description || "something went wrong"
          );
          return;
        }
        if (result.type === "success") {
          // Retrieve the JWT token and decode it
          const jwtToken = result.params.id_token;
          const decoded = jwtDecode(jwtToken);
          console.log("decoded: ", decoded);
          console.log("jwt: ", jwtToken);

          const { name, sub } = decoded;
          const id = sub.split('|')[1];
          await setUser({ id, name });
          await setJwt(jwtToken);
        }
      }
    }
    validateAuth();
  }, [result]);

  const auth = useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  const LoginButton = () =>
    <View style={{
      ...styles.center,
      height: '100%'
    }}
    >
      <Text
        style={{ marginBottom: 20 }}
      >
        You need to login in order to access the app.
      </Text>
      <Button
        title='Log in with Auth0'
        color='#FB0C43'
        onPress={() => promptAsync({ useProxy })}
      />
    </View>;

  console.log(redirectUri);
  return (
    <CafeProvider value={{ auth, events, setEvents, selected, setSelected, jwt, setJwt, user }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user && !!jwt ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: "Cafeto's events",
                  ...layoutOptions
                }}
              />
              <Stack.Screen
                name="Event"
                component={Event}
                options={{ ...layoutOptions }}
              />
              <Stack.Screen
                name="Create"
                component={NewEvent}
                options={{
                  title: "Create event",
                  ...layoutOptions
                }}
              />
            </>
          ) : (
              <Stack.Screen
                name="Sign In"
                component={LoginButton}
                options={{ ...layoutOptions }}
              />
            )}
        </Stack.Navigator>
      </NavigationContainer>
    </CafeProvider>
  );
}
export default App;