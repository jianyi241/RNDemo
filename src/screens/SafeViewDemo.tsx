//SafeView 安全举例 针对ios刘海屏


//滚动容器
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform } from 'react-native'
import React from 'react'

export default function SafeViewDemo() {
    return (
        <SafeAreaView>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{
                    backgroundColor: '#dfb'

                }}>
                <Text style={[styles.nav]}>新闻</Text>
                <Text style={[styles.nav]}>娱乐</Text>
                <Text style={[styles.nav]}>财经</Text>
                <Text style={[styles.nav]}>军事</Text>
                <Text style={[styles.nav]}>体育</Text>
                <Text style={[styles.nav]}>新闻</Text>
                <Text style={[styles.nav]}>时尚</Text>
                <Text style={[styles.nav]}>科技</Text>
            </ScrollView>

            <ScrollView style={[styles.scrollView]} contentContainerStyle={{ margin: 10 }} showsVerticalScrollIndicator={false}>
                <Text style={[styles.text]}>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.</Text>
                {/* 解决ScrollView在Android下滚动不到底的问题 */}
                <View style={{ height: Platform.OS === 'ios' ? 0 : 70 }}></View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        // flex:1,
        backgroundColor: '#ddd',
        marginVertical: 20
    },
    nav: {
        margin: 10,
        height: 50,
        fontSize: 30
    },
    text: {
        fontSize: 50
    }
})