import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ModalExample: React.FC = () => {
  const [basicModalVisible, setBasicModalVisible] = useState(false);
  const [fullScreenModalVisible, setFullScreenModalVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [animationModalVisible, setAnimationModalVisible] = useState(false);
  const [transparentModalVisible, setTransparentModalVisible] = useState(false);
  const [bottomSheetModalVisible, setBottomSheetModalVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // 示例1：基础 Modal
  const BasicModal = () => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={basicModalVisible}
      onRequestClose={() => setBasicModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>基础 Modal</Text>
          <Text style={styles.modalText}>
            这是一个基础的 Modal 组件示例。Modal 会覆盖整个屏幕。
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setBasicModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // 示例2：全屏 Modal
  const FullScreenModal = () => (
    <Modal
      animationType="fade"
      transparent={false}
      visible={fullScreenModalVisible}
      onRequestClose={() => setFullScreenModalVisible(false)}
    >
      <SafeAreaView style={styles.fullScreenModal}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.fullScreenHeader}>
          <Text style={styles.fullScreenTitle}>全屏 Modal</Text>
          <TouchableOpacity
            onPress={() => setFullScreenModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.fullScreenContent}>
          <Text style={styles.fullScreenText}>
            这是一个全屏的 Modal 示例。通常用于展示图片、视频或其他全屏内容。
          </Text>
          <View style={styles.fullScreenImagePlaceholder}>
            <Text style={styles.placeholderText}>图片/视频内容区域</Text>
          </View>
          <Text style={styles.fullScreenText}>
            你可以在这里放置任何全屏内容，比如图片查看器、视频播放器等。
          </Text>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  // 示例3：表单 Modal
  const FormModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={formModalVisible}
      onRequestClose={() => setFormModalVisible(false)}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.formModal}>
          <Text style={styles.modalTitle}>联系表单</Text>
          
          <TextInput
            style={styles.input}
            placeholder="姓名"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            autoCapitalize="words"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          
          <TextInput
            style={styles.input}
            placeholder="邮箱"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          
          <TextInput
            style={styles.textArea}
            placeholder="留言"
            value={formData.message}
            onChangeText={(text) => setFormData({...formData, message: text})}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            returnKeyType="default"
          />
          
          <View style={styles.formButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setFormModalVisible(false);
                setFormData({ name: '', email: '', message: '' });
              }}
            >
              <Text style={styles.cancelButtonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                Alert.alert('提交成功', JSON.stringify(formData, null, 2));
                setFormModalVisible(false);
                setFormData({ name: '', email: '', message: '' });
              }}
            >
              <Text style={styles.modalButtonText}>提交</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // 示例4：动画 Modal
  const AnimationModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={animationModalVisible}
      onRequestClose={() => setAnimationModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.animationModal}>
          <View style={styles.animationContent}>
            <Text style={styles.animationTitle}>动画 Modal</Text>
            <Text style={styles.animationText}>
              这个 Modal 使用了 slide 动画效果。
            </Text>
            <View style={styles.animationButtons}>
              <TouchableOpacity
                style={styles.animationButton}
                onPress={() => Alert.alert('提示', '你点击了按钮1')}
              >
                <Text style={styles.animationButtonText}>按钮 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.animationButton}
                onPress={() => Alert.alert('提示', '你点击了按钮2')}
              >
                <Text style={styles.animationButtonText}>按钮 2</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeAnimationButton}
              onPress={() => setAnimationModalVisible(false)}
            >
              <Text style={styles.closeAnimationButtonText}>关闭</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // 示例5：透明 Modal
  const TransparentModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={transparentModalVisible}
      onRequestClose={() => setTransparentModalVisible(false)}
    >
      <View style={styles.transparentOverlay}>
        <View style={styles.transparentModal}>
          <Text style={styles.transparentTitle}>透明 Modal</Text>
          <Text style={styles.transparentText}>
            这个 Modal 有半透明的背景，可以看到后面的内容。
          </Text>
          <TouchableOpacity
            style={styles.transparentButton}
            onPress={() => setTransparentModalVisible(false)}
          >
            <Text style={styles.transparentButtonText}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // 示例6：底部弹出 Modal
  const BottomSheetModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={bottomSheetModalVisible}
      onRequestClose={() => setBottomSheetModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>底部弹出菜单</Text>
            
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Text style={styles.bottomSheetItemText}>选项 1</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Text style={styles.bottomSheetItemText}>选项 2</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Text style={styles.bottomSheetItemText}>选项 3</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.bottomSheetCancel}
              onPress={() => setBottomSheetModalVisible(false)}
            >
              <Text style={styles.bottomSheetCancelText}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Modal 组件示例</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>基础 Modal</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setBasicModalVisible(true)}
          >
            <Text style={styles.buttonText}>打开基础 Modal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>全屏 Modal</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setFullScreenModalVisible(true)}
          >
            <Text style={styles.buttonText}>打开全屏 Modal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>表单 Modal</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setFormModalVisible(true)}
          >
            <Text style={styles.buttonText}>打开表单 Modal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>动画 Modal</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setAnimationModalVisible(true)}
          >
            <Text style={styles.buttonText}>打开动画 Modal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>透明 Modal</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setTransparentModalVisible(true)}
          >
            <Text style={styles.buttonText}>打开透明 Modal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>底部弹出 Modal</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setBottomSheetModalVisible(true)}
          >
            <Text style={styles.buttonText}>打开底部弹出 Modal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>使用提示：</Text>
          <Text style={styles.tipsText}>• animationType: 'none' | 'slide' | 'fade'</Text>
          <Text style={styles.tipsText}>• transparent: 控制背景是否透明</Text>
          <Text style={styles.tipsText}>• onRequestClose: Android 返回键回调</Text>
          <Text style={styles.tipsText}>• visible: 控制 Modal 显示/隐藏</Text>
        </View>
      </ScrollView>

      {/* 渲染所有 Modal */}
      <BasicModal />
      <FullScreenModal />
      <FormModal />
      <AnimationModal />
      <TransparentModal />
      <BottomSheetModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  section: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  tipsContainer: {
    marginHorizontal: 15,
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1976D2',
  },
  tipsText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  // Modal 样式
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  // 全屏 Modal 样式
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullScreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  fullScreenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  fullScreenContent: {
    flex: 1,
    padding: 20,
  },
  fullScreenText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 24,
  },
  fullScreenImagePlaceholder: {
    height: 200,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
  },
  // 表单 Modal 样式
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formModal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: width * 0.9,
    maxHeight: height * 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  // 动画 Modal 样式
  animationModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  animationContent: {
    padding: 20,
    alignItems: 'center',
  },
  animationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  animationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  animationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  animationButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  animationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  closeAnimationButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeAnimationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  // 透明 Modal 样式
  transparentOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  transparentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  transparentText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  transparentButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  transparentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  // 底部弹出 Modal 样式
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  bottomSheetItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bottomSheetItemText: {
    fontSize: 16,
    color: '#333',
  },
  bottomSheetCancel: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bottomSheetCancelText: {
    fontSize: 16,
    color: '#FF5722',
    fontWeight: '500',
  },
});

export default ModalExample; 