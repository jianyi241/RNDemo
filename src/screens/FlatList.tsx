import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Alert } from 'react-native';

const DATA = [
    {
        id: '1',
        title: '头条',
    },
    {
        id: '2',
        title: '军事',
    },
    {
        id: '3',
        title: '科技',
    },
    {
        id: '4',
        title: '娱乐',
    },
    {
        id: '5',
        title: '时尚',
    },
    {
        id: '6',
        title: '社会',
    },
    {
        id: '7',
        title: '财经',
    },
    {
        id: '8',
        title: '体育',
    },
    {
        id: '9',
        title: '明星',
    }
];

const Item = ({ title }: {title: string}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default function FlatListDemo() {

    const [isRefresh, setIsRefresh] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const loadData = () => {
        setIsRefresh(true)


        setTimeout(() => {
            setIsRefresh(false)
            Alert.alert('提示', '下拉刷新完毕')
        }, 1000);
    }

    const renderItem = ({ item }: {item: any}) => {
        console.log(item)
        const backgroundColor = item.id === selectedId ? 'yellow' : '#f9c2ff'
        return (
            <TouchableOpacity  style={[styles.item,{backgroundColor}]} onPress={()=>{
                setSelectedId(item.id)
            }}>
                <Item title={item.title} />
            </TouchableOpacity>

        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                //从data中挨个取出数据并渲染到列表中
                renderItem={renderItem}
                keyExtractor={item => item.id}

                horizontal={false} //水平布局模式
                initialScrollIndex={0} //初始滚动索引
                initialNumToRender={5}//指定初始渲染数据的数量 一般数量要填满一屏  懒加载
                // numColumns={1}  //指定列数  数据项必须等高（无法支持瀑布流
                inverted={false}  //列表反转
                //extraData={selectedId} 
                //如果有除data以外的数据用在列表中（不论是用在renderItem还是头部或者尾部组件中），请在此属性中指定。同时此数据在修改时也需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），然后再修改其值，否则界面很可能不会刷新。


                // 声明项目之间的分隔符
                ItemSeparatorComponent={() => <View style={[styles.itemSeprator]}></View>}

                // 列表数据为空时 展示的组件
                ListEmptyComponent={() => <View>
                        <Text  style={{ fontSize: 30 }}>
                        暂无数据
                        </Text>
                    </View>}

                // 下拉刷新
                refreshing={isRefresh}
                onRefresh={loadData}

                // 上拉加载
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                    Alert.alert('提示', '到底了')
                }}

                // 声明列表头部
                ListHeaderComponent={() => <Text>列表头部</Text>}

                // 声明列表尾部
                ListFooterComponent={() => <Text>没有更多了</Text>}

            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        marginVertical: 20,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 32,
    },
    itemSeprator: {
        backgroundColor: 'red',
        height: 1,
        marginHorizontal: 16,
    }
});