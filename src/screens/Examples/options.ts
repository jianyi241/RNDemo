import ActivityIndicatorExample from './components/ActivityIndicatorExample';
import ButtonExample from './components/ButtonExample';
import FlatListExample from './components/FlatListExample';
import ImageExample from './components/ImageExample';
import ImageBackgroundExample from './components/ImageBackgroundExample';
import KeyboardAvoidingViewExample from './components/KeyboardAvoidingViewExample';
import ModalExample from './components/ModalExample';
import PressableExample from './components/PressableExample';
import RefreshControlExample from './components/RefreshControlExample';
import ScrollViewExample from './components/ScrollViewExample';
import SectionListExample from './components/SectionListExample';
import StatusBarExample from './components/StatusBarExample';
import SwitchExample from './components/SwitchExample';
import TextExample from './components/TextExample';
import TextInputExample from './components/TextInputExample';
import TouchableHighlightExample from './components/TouchableHighlightExample';
import TouchableOpacityExample from './components/TouchableOpacityExample';
import TouchableWithoutFeedbackExample from './components/TouchableWithoutFeedbackExample';
import ViewExample from './components/ViewExample';
import VirtualizedListExample from './components/VirtualizedListExample';

export const tabsList = [
    {
        id: 'ActivityIndicatorExample',
        title: 'ActivityIndicator',
        component: ActivityIndicatorExample,
        color: '#007AFF',
        description: '显示一个圆形的 loading 提示符号。'
    },
    {
        id: 'ButtonExample',
        title: 'Button',
        component: ButtonExample,
        color: '#FF6B6B',
        description: '一个简单的跨平台的按钮组件。可以进行一些简单的定制。'
    },
    {
        id: 'FlatListExample',
        title: 'FlatList',
        component: FlatListExample,
        color: '#FF6B6B',
        description: '一个简单的跨平台的列表组件。可以进行一些简单的定制。'
    },
    {
        id: 'ImageExample',
        title: 'Image',
        component: ImageExample,
        color: '#FF6B6B',
        description: '用于显示多种不同类型图片的 React 组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。'
    },
    {
        id: 'ImageBackgroundExample',
        title: 'ImageBackground',
        component: ImageBackgroundExample,
        color: '#FF6B6B',
        description: '对于熟悉 Web 开发的开发人员来说，background-image是一个常见的功能请求。为了处理这种情况，您可以使用<ImageBackground>组件，它具有与<Image>相同的属性，并且可以添加任何子元素以覆盖在其上面。'
    },
    {
        id: 'KeyboardAvoidingViewExample',
        title: 'KeyboardAvoidingView',
        component: KeyboardAvoidingViewExample,
        color: '#FF6B6B',
        description: '本组件用于解决一个常见的尴尬问题：\n手机上弹出的键盘常常会挡住当前的视图。本组件可以自动根据键盘的高度，调整自身的 height 或底部的 padding，以避免被遮挡。'
    },
    {
        id: 'ModalExample',
        title: 'Modal',
        component: ModalExample,
        color: '#FF6B6B',
        description: 'Modal 组件是一种简单的覆盖在其他视图之上显示内容的方式。'
    },
    {
        id: 'PressableExample',
        title: 'Pressable',
        component: PressableExample,
        color: '#FF6B6B',
        description: 'Pressable 是一个核心组件的封装，它可以检测到任意子组件的不同阶段的按压交互情况。'
    },
    {
        id: 'RefreshControlExample',
        title: 'RefreshControl',
        component: RefreshControlExample,
        color: '#4ECDC4',
        description: '这一组件可以用在 ScrollView 或 FlatList 内部，为其添加下拉刷新的功能。当 ScrollView 处于竖直方向的起点位置（scrollY: 0），此时下拉会触发一个onRefresh事件。'
    },
    {
        id: 'ScrollViewExample',
        title: 'ScrollView',
        component: ScrollViewExample,
        color: '#4ECDC4',
        description: '一个封装了平台的 ScrollView（滚动视图）的组件，同时还集成了触摸锁定的“响应者”系统。'
    },
    {
        id: 'SectionListExample',
        title: 'SectionList',
        component: SectionListExample,
        color: '#4ECDC4',
        description: '高性能的分组(section)列表组件。'
    },
    {
        id: 'StatusBarExample',
        title: 'StatusBar',
        component: StatusBarExample,
        color: '#FF9800',
        description: '控制应用状态栏的组件。（currentHeight (仅限 Android)状态栏的当前高度,IOS使用 0，因为 iOS 会自动处理状态栏）'
    },
    {
        id: 'SwitchExample',
        title: 'Switch',
        component: SwitchExample,
        color: '#FF9800',
        description: '跨平台通用的“开关”组件。\n注意这是一个“受控组件”（controlled component）。你必须使用onValueChange回调来更新value属性以响应用户的操作。如果不更新value属性，组件只会按一开始给定的value值来渲染且保持不变，看上去就像完全点不动。'
    },
    {
        id: 'TextExample',
        title: 'Text',
        component: TextExample,
        color: '#FF9800',
        description: '一个用于显示文本的 React 组件，并且它也支持嵌套、样式，以及触摸处理。\n在下面的例子里，嵌套的标题和正文文字会继承来自styles.baseText的fontFamily字体样式，不过标题上还附加了它自己额外的样式。标题和文本会在顶部依次堆叠，并且被代码中内嵌的换行符分隔开。'
    },
    {
        id: 'TextInputExample',
        title: 'TextInput',
        component: TextInputExample,
        color: '#FF9800',
        description: 'TextInput 是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。'
    },
    {
        id: 'TouchableHighlightExample',
        title: 'TouchableHighlight',
        component: TouchableHighlightExample,
        color: '#FF9800',
        description: '我们建议使用Pressable组件，它更具扩展性且会是官方未来力推的主流。\n本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮。\n在底层实现上，实际会创建一个新的视图到视图层级中，如果使用的方法不正确，有时候会导致一些不希望出现的视觉效果。譬如没有给视图的 backgroundColor 显式声明一个不透明的颜色。\n注意TouchableHighlight只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个 View 来包装它们。'
    },
    {
        id: 'TouchableOpacityExample',
        title: 'TouchableOpacity',
        component: TouchableOpacityExample,
        color: '#FF9800',
        description: '我们建议使用Pressable组件，它更具扩展性且会是官方未来力推的主流。\n本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低。\n不透明度的变化是通过把子元素封装在一个Animated.View中来实现的，这个动画视图会被添加到视图层级中，少数情况下有可能会影响到布局。（译注：此组件与 TouchableHighlight 的区别在于并没有额外的颜色变化，更适于一般场景。）'
    },
    {
        id: 'TouchableWithoutFeedbackExample',
        title: 'TouchableWithoutFeedback',
        component: TouchableWithoutFeedbackExample,
        color: '#FF9800',
        description: '我们建议使用Pressable组件，它更具扩展性且会是官方未来力推的主流。\n除非你有一个很好的理由，否则不要用这个组件。所有能够响应触屏操作的元素在触屏后都应该有一个视觉上的反馈（然而本组件没有任何视觉反馈），这也是为什么一个"web"应用总是显得不够"原生"的主要原因之一。\n注意TouchableWithoutFeedback只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个 View 来包装它们。\n译注：常见的使用场景比如想实现点击空白处触发某个操作，那么就可以把空白部分用TouchableWithoutFeedback包起来，或者绝对定位覆盖住。'
    },
    {
        id: 'ViewExample',
        title: 'View',
        component: ViewExample,
        color: '#FF9800',
        description: '作为创建 UI 时最基础的组件，View 是一个支持 Flexbox 布局、样式、触摸响应、和一些无障碍功能的容器。不论在什么平台上，View 都直接对应当前平台的原生视图，无论它是 UIView、div 还是 android.view.View。\nView 在设计上是可以嵌套使用的，也可以有任意多个任意类型的子视图。\n下面的例子创建了一个 View，包含了两个有颜色的方块和一个自定义的组件，并且设置了一个内边距：'
    },
    {
        id: 'VirtualizedListExample',
        title: 'VirtualizedList',
        component: VirtualizedListExample,
        color: '#FF9800',
        description: 'FlatList和SectionList的底层实现。FlatList 和 SectionList 使用起来更方便，同时也有相对更详细的文档。一般来说，仅当想获得比 FlatList 更高的灵活性（比如说在使用 immutable data 而不是 普通数组）的时候，你才应该考虑使用 VirtualizedList。'
    }
]