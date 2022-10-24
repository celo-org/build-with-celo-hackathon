import React from 'react'
import { Divider, List, ListItem } from '@ui-kitten/components'
import { styles } from './style'

const data = new Array(15).fill({
  title: 'Item',
  description: 'Description for Item',
})

export default function RouteList() {
  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <ListItem title={`${item.title} ${index + 1}`} description={`${item.description} ${index + 1}`} />
  )

  return <List style={styles.listContainer} data={data} ItemSeparatorComponent={Divider} renderItem={renderItem} />
}
