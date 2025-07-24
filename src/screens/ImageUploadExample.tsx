import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
  StatusBar,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { launchImageLibrary, launchCamera, ImagePickerResponse, MediaType, PhotoQuality } from 'react-native-image-picker';

type ImageUploadExampleNavigationProp = StackNavigationProp<RootStackParamList, 'ImageUploadExample'>;

interface ImageUploadExampleProps {
  navigation: ImageUploadExampleNavigationProp;
}

interface ImageFile {
  uri: string;
  type: string;
  name: string;
  size: number;
  fileName?: string;
  fileSize?: number;
}

const ImageUploadExample: React.FC<ImageUploadExampleProps> = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<ImageFile | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  


  // 选择照片
  const selectPhotos = () => {
    try {
      const options = {
        mediaType: 'photo' as MediaType,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8 as PhotoQuality,
        selectionLimit: 5, // 最多选择5张
        // iOS 特定配置
        presentationStyle: 'fullScreen' as any,
      };

      launchImageLibrary(options, (response: ImagePickerResponse) => {
        console.log('相册响应:', response);
        
        if (response.didCancel) {
          console.log('用户取消选择');
          return;
        }

        if (response.errorCode) {
          console.error('相册错误:', response.errorCode, response.errorMessage);
          Alert.alert('错误', `选择照片失败: ${response.errorMessage}`);
          return;
        }

        if (response.assets) {
          console.log('相册资源:', response.assets);
          
          const newImages: ImageFile[] = response.assets.map(asset => ({
            uri: asset.uri || '',
            type: asset.type || 'image/jpeg',
            name: asset.fileName || `photo_${Date.now()}.jpg`,
            size: asset.fileSize || 0,
            fileName: asset.fileName,
            fileSize: asset.fileSize,
          }));

          setSelectedImages(prev => [...prev, ...newImages]);
          Alert.alert('成功', `已选择 ${newImages.length} 张照片`);
        }
      });
    } catch (error) {
      console.error('选择照片异常:', error);
      Alert.alert('错误', '选择照片时发生异常');
    }
  };

  // 拍照
  const takePhoto = () => {
    try {
      const options = {
        mediaType: 'photo' as MediaType,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8 as PhotoQuality,
        saveToPhotos: true,
        // iOS 特定配置
        presentationStyle: 'fullScreen' as any,
        // 关键配置
        language: 'zh', // 强制指定语言
        locale: 'zh_CN', // Android 专属配置
      };

      launchCamera(options, (response: ImagePickerResponse) => {
        console.log('相机响应:', response);
        
        if (response.didCancel) {
          console.log('用户取消拍照');
          return;
        }

        if (response.errorCode) {
          console.error('相机错误:', response.errorCode, response.errorMessage);
          Alert.alert('错误', `拍照失败: ${response.errorMessage}`);
          return;
        }

        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          console.log('相机资源:', asset);
          
          const newImage: ImageFile = {
            uri: asset.uri || '',
            type: asset.type || 'image/jpeg',
            name: asset.fileName || `camera_${Date.now()}.jpg`,
            size: asset.fileSize || 0,
            fileName: asset.fileName,
            fileSize: asset.fileSize,
          };

          setSelectedImages(prev => [...prev, newImage]);
          Alert.alert('成功', '拍照完成');
        }
      });
    } catch (error) {
      console.error('拍照异常:', error);
      Alert.alert('错误', '拍照时发生异常');
    }
  };

  // 删除图片
  const removeImage = (index: number) => {
    Alert.alert(
      '确认删除',
      '确定要删除这张图片吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            setSelectedImages(prev => prev.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };

  // 模拟上传
  const uploadImages = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('提示', '请先选择图片');
      return;
    }

    setUploading(true);

    try {
      // 模拟上传过程
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 输出文件对象信息
      console.log('上传的图片文件对象:', selectedImages);
      
      Alert.alert(
        '上传成功',
        `成功上传 ${selectedImages.length} 张图片\n\n文件信息已输出到控制台`,
        [
          {
            text: '查看文件信息',
            onPress: () => {
              Alert.alert(
                '文件信息',
                selectedImages.map((img, index) => 
                  `图片 ${index + 1}:\n` +
                  `文件名: ${img.name}\n` +
                  `类型: ${img.type}\n` +
                  `大小: ${(img.size / 1024).toFixed(2)} KB\n` +
                  `路径: ${img.uri}`
                ).join('\n\n')
              );
            },
          },
          { text: '确定' },
        ]
      );

      // 清空已上传的图片
      setSelectedImages([]);
    } catch (error) {
      Alert.alert('上传失败', '网络错误，请稍后重试');
    } finally {
      setUploading(false);
    }
  };

  // 打开图片预览
  const openImagePreview = (image: ImageFile, index: number) => {
    setPreviewImage(image);
    setPreviewIndex(index);
    setPreviewVisible(true);
    setShowHint(true);
    
    // 3秒后隐藏提示
    setTimeout(() => {
      setShowHint(false);
    }, 3000);
  };

  // 关闭图片预览
  const closeImagePreview = () => {
    setPreviewVisible(false);
    setPreviewImage(null);
    setShowHint(false);
  };



  // 切换到上一张图片
  const goToPreviousImage = () => {
    if (previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
      setPreviewImage(selectedImages[previewIndex - 1]);
    }
  };

  // 切换到下一张图片
  const goToNextImage = () => {
    if (previewIndex < selectedImages.length - 1) {
      setPreviewIndex(previewIndex + 1);
      setPreviewImage(selectedImages[previewIndex + 1]);
    }
  };

  // 清空所有图片
  const clearAllImages = () => {
    Alert.alert(
      '确认清空',
      '确定要清空所有图片吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '清空',
          style: 'destructive',
          onPress: () => {
            setSelectedImages([]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>图片上传示例</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* 操作按钮 */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={selectPhotos}>
          <Text style={styles.actionButtonText}>选择照片</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
          <Text style={styles.actionButtonText}>拍照</Text>
        </TouchableOpacity>
      </View>

      {/* 主要内容 */}
      <ScrollView style={styles.previewContainer}>
        {selectedImages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>暂无图片</Text>
            <Text style={styles.emptySubText}>请选择照片或拍照</Text>
          </View>
        ) : (
          <View style={styles.imageGrid}>
            {selectedImages.map((image, index) => (
              <View key={index} style={styles.imageItem}>
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => openImagePreview(image, index)}
                >
                  <Image source={{ uri: image.uri }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.deleteButtonText}>×</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.imageInfo}>
                  <Text style={styles.imageName}>{image.name}</Text>
                  <Text style={styles.imageSize}>
                    {(image.size / 1024).toFixed(2)} KB
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* 上传按钮 */}
      {selectedImages.length > 0 && (
        <View style={styles.uploadSection}>
          <TouchableOpacity
            style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
            onPress={uploadImages}
            disabled={uploading}
          >
            <Text style={styles.uploadButtonText}>
              {uploading ? '上传中...' : `上传 ${selectedImages.length} 张图片`}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.uploadButton, { marginTop: 10, backgroundColor: '#f44336' }]}
            onPress={clearAllImages}
          >
            <Text style={styles.uploadButtonText}>清空所有图片</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 信息说明 */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>功能说明</Text>
        <Text style={styles.infoText}>
          • 支持选择多张照片（最多5张）{'\n'}
          • 支持拍照功能{'\n'}
          • 支持图片预览和缩放{'\n'}
          • 支持删除单张图片{'\n'}
          • 支持清空所有图片{'\n'}
          • 模拟上传功能，输出文件对象信息
        </Text>
      </View>

      {/* 全屏预览 Modal */}
      <Modal
        visible={previewVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImagePreview}
      >
        <View style={styles.previewModal}>
          {/* 头部导航栏 */}
          <View style={styles.previewImageContainer}>
            <TouchableOpacity
              style={styles.previewImageWrapper}
              onPress={closeImagePreview}
              activeOpacity={1}
            >
              <Image
                source={{ uri: previewImage?.uri }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>



          {/* 底部导航栏 */}
          {selectedImages.length > 1 && (
            <View style={styles.previewFooter}>
              <TouchableOpacity
                style={[
                  styles.previewNavButton,
                  previewIndex === 0 && styles.previewNavButtonDisabled
                ]}
                onPress={goToPreviousImage}
                disabled={previewIndex === 0}
              >
                <Text style={styles.previewNavText}>‹</Text>
              </TouchableOpacity>
              
              <Text style={styles.previewCounter}>
                {previewIndex + 1} / {selectedImages.length}
              </Text>
              
              <TouchableOpacity
                style={[
                  styles.previewNavButton,
                  previewIndex === selectedImages.length - 1 && styles.previewNavButtonDisabled
                ]}
                onPress={goToNextImage}
                disabled={previewIndex === selectedImages.length - 1}
              >
                <Text style={styles.previewNavText}>›</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backText: {
    fontSize: 14,
    color: '#2196F3',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  previewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#ccc',
  },
  imageGrid: {
    paddingVertical: 10,
  },
  imageItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageInfo: {
    padding: 12,
  },
  imageName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  imageSize: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonDisabled: {
    backgroundColor: '#ccc',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#E3F2FD',
    margin: 20,
    padding: 15,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  // 全屏预览样式
  previewModal: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  previewCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewCloseText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  previewTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  previewSpacer: {
    width: 40,
  },
  previewImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.7,
  },
  previewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  previewNavButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewNavButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  previewNavText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  previewCounter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  previewHint: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 90,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  previewHintText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
});

export default ImageUploadExample; 