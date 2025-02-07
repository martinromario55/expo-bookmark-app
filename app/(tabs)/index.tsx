import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import itemList from '@/data/item.json'
import Item from '@/components/Item'
import { Link } from 'expo-router'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
      }}
    >
      <FlatList
        data={itemList}
        keyExtractor={(_, index) => `item-${index}`}
        renderItem={({ item }) => (
          <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
              <Item item={item} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  )
}

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
