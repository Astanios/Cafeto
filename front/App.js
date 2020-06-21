import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import { AsyncStorage, Alert, Button, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import LoginButton from "./components/loginbutton";
import Home from "./screens/home";
import Event from "./screens/event";
import NewEvent from "./screens/newEvent";
import { CafeProvider } from "./cafeContext";

const auth0ClientId = "tA2jtuw4Hjq3kgdXQCGAfA7k4924o5lh";
const authorizationEndpoint = "https://cafetest.us.auth0.com/authorize";


const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

const Stack = createStackNavigator();

export default function App() {
  const [name, setName] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [events, setEvents] = React.useState([
    {
      name: 'Test name 1',
      description: 'Test description 1',
      picture: '../screens/landscape.jpg',
      location: null
    },
    {
      name: 'Test name 2',
      description: 'Test description 2',
      picture: '../screens/landscape.jpg',
      location: null
    },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: "id_token",
      // retrieve the user's profile
      scopes: ["openid", "profile"],
      extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );

  const [state, dispatch] = React.useReducer(
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
  console.log(`Redirect URL: ${redirectUri}`);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();

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

        const { name } = decoded;
        setName(name);
      }
    }

  }, [result]);

  const auth = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  const LoginButton = () =>
    <Button
      title="Log in with Auth0"
      onPress={() => promptAsync({ useProxy })}
    />;

  return (
    <CafeProvider value={{ auth, events, setEvents, selected, setSelected }}>
      <NavigationContainer>
        <Stack.Navigator>
          {name ? (
            <Stack.Screen
              name="Sign In"
              component={LoginButton}
            />
          ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    title: "Cafeto's events",
                    headerStyle: {
                      backgroundColor: 'rgba(12,6,63,0.91)',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen
                  name="Event"
                  component={Event}
                  options={{
                    headerStyle: {
                      backgroundColor: 'rgba(12,6,63,0.91)',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen
                  name="Create"
                  component={NewEvent}
                  options={{
                    headerStyle: {
                      backgroundColor: 'rgba(12,6,63,0.91)',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
              </>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    </CafeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
});