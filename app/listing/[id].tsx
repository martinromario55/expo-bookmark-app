import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import itemList from '@/data/item.json'
import { ItemType } from '@/types/itemType'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ItemDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [item, setItem] = useState<ItemType>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  useEffect(() => {
    getItem()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      renderBookmark(item?.id)
    }
  }, [isLoading])

  const getItem = () => {
    const result = itemList.find(item => item.id === id)
    setItem(result)
    setIsLoading(false)
  }

  const saveBookmark = async (itemId: string) => {
    setIsBookmarked(true)
    await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token)

      // if bookmark is not empty
      if (res != null) {
        // check if item already bookmarked
        let data = res.find((val: string) => val === itemId)

        // if item is not found in bookmark
        if (data == null) {
          // add item to bookmark
          res.push(itemId)
          AsyncStorage.setItem('bookmark', JSON.stringify(res))
          Alert.alert('Bookmarked!', 'Item saved to bookmark')
        }
      } else {
        // if it's the first bookmark
        let bookmark = []
        bookmark.push(itemId)
        AsyncStorage.setItem('bookmark', JSON.stringify(bookmark))
        Alert.alert('Bookmarked!', 'Item saved to bookmark')
      }
    })
  }

  const removeBookmark = async (itemId: string) => {
    setIsBookmarked(false)
    const bookmark = await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token)
      // remove item from bookmark
      return res.filter((id: string) => id !== itemId)
    })

    // Save updated results in AsyncStorage
    AsyncStorage.setItem('bookmark', JSON.stringify(bookmark))
    Alert.alert('Removed from Bookmarks!', 'Item removed from bookmark')
  }

  // Check if item already bookmarked
  const renderBookmark = async (itemId: string) => {
    await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token)

      if (res != null) {
        // check if bookmark is not empty
        let data = res.find((val: string) => val === itemId)

        // if item is bookmarked, then bookmark should be true otherwise false
        return data == null ? setIsBookmarked(false) : setIsBookmarked(true)
      }
    })
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                isBookmarked
                  ? removeBookmark(item?.id!)
                  : saveBookmark(item?.id!)
              }
            >
              <Ionicons
                name={isBookmarked ? 'heart' : 'heart-outline'}
                size={28}
                color={isBookmarked ? 'red' : 'black'}
              />
            </TouchableOpacity>
          ),
          title: '',
        }}
      />

      <ScrollView
        style={styles.constainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>{item?.name}</Text>

        <View style={styles.newsInfoWrapper}>
          <Text style={styles.newsInfo}>{item?.location}</Text>
          <Text style={styles.newsInfo}>{item?.category}</Text>
        </View>

        <Image source={{ uri: item?.image }} style={styles.newsImg} />
        <Text style={styles.newsContent}>{item?.description}</Text>
      </ScrollView>
    </>
  )
}

export default ItemDetails

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  newsImg: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  newsInfo: {
    fontSize: 12,
    color: '#666',
  },
  newsContent: {
    fontSize: 14,
    color: '#555',
    letterSpacing: 0.8,
    lineHeight: 22,
  },
})
