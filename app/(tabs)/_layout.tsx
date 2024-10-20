import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color={color}
            />
          ),
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="bookmark"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={26}
              color={color}
            />
          ),
          title: 'Bookmarks',
        }}
      />
    </Tabs>
  )
}

export default TabLayout
