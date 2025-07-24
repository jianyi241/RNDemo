import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://www.baidu.com');
  const webViewRef = useRef<WebView>(null);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
    setIsLoading(false);
    setHasError(true);
    Alert.alert('加载错误', '网页加载失败，请检查网络连接');
  };

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);
  };

  const goBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  const goForward = () => {
    if (webViewRef.current && canGoForward) {
      webViewRef.current.goForward();
    }
  };

  const reload = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const goHome = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.location.href = 'https://www.baidu.com';
        true;
      `);
    }
  };

  const loadCustomUrl = (url: string) => {
    setCurrentUrl(url);
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.location.href = '${url}';
        true;
      `);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 说明区域 */}
      <ScrollView style={styles.infoContainer}>
        <Text style={styles.infoTitle}>WebView 组件说明</Text>
        <Text style={styles.infoText}>
          • WebView 用于在 React Native 应用中嵌入网页内容{'\n'}
          • 支持 JavaScript 执行、导航控制、加载状态管理{'\n'}
          • 可以监听页面加载、错误、导航状态变化{'\n'}
          • 支持前进、后退、刷新、跳转等操作
        </Text>
      </ScrollView>

      {/* 导航栏 */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={[styles.navButton, !canGoBack && styles.navButtonDisabled]}
          onPress={goBack}
          disabled={!canGoBack}
        >
          <Text style={[styles.navButtonText, !canGoBack && styles.navButtonTextDisabled]}>
            后退
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, !canGoForward && styles.navButtonDisabled]}
          onPress={goForward}
          disabled={!canGoForward}
        >
          <Text style={[styles.navButtonText, !canGoForward && styles.navButtonTextDisabled]}>
            前进
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={reload}>
          <Text style={styles.navButtonText}>刷新</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={goHome}>
          <Text style={styles.navButtonText}>首页</Text>
        </TouchableOpacity>
      </View>

      {/* 快速链接 */}
      <View style={styles.quickLinks}>
        <TouchableOpacity 
          style={styles.quickLinkButton}
          onPress={() => loadCustomUrl('https://www.baidu.com')}
        >
          <Text style={styles.quickLinkText}>百度</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickLinkButton}
          onPress={() => loadCustomUrl('https://www.google.com')}
        >
          <Text style={styles.quickLinkText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickLinkButton}
          onPress={() => loadCustomUrl('https://www.github.com')}
        >
          <Text style={styles.quickLinkText}>GitHub</Text>
        </TouchableOpacity>
      </View>

      {/* 当前URL显示 */}
      <View style={styles.urlContainer}>
        <Text style={styles.urlText} numberOfLines={1}>
          当前页面: {currentUrl}
        </Text>
      </View>

      {/* 加载指示器 */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>正在加载...</Text>
        </View>
      )}

      {/* 错误状态 */}
      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>网页加载失败</Text>
          <TouchableOpacity style={styles.retryButton} onPress={reload}>
            <Text style={styles.retryButtonText}>重试</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: currentUrl }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
        allowsLinkPreview={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        scalesPageToFit={true}
        bounces={false}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        userAgent={Platform.OS === 'ios' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1' : 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoContainer: {
    maxHeight: 120,
    backgroundColor: '#E3F2FD',
    padding: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#424242',
    lineHeight: 18,
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  navButtonTextDisabled: {
    color: '#999999',
  },
  quickLinks: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  quickLinkButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  quickLinkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  urlContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  urlText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  webview: {
    flex: 1,
  },
});

export default WebViewExample; 