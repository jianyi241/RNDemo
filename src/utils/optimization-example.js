// 按需引用示例 - 只打包使用的方法

// ✅ 好的做法 - 按需引用
import { map, filter, reduce } from 'lodash';
// 只会打包 map, filter, reduce 这三个方法

// ❌ 不好的做法 - 全量引用
// import _ from 'lodash';
// 会打包整个 lodash 库

// 使用示例
const numbers = [1, 2, 3, 4, 5];

// 只使用 map 和 filter
const doubled = map(numbers, n => n * 2);
const evenNumbers = filter(numbers, n => n % 2 === 0);

// 按需引用 dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

// 只加载需要的插件和语言包
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

// 按需引用 React Native 组件
import { View, Text, TouchableOpacity } from 'react-native';
// 只打包使用到的组件

// 按需引用导航组件
import { createStackNavigator } from '@react-navigation/stack';
// 只打包 stack navigator，不包含 drawer 或 tab navigator

export { doubled, evenNumbers, dayjs }; 