import React from "react";
import { Button } from "react-native";

const LoginButton = ({ promptAsync, useProxy }) =>
    <Button
        title="Log in with Auth0"
        onPress={() => promptAsync({ useProxy })}
    />;

export default LoginButton;