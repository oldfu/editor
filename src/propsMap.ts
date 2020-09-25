// this file map the component props to ant-design-vue form element
// every prop should have five props
// 1 component 确定对应是哪个 component
// 2 更改 value 的 事件名称
// 3 intialTransform 初始值的变换，有些初始值需要处理以后在传递给组件
// 4 afterTransform 触发更改以后，不同类型需要不同处理，因为 e 的值是不同的，或者需要回灌的值不同
// 5 text 属性对应的中文名称
// 6 给组件赋值的时候 属性的名称，一般是 value，也有可能是另外的，比如 checkbox 就是 checked
interface PropDetailType {
  component: string;
  eventName: string;
  intialTransform: (v: any) => any;
  afterTransform: (v: any) => any;
  text?: string;
  valueProp: string;
  subComponent?: string;
  options?: { text: string; value: any }[];
  extraProps?: { [key: string]: any };
}
interface MapTypes {
  [key: string]: PropDetailType;
}

const defaultMap = {
  component: 'a-input',
  eventName: 'change',
  valueProp: 'value',
  intialTransform: (v: any) => v,
  afterTransform: (e: any) => e
}
const numberToPxHandle = {
  ...defaultMap,
  component: 'a-input-number',
  intialTransform: (v: string) => v ? parseInt(v) : 0,
  afterTransform: (e: number) => e ? `${e}px` : '0'
}
const mapPropsToComponents: MapTypes = {
  text: {
    ...defaultMap,
    afterTransform: (e: any) => e.target.value,
    text: '文本'
  },
  href: {
    ...defaultMap,
    afterTransform: (e: any) => e.target.value,
    text: '链接'
  },
  fontSize: {
    ...numberToPxHandle,
    text: '字号'
  },
  fontWeight: {
    ...defaultMap,
    component: 'icon-switch',
    intialTransform: (v: string) => v === 'bold',
    afterTransform: (e: boolean) => e ? 'bold' : 'normal',
    valueProp: 'checked',
    extraProps: { iconName: 'BoldOutlined', tip: '加粗' }
  },
  fontStyle: {
    ...defaultMap,
    component: 'icon-switch',
    intialTransform: (v: string) => v === 'italic',
    afterTransform: (e: boolean) => e ? 'italic' : 'normal',
    valueProp: 'checked',
    extraProps: { iconName: 'ItalicOutlined', tip: '斜体' }
  },
  textDecoration: {
    ...defaultMap,
    component: 'icon-switch',
    intialTransform: (v: string) => v === 'underline',
    afterTransform: (e: boolean) => e ? 'underline' : 'none',
    valueProp: 'checked',
    extraProps: { iconName: 'UnderlineOutlined', tip: '下划线' }
  },
  lineHeight: {
    ...defaultMap,
    component: 'a-slider',
    text: '行高',
    extraProps: { min: 0, max: 10 }
  },
  textAlign: {
    ...defaultMap,
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    afterTransform: (e: any) => e.target.value,
    text: '对齐',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' }
    ]
  },
  color: {
    ...defaultMap,
    component: 'color-picker',
    text: '文字颜色'
  },
  backgroundColor: {
    ...defaultMap,
    component: 'color-picker',
    text: '背景颜色'
  },
  // actions
  actionType: {
    ...defaultMap,
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '点击',
    options: [
      { value: '', text: '无' },
      { value: 'to', text: '跳转到 URL' }
    ]
  },
  url: {
    ...defaultMap,
    afterTransform: (e: any) => e.target.value,
    text: '链接'
  },
  // sizes
  height: {
    ...defaultMap,
    component: 'a-input-number',
    intialTransform: (v: string) => v ? parseInt(v) : '',
    afterTransform: (e: number) => e ? `${e}px` : '',
    text: '高度'
  },
  width: {
    ...defaultMap,
    component: 'a-input-number',
    intialTransform: (v: string) => v ? parseInt(v) : '',
    afterTransform: (e: number) => e ? `${e}px` : '',
    text: '宽度'
  },
  paddingLeft: {
    ...numberToPxHandle,
    text: '左边距'
  },
  paddingRight: {
    ...numberToPxHandle,
    text: '右边距'
  },
  paddingTop: {
    ...numberToPxHandle,
    text: '上边距'
  },
  paddingBottom: {
    ...numberToPxHandle,
    text: '下边距'
  },
  // border types
  borderStyle: {
    ...defaultMap,
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '边框类型',
    options: [
      { value: 'none', text: '无' },
      { value: 'solid', text: '实线' },
      { value: 'dashed', text: '破折线' },
      { value: 'dotted', text: '点状线' }
    ]
  },
  borderColor: {
    ...defaultMap,
    component: 'color-picker',
    text: '边框颜色'
  },
  borderWidth: {
    ...defaultMap,
    component: 'a-slider',
    intialTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => e + 'px',
    text: '边框宽度',
    extraProps: { min: 0, max: 20 }
  },
  borderRadius: {
    ...defaultMap,
    component: 'a-slider',
    intialTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => e + 'px',
    text: '边框圆角',
    extraProps: { min: 0, max: 20 }
  },
  // shadow and opactiy
  opacity: {
    ...defaultMap,
    component: 'a-slider',
    text: '透明度',
    intialTransform: (v: number) => v ? v * 100 : 100,
    afterTransform: (e: number) => (e / 100),
    extraProps: { min: 0, max: 100, reverse: true }
  },
  boxShadow: {
    ...defaultMap,
    component: 'shadow-picker'
  },
  position: {
    ...defaultMap,
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '定位',
    options: [
      { value: '', text: '默认' },
      { value: 'absolute', text: '绝对定位' }
    ]
  },
  left: {
    ...numberToPxHandle,
    text: '位置X'
  },
  top: {
    ...numberToPxHandle,
    text: '位置Y'
  },
  imageSrc: {
    ...defaultMap,
    component: 'image-processer'
  },
  backgroundImage: {
    ...defaultMap,
    component: 'background-processer',
    intialTransform: (v: string) => {
      if (v) {
        const matches = v.match(/\((.*?)\)/)
        if (matches && matches.length > 1) {
          return matches[1].replace(/('|")/g, '')
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    afterTransform: (e: string) => e ? `url('${e}')` : '',
    extraProps: { ratio: 8 / 15, showDelete: true }
  }
}

export default mapPropsToComponents
