import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropShadow from 'react-native-drop-shadow';

const { width } = Dimensions.get('window');
const GAP = 8; // 统一的间距
const ITEM_WIDTH = (width - GAP * 3) / 2; // 两列布局，左右边距各8，中间间距8

interface Photo {
  id: string;
  slug: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  user: {
    name: string;
    username: string;
  };
  likes: number;
  width: number;
  height: number;
  color?: string;
  blur_hash?: string;
}

const PhotoListScreen: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取照片数据
  const fetchPhotos = useCallback(async (pageNum: number, isRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://unsplash.com/napi/photos?page=${pageNum}&per_page=12`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Photo[] = await response.json();
      
      if (isRefresh) {
        // 刷新时直接替换数据
        setPhotos(data);
        setPage(1);
        setHasMore(data.length === 12);
      } else {
        // 加载更多时，防止重复数据
        setPhotos(prev => {
          const existingIds = new Set(prev.map(photo => photo.id));
          const newPhotos = data.filter(photo => !existingIds.has(photo.id));
          return [...prev, ...newPhotos];
        });
        setHasMore(data.length === 12);
      }
      
    } catch (error) {
      console.error('获取照片失败:', error);
      const errorMessage = '获取照片失败，请检查网络连接';
      setError(errorMessage);
      Alert.alert('错误', errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    fetchPhotos(1, true);
  }, [fetchPhotos]);

  // 下拉刷新
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setError(null);
    setPhotos([]); // 立即清空现有数据
    setPage(1); // 重置页码
    setHasMore(true); // 重置加载更多状态
    
    // 延迟一点再请求数据，确保状态更新完成
    setTimeout(() => {
      fetchPhotos(1, true);
    }, 100);
  }, [fetchPhotos]);

  // 加载更多
  const loadMore = useCallback(() => {
    if (!loading && hasMore && !error) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPhotos(nextPage);
    }
  }, [loading, hasMore, page, fetchPhotos, error]);

  // 将照片分为两列 - 根据高度动态分配
  const leftColumn: Photo[] = [];
  const rightColumn: Photo[] = [];
  let leftHeight = 0;
  let rightHeight = 0;
  
  photos.forEach((photo) => {
    const aspectRatio = photo.width / photo.height;
    const minHeight = ITEM_WIDTH * 0.8;
    const maxHeight = ITEM_WIDTH * 2.5;
    const itemHeight = Math.max(minHeight, Math.min(maxHeight, ITEM_WIDTH / aspectRatio));
    
    // 将照片分配到较短的列
    if (leftHeight <= rightHeight) {
      leftColumn.push(photo);
      leftHeight += itemHeight + GAP; // 加上间距
    } else {
      rightColumn.push(photo);
      rightHeight += itemHeight + GAP; // 加上间距
    }
  });

  // 渲染照片项
  const renderPhotoItem = (photo: Photo) => {
    const aspectRatio = photo.width / photo.height;
    // 限制最小和最大高度，确保瀑布流效果
    const minHeight = ITEM_WIDTH * 0.8;
    const maxHeight = ITEM_WIDTH * 2.5;
    const itemHeight = Math.max(minHeight, Math.min(maxHeight, ITEM_WIDTH / aspectRatio));

    return (
      <TouchableOpacity
        key={photo.id}
        style={[
          styles.photoItem,
          { 
            width: ITEM_WIDTH,
            height: itemHeight 
          },
        ]}
        onPress={() => {
          Alert.alert(
            '照片详情',
            `摄影师: ${photo.user.name || '未知'}\n用户名: ${photo.user.username}\n点赞数: ${photo.likes}\n尺寸: ${photo.width} × ${photo.height}`,
            [
              { text: '取消', style: 'cancel' },
              { 
                text: '查看大图', 
                onPress: () => {
                  console.log('查看大图:', photo.urls.full);
                }
              }
            ]
          );
        }}
        activeOpacity={0.7}
      >
        <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          }}
        >
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: photo.urls.small }}
              style={[styles.photoImage, { height: itemHeight - 32 }]}
              resizeMode="cover"
            />
            <View style={styles.photoInfo}>
              <Text style={styles.photographerName} numberOfLines={1}>
                {photo.user.name || photo.user.username}
              </Text>
            </View>
          </View>
        </DropShadow>
      </TouchableOpacity>
    );
  };

  // 渲染加载更多指示器
  const renderFooter = () => {
    if (!loading) return null;
    
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  };

  // 渲染空状态
  const renderEmpty = () => {
    if (loading) return null;
    
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>😔 {error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={onRefresh}
          >
            <Text style={styles.retryButtonText}>重试</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>暂无照片</Text>
      </View>
    );
  };

  // 渲染头部
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Unsplash 照片</Text>
      <Text style={styles.subtitle}>发现精彩瞬间</Text>
      <Text style={styles.stats}>
        已加载 {photos.length} 张照片 • 第 {page} 页
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
            title="下拉刷新"
            titleColor="#007AFF"
            progressBackgroundColor="#ffffff"
          />
        }
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const paddingToBottom = 20;
          if (layoutMeasurement.height + contentOffset.y >= 
              contentSize.height - paddingToBottom) {
            loadMore();
          }
        }}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
      >
        {/* {renderHeader()} */}
        
        {photos.length > 0 ? (
          <View style={styles.waterfallContainer}>
            <View style={styles.column}>
              {leftColumn.map(renderPhotoItem)}
            </View>
            <View style={styles.column}>
              {rightColumn.map(renderPhotoItem)}
            </View>
          </View>
        ) : (
          renderEmpty()
        )}
        
        {renderFooter()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 0, // 改为 0，避免内容被拉伸
  },
  header: {
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 10,
  },
  stats: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  waterfallContainer: {
    flexDirection: 'row',
    paddingHorizontal: GAP,
    justifyContent: 'space-between',
  },
  column: {
    width: ITEM_WIDTH,
  },
  photoItem: {
    marginBottom: GAP,
    width: '100%',
  },
  photoContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  photoInfo: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 32,
  },
  photographerName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
    flex: 1,
  },
  loadingFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#6c757d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PhotoListScreen; 