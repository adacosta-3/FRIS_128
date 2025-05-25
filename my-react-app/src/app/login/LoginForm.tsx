import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { LoginFormProps } from "./types";

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await onSubmit({ email, password });
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="w-full">
      <View className="mb-4">
        <Text className="text-gray-700 mb-2">Email*</Text>
        <TextInput
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Password*</Text>
        <TextInput
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {errorMessage ? (
        <View className="mb-4">
          <Text className="text-red-500">{errorMessage}</Text>
        </View>
      ) : null}

      <Pressable
        onPress={handleLogin}
        disabled={isLoading}
        className={`bg-blue-600 rounded-lg py-3 items-center ${
          isLoading ? "opacity-70" : ""
        }`}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold">Log In</Text>
        )}
      </Pressable>
    </View>
  );
};
