//sections  绑定的数据源
//keyExtractor 生成唯一key 
//renderItem 渲染每一个列表项 必须返回一个 react 组件

import { StyleSheet, Text, View, SectionList, StatusBar, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
const DATA = [
    {
        title: 'Main dishes',
        data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
        title: 'Sides',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
        title: 'Drinks',
        data: ['Water', 'Coke', 'Beer'],
    },
    {
        title: 'Desserts',
        data: ['Cheese Cake', 'Ice Cream'],
    },
];
export default function SectionListDemo() {
    const [isRefresh, setIsRefresh] = useState(false)

    const loadData = () => {
        setIsRefresh(true)

        setTimeout(() => {
            setIsRefresh(false)
            Alert.alert('提示', '下拉刷新完毕')
        }, 2000);
    }
    return (
        <SafeAreaView>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}

                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}

                // 声明项目之间的分隔线
                ItemSeparatorComponent={() => {
                    return <View style={{
                        borderBottomWidth: 1,
                        borderColor: 'red'
                    }}></View>
                }}

                // 数据源为空时候展示的组件
                ListEmptyComponent={() => {
                    return <Text style={{
                        fontSize: 50,
                        textAlign: 'center',
                    }}>暂无数据</Text>
                }}

                // 下拉刷新
                refreshing={isRefresh}
                onRefresh={loadData}

                // 上拉加载
                onEndReachedThreshold={0.1} //声明触底的比例 0.1代表10%
                onEndReached={() => {
                    Alert.alert('提示', '到底了')
                }}

                //声明列表头部
                ListHeaderComponent={() => {
                    return <Text style={{ fontSize: 40 }}>三国英雄榜</Text>
                }}

                // 声明列表尾部
                ListFooterComponent={()=>{
                    return <Text>没有更多了</Text>
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
})