import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import itemList from '@/data/item.json'
import { ItemType } from '@/types/itemType'
import { Link } from 'expo-router'
import Item from '@/components/Item'
import { useIsFocused } from '@react-navigation/native'

const BookmarkScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [bookmarkItems, setBookmarkItems] = useState<ItemType[]>([])
  const isFocused = useIsFocused()

  useEffect(() => {
    fetchBookmark()
  }, [isFocused])

  const fetchBookmark = async () => {
    await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token)
      let items: ItemType[] = []

      if (res) {
        // console.log(res) // Output: Array of bookmarked item IDs
        res.forEach((element: string) => {
          const itemData = itemList.find(item => item.id === element)
          items.push(itemData!)
        })
        setBookmarkItems(items)
        setIsLoading(false)
      } else {
        // console.log('No bookmarks')
        setIsLoading(false)
        setBookmarkItems([])
      }
    })
  }

  // if (bookmarkItems.length === 0) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>No bookmarked items found.</Text>
  //     </View>
  //   )
  // }
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <FlatList
          data={bookmarkItems}
          keyExtractor={(_, index) => `item-${index}`}
          renderItem={({ item }) => (
            <Link href={`/listing/${item.id}`} asChild>
              <TouchableOpacity>
                <Item item={item} />
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>No bookmarked items found.</Text>
            </View>
          )}
        />
      )}
    </View>
  )
}

export default BookmarkScreen
