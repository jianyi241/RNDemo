import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import { tabsList } from './options';
import DrawerLayoutAndroidExample from './components/AndroidComponents/DrawerLayoutAndroidExample';
import TouchableNativeFeedbackExample from './components/AndroidComponents/TouchableNativeFeedbackExample';
import InputAccessoryViewExample from './components/IOS/InputAccessoryViewExample';
import SafeAreaViewExample from './components/IOS/SafeAreaViewExample';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Examples() {
    // 选项卡配置 - 使用 useMemo 避免重复创建
    const tabs = React.useMemo(() => {
        const baseTabs = [...tabsList];
        
        if (Platform.OS === 'ios') {
            baseTabs.push({
                id: 'InputAccessoryViewExample',
                title: 'InputAccessoryView',
                component: InputAccessoryViewExample,
                color: '#FF9800',
                description: "IOS专属：一个可以在iOS上自定义键盘输入辅助视图的组件。当TextInput获得焦点时，输入辅助视图显示在键盘上方。该组件可用于创建自定义工具栏。\n要使用此组件，请将您的自定义工具栏包装在InputAccessoryView组件中，并设置一个nativeID。然后，将该nativeID作为您想要的任何TextInput 的`inputAccessoryViewID'。一个基本的例子："
            });
            baseTabs.push({
                id: 'SafeAreaViewExample',
                title: 'SafeAreaView',
                component: SafeAreaViewExample,
                color: '#FF9800',
                description: 'IOS专属：一个可以自动调整视图以适应安全区域（如状态栏、导航栏等）的组件。\n只需简单地把你原有的视图用SafeAreaView包起来，同时设置一个flex: 1的样式。当然可能还需要一些和你的设计相匹配的背景色。'
            });
        } else {
            baseTabs.push({
                id: 'DrawerLayoutAndroidExample',
                title: 'DrawerLayoutAndroid',
                component: DrawerLayoutAndroidExample,
                color: '#FF9800',
                description: 'Android专属：封装了 Android 平台DrawerLayout的 React 组件。抽屉（通常用于导航切换）是通过renderNavigationView方法渲染的，并且 DrawerLayoutAndroid 的直接子视图会成为主视图（用于放置内容）。导航视图一开始在屏幕上并不可见，不过可以从drawerPosition指定的窗口侧面拖拽出来，并且抽屉的宽度可以使用drawerWidth属性来指定。\n译注：此组件仅能在 Android 上使用。我们推荐使用跨平台的react-navigation中的 DrawerNavigation 来代替此组件。'
            });
            baseTabs.push({
                id: 'TouchableNativeFeedbackExample',
                title: 'TouchableNativeFeedback',
                component: TouchableNativeFeedbackExample,
                color: '#FF9800',
                description: 'Android专属：推荐使用Pressable 。\n本组件用于封装视图，使其可以正确响应触摸操作（仅限 Android 平台）。在 Android 设备上，这个组件利用原生状态来渲染触摸的反馈。\nv目前它只支持一个单独的 View 实例作为子节点。在底层实现上，实际会创建一个新的 RCTView 节点替换当前的子 View，并附带一些额外的属性。\n原生触摸操作反馈的背景可以使用background属性来自定义。'
            });
        }
        
        return baseTabs;
    }, []);
    const [activeTab, setActiveTab] = useState(0);
    const [showTabs, setShowTabs] = useState(false); // 控制选项卡显示/隐藏
    


    const handleTabPress = useCallback((index: number) => {
        setActiveTab(index);
        hideTabs(); // 选择后自动隐藏选项卡
    }, []);

    const toggleTabs = useCallback(() => {
        if (showTabs) {
            hideTabs();
        } else {
            setShowTabs(true);
        }
    }, [showTabs]);

    const hideTabs = useCallback(() => {
        setShowTabs(false);
    }, []);

    const ActiveComponent = tabs[activeTab].component;

    return (
        <View style={styles.container}>
            {/* 主内容区域 - 始终占满全屏 */}
            <View style={styles.contentContainer}>
                {/* 顶部切换按钮 */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity 
                        style={styles.toggleButton}
                        onPress={toggleTabs}
                    >
                        <Text style={styles.toggleButtonText}>
                            {showTabs ? '隐藏' : '切换组件'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentHeader}>
                    <Text style={styles.contentTitle}>{tabs[activeTab].title}</Text>
                    <Text style={styles.contentDescription}>{tabs[activeTab].description}</Text>
                </View>
                <View style={styles.componentContainer}>
                    <ActiveComponent />
                </View>
            </View>

            {/* 左侧选项卡 - 绝对定位覆盖层 */}
            {showTabs && (
                <View style={styles.tabOverlay}>
                    <View style={styles.tabContainer}>
                        <ScrollView 
                            style={styles.tabScrollView}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.tabScrollContent}
                        >
                            {tabs.map((tab, index) => {
                                const isActive = activeTab === index;
                                
                                return (
                                    <TouchableOpacity
                                        key={tab.id}
                                        style={[
                                            styles.tabItem,
                                            isActive && styles.activeTabItem,
                                            { borderLeftColor: tab.color }
                                        ]}
                                        onPress={() => handleTabPress(index)}
                                    >
                                        <View style={[styles.tabIcon, { backgroundColor: tab.color }]}>
                                            <Text style={styles.tabIconText}>
                                                {tab.title.charAt(0)}
                                            </Text>
                                        </View>
                                        <View style={styles.tabContent}>
                                            <Text style={[
                                                styles.tabTitle,
                                                isActive && styles.activeTabTitle
                                            ]}>
                                                {tab.title}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        
                        {/* 活动指示器 */}
                        <View 
                            style={[
                                styles.activeIndicator,
                                {
                                    backgroundColor: tabs[activeTab].color
                                }
                            ]}
                        />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    tabOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // 半透明背景
    },
    tabContainer: {
        width: 300,
        height: '100%',
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
    },
    tabScrollView: {
        flex: 1,
    },
    tabScrollContent: {
        paddingVertical: 10,
    },
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderLeftWidth: 3,
        borderLeftColor: 'transparent',
        marginBottom: 4,
        position: 'relative',
    },
    activeTabItem: {
        backgroundColor: '#f8f9fa',
        borderLeftColor: '#007AFF',
    },
    tabIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    tabIconText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    tabContent: {
        flex: 1,
    },
    tabTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 2,
    },
    activeTabTitle: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    tabDescription: {
        fontSize: 11,
        color: '#6c757d',
        lineHeight: 14,
    },
    activeTabDescription: {
        color: '#007AFF',
    },
    activeIndicator: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 3,
        height: 60,
        borderRadius: 2,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
    },
    contentHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        backgroundColor: '#fff',
    },
    contentTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 8,
    },
    contentDescription: {
        fontSize: 16,
        color: '#6c757d',
        lineHeight: 22,
    },
    componentContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },

    headerContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        alignItems: 'flex-end',
    },
    toggleButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    toggleButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
}); 