import React, { useEffect, useState } from 'react'
import { Divider, List, ListItem } from '@ui-kitten/components'
import { styles } from './style'
import { getRoutes } from '../../api/routes/routes'
import { Route } from '../../api/routes/routes.interface'

const data = new Array(15).fill({
  title: 'Item',
  description: 'Description for Item',
})

export default function RouteList() {
  const [routes, setRoutes] = useState<Route[]>([])
  useEffect(() => {
    const getList = async () => {
      const list = (await getRoutes()) as Route[]
      setRoutes(list)
    }
    getList()
  }, [])

  const renderItem = ({ item }: { item: any; index: number }) => (
    <ListItem key={item.id} title={item.title} description={item.description} />
  )

  return <List style={styles.listContainer} data={routes} ItemSeparatorComponent={Divider} renderItem={renderItem} />
}
