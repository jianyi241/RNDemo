import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Animated,
    StatusBar,
} from 'react-native';
import {
    PanGestureHandler,
    State,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');

export default function AnimatedExample() {
    // 基础动画值
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const translateAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    
    // 组合动画值
    const combinedAnim = useRef(new Animated.Value(0)).current;
    
    // 插值动画值
    const interpolateAnim = useRef(new Animated.Value(0)).current;
    
    // 手势动画值
    const panAnim = useRef(new Animated.ValueXY()).current;
    
    // 状态
    const [isAnimating, setIsAnimating] = useState(false);
    const [fadeValue, setFadeValue] = useState(0);
    const [scaleValue, setScaleValue] = useState(1);
    const [translateValue, setTranslateValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [interpolateValue, setInterpolateValue] = useState(0);

    // 1. 基础淡入淡出动画
    const startFadeAnimation = () => {
        const toValue = fadeValue === 0 ? 1 : 0; // 切换透明度值：0表示完全透明，1表示完全不透明
        setFadeValue(toValue);
        Animated.timing(fadeAnim, {
            toValue, // 目标值：动画结束时的值
            duration: 1000, // 动画持续时间：1000毫秒（1秒）
            useNativeDriver: true, // 使用原生驱动：提高性能，但只能用于transform和opacity
        }).start();
    };

    // 2. 缩放动画（弹性动画）
    const startScaleAnimation = () => {
        const toValue = scaleValue === 1 ? 2 : 1; // 切换缩放值：1表示原始大小，2表示放大2倍
        setScaleValue(toValue);
        Animated.spring(scaleAnim, {
            toValue, // 目标值：动画结束时的缩放比例
            tension: 50, // 张力：控制弹簧的"紧度"，值越大动画越快
            friction: 7, // 摩擦力：控制弹簧的"阻尼"，值越大动画越平滑
            useNativeDriver: true, // 使用原生驱动：提高性能
        }).start();
    };

    // 3. 位移动画
    const startTranslateAnimation = () => {
        const toValue = translateValue === 0 ? 100 : 0; // 切换位移值：0表示原位，100表示向右移动100像素
        setTranslateValue(toValue);
        Animated.timing(translateAnim, {
            toValue, // 目标值：动画结束时的位移距离
            duration: 800, // 动画持续时间：800毫秒
            useNativeDriver: true, // 使用原生驱动：提高性能
        }).start();
    };

    // 4. 旋转动画
    const startRotateAnimation = () => {
        const toValue = rotateValue === 0 ? 1 : 0; // 切换旋转值：0表示0度，1表示360度（通过插值计算）
        setRotateValue(toValue);
        Animated.timing(rotateAnim, {
            toValue, // 目标值：动画结束时的旋转值
            duration: 1000, // 动画持续时间：1000毫秒（1秒）
            useNativeDriver: true, // 使用原生驱动：提高性能
        }).start();
    };

    // 5. 组合动画（并行动画）
    const startCombinedAnimation = () => {
        setIsAnimating(true); // 设置动画状态，防止重复点击
        Animated.parallel([ // parallel：同时执行多个动画
            Animated.timing(combinedAnim, {
                toValue: 1, // 透明度从0变为1
                duration: 1000, // 动画持续1秒
                useNativeDriver: true, // 使用原生驱动
            }),
            Animated.spring(scaleAnim, {
                toValue: 1.5, // 缩放从1变为1.5倍
                tension: 50, // 弹簧张力
                friction: 7, // 弹簧摩擦力
                useNativeDriver: true, // 使用原生驱动
            }),
        ]).start(() => { // 动画完成后的回调函数
            // 反向动画：恢复原始状态
            Animated.parallel([
                Animated.timing(combinedAnim, {
                    toValue: 0, // 透明度从1变回0
                    duration: 1000, // 动画持续1秒
                    useNativeDriver: true, // 使用原生驱动
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1, // 缩放从1.5变回1
                    tension: 50, // 弹簧张力
                    friction: 7, // 弹簧摩擦力
                    useNativeDriver: true, // 使用原生驱动
                }),
            ]).start(() => setIsAnimating(false)); // 动画完成后重置状态
        });
    };

    // 6. 序列动画（按顺序执行）
    const startSequenceAnimation = () => {
        Animated.sequence([ // sequence：按顺序执行多个动画
            Animated.timing(translateAnim, {
                toValue: 50, // 第一步：向右移动50像素
                duration: 500, // 动画持续500毫秒
                useNativeDriver: true, // 使用原生驱动
            }),
            Animated.timing(scaleAnim, {
                toValue: 1.5, // 第二步：放大到1.5倍
                duration: 500, // 动画持续500毫秒
                useNativeDriver: true, // 使用原生驱动
            }),
            Animated.timing(translateAnim, {
                toValue: 0, // 第三步：回到原位
                duration: 500, // 动画持续500毫秒
                useNativeDriver: true, // 使用原生驱动
            }),
            Animated.timing(scaleAnim, {
                toValue: 1, // 第四步：恢复原始大小
                duration: 500, // 动画持续500毫秒
                useNativeDriver: true, // 使用原生驱动
            }),
        ]).start();
    };

    // 7. 插值动画（值映射动画）
    const startInterpolateAnimation = () => {
        const toValue = interpolateValue === 0 ? 1 : 0; // 切换插值动画值
        setInterpolateValue(toValue);
        Animated.timing(interpolateAnim, {
            toValue, // 目标值：0或1
            duration: 2000, // 动画持续2秒
            useNativeDriver: true, // 使用原生驱动
        }).start();
    };

    // 8. 循环动画（重复执行）
    const startLoopAnimation = () => {
        Animated.loop( // loop：循环执行动画
            Animated.sequence([ // 先放大再缩小
                Animated.timing(scaleAnim, {
                    toValue: 1.5, // 放大到1.5倍
                    duration: 1000, // 动画持续1秒
                    useNativeDriver: true, // 使用原生驱动
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1, // 缩小回原始大小
                    duration: 1000, // 动画持续1秒
                    useNativeDriver: true, // 使用原生驱动
                }),
            ]),
            { iterations: 3 } // 循环3次后停止
        ).start();
    };

    // 9. 手势处理（拖拽动画）
    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: panAnim.x, translationY: panAnim.y } }], // 将手势的位移映射到动画值
        { useNativeDriver: false } // 手势动画不能使用原生驱动，因为需要实时更新位置
    );

    const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
        if (event.nativeEvent.state === State.END) { // 当手势结束时
            Animated.spring(panAnim, {
                toValue: { x: 0, y: 0 }, // 使用弹性动画回到原点
                useNativeDriver: false, // 不能使用原生驱动
            }).start();
        }
    };

    // 插值计算（值映射）
    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1], // 输入范围：0到1
        outputRange: ['0deg', '360deg'], // 输出范围：0度到360度
    });

    const backgroundColorInterpolate = interpolateAnim.interpolate({
        inputRange: [0, 0.5, 1], // 输入范围：0到1，中间值0.5
        outputRange: ['#ff0000', '#00ff00', '#0000ff'], // 输出范围：红色->绿色->蓝色
    });

    const scaleXInterpolate = interpolateAnim.interpolate({
        inputRange: [0, 1], // 输入范围：0到1
        outputRange: [0.5, 2], // 输出范围：水平缩放从0.5倍到2倍
    });

    return (
        <ScrollView style={styles.container} scrollIndicatorInsets={{ right: 1}}>
            <Text style={styles.title}>React Native Animated 用法示例</Text>

            {/* 1. 基础淡入淡出动画 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. 淡入淡出动画</Text>
                <Animated.View style={[styles.box, { opacity: fadeAnim }]}>
                    <Text style={styles.boxText}>淡入淡出</Text>
                </Animated.View>
                <TouchableOpacity style={styles.button} onPress={startFadeAnimation}>
                    <Text style={styles.buttonText}>开始淡入淡出</Text>
                </TouchableOpacity>
            </View>

            {/* 2. 缩放动画 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. 缩放动画 (Spring)</Text>
                <Animated.View style={[styles.box, { transform: [{ scale: scaleAnim }] }]}>
                    <Text style={styles.boxText}>缩放</Text>
                </Animated.View>
                <TouchableOpacity style={styles.button} onPress={startScaleAnimation}>
                    <Text style={styles.buttonText}>开始缩放</Text>
                </TouchableOpacity>
            </View>

            {/* 3. 位移动画 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. 位移动画</Text>
                <Animated.View 
                    style={[
                        styles.box, 
                        { 
                            transform: [{ translateX: translateAnim }],
                            backgroundColor: '#ff6b6b'
                        }
                    ]}
                >
                    <Text style={styles.boxText}>位移</Text>
                </Animated.View>
                <TouchableOpacity style={styles.button} onPress={startTranslateAnimation}>
                    <Text style={styles.buttonText}>开始位移</Text>
                </TouchableOpacity>
            </View>

            {/* 4. 旋转动画 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. 旋转动画</Text>
                <Animated.View 
                    style={[
                        styles.box, 
                        { 
                            transform: [{ rotate: rotateInterpolate }],
                            backgroundColor: '#4ecdc4'
                        }
                    ]}
                >
                    <Text style={styles.boxText}>旋转</Text>
                </Animated.View>
                <TouchableOpacity style={styles.button} onPress={startRotateAnimation}>
                    <Text style={styles.buttonText}>开始旋转</Text>
                </TouchableOpacity>
            </View>

            {/* 5. 组合动画 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>5. 组合动画 (Parallel)</Text>
                <Animated.View 
                    style={[
                        styles.box, 
                        { 
                            opacity: combinedAnim,
                            transform: [
                                { scale: scaleAnim },
                                { translateY: combinedAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -50],
                                })}
                            ],
                            backgroundColor: '#45b7d1'
                        }
                    ]}
                >
                    <Text style={styles.boxText}>组合</Text>
                </Animated.View>
                <TouchableOpacity 
                    style={[styles.button, isAnimating && styles.buttonDisabled]} 
                    onPress={startCombinedAnimation}
                    disabled={isAnimating}
                >
                    <Text style={styles.buttonText}>
                        {isAnimating ? '动画中...' : '开始组合动画'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* 6. 序列动画 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>6. 序列动画 (Sequence)</Text>
                <Animated.View 
                    style={[
                        styles.box, 
                        { 
                            transform: [
                                { translateX: translateAnim },
                                { scale: scaleAnim }
                            ],
                            backgroundColor: '#96ceb4'
                        }
                    ]}
                >
                    <Text style={styles.boxText}>序列</Text>
                </Animated.View>
                <TouchableOpacity style={styles.button} onPress={startSequenceAnimation}>
                    <Text style={styles.buttonText}>开始序列动画</Text>
                </TouchableOpacity>
            </View>

            {/* 7. 插值动画 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>7. 插值动画</Text>
                <Animated.View 
                    style={[
                        styles.box, 
                        { 
                            backgroundColor: backgroundColorInterpolate,
                            transform: [{ scaleX: scaleXInterpolate }],
                        }
                    ]}
                >
                    <Text style={styles.boxText}>插值</Text>
                </Animated.View>
                <TouchableOpacity style={styles.button} onPress={startInterpolateAnimation}>
                    <Text style={styles.buttonText}>开始插值动画</Text>
                </TouchableOpacity>
            </View>

            {/* 8. 循环动画 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>8. 循环动画 (Loop)</Text>
                <Animated.View 
                    style={[
                        styles.box, 
                        { 
                            transform: [{ scale: scaleAnim }],
                            backgroundColor: '#feca57'
                        }
                    ]}
                >
                    <Text style={styles.boxText}>循环</Text>
                </Animated.View>
                <TouchableOpacity style={styles.button} onPress={startLoopAnimation}>
                    <Text style={styles.buttonText}>开始循环动画</Text>
                </TouchableOpacity>
            </View>

            {/* 9. 手势动画 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>9. 手势动画 (PanGestureHandler)</Text>
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View 
                        style={[
                            styles.box, 
                            { 
                                transform: panAnim.getTranslateTransform(),
                                backgroundColor: '#ff9ff3'
                            }
                        ]}
                    >
                        <Text style={styles.boxText}>拖拽我</Text>
                    </Animated.View>
                </PanGestureHandler>
                <Text style={styles.hintText}>拖拽方块，松手后会自动回到原位</Text>
            </View>

            {/* 10. 动画配置说明 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>10. 动画配置说明</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Timing 动画配置：</Text>
                    <Text style={styles.infoText}>• duration: 动画持续时间（毫秒）- 控制动画的快慢</Text>
                    <Text style={styles.infoText}>• easing: 缓动函数 - 控制动画的加速度曲线</Text>
                    <Text style={styles.infoText}>• useNativeDriver: 是否使用原生驱动 - 提高性能，但只能用于transform和opacity</Text>
                    
                    <Text style={styles.infoTitle}>Spring 动画配置：</Text>
                    <Text style={styles.infoText}>• tension: 张力（默认 40）- 控制弹簧的"紧度"，值越大动画越快</Text>
                    <Text style={styles.infoText}>• friction: 摩擦力（默认 7）- 控制弹簧的"阻尼"，值越大动画越平滑</Text>
                    <Text style={styles.infoText}>• useNativeDriver: 是否使用原生驱动 - 提高性能</Text>
                    
                    <Text style={styles.infoTitle}>插值配置：</Text>
                    <Text style={styles.infoText}>• inputRange: 输入范围 - 动画值的范围</Text>
                    <Text style={styles.infoText}>• outputRange: 输出范围 - 映射后的目标值范围</Text>
                    <Text style={styles.infoText}>• extrapolate: 超出范围的处理方式 - clamp/extend/identity</Text>
                    
                    <Text style={styles.infoTitle}>动画组合：</Text>
                    <Text style={styles.infoText}>• parallel: 并行动画 - 多个动画同时执行</Text>
                    <Text style={styles.infoText}>• sequence: 序列动画 - 多个动画按顺序执行</Text>
                    <Text style={styles.infoText}>• loop: 循环动画 - 重复执行动画序列</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        alignSelf: 'center',
    },
    boxText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    hintText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 8,
    },
    infoContainer: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 6,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 6,
        color: '#333',
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
}); 