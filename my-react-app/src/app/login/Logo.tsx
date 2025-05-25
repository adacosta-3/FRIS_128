import React from "react";
import { View, Text, Image } from "react-native";

export const Logo: React.FC = () => {
  return (
    <View className="items-center mb-8">
      <View className="mb-4">
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/c77475d329336cae0c27256a5d3ac38c01383b71?placeholderIfAbsent=true" }}
          className="w-32 h-32"
          resizeMode="contain"
          accessibilityLabel="FRIS Logo"
        />
      </View>
      <View className="items-center">
        <Text className="text-xl font-bold text-gray-800 mb-2">
          University of the Philippines Manila
        </Text>
        <Text className="text-lg text-gray-600">
          Faculty and REPS Information System
        </Text>
      </View>
    </View>
  );
};
