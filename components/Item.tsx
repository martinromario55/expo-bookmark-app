import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { ItemType } from '@/types/itemType'

const Item = ({ item }: { item: ItemType }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSourceName}>{item.location}</Text>
      </View>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: 'space-between',
  },
  itemCategory: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  itemSourceInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  itemSourceImg: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  itemSourceName: {
    fontSize: 10,
    fontWeight: '400',
    color: '#666',
  },
})
