## wxMiniCanvasSignture
小程序canvas电子签名(兼容2d)

![预览图](https://github.com/Qiu-Jun/wxMiniCanvasSignture/blob/main/demo/imgs/introduct.jpg)

+ Usage
```bash
npm i wx_signture
```

+ 小程序npm包构建

```json
// index.json
{
    "pageOrientation": "landscape",
    "usingComponents": {
        "demo": "wx_mini_signture"
    }
}
```

```html
<!-- canvasType="2d" 是用canvas 2d , 要用旧的可以不用canvasType这个属性 -->
<view style="width: 100vw;height: 100vh; overflow: hidden;">
    <demo
        canvasType="2d"
        bind:signtureConfirm="onConfirm"
    />
</view>
```

```javascript
Page({
    onConfirm(e) {
        console.log(e)
    }
})
```

## 属性
| canvasType |  是否必填  |  类型   |  默认  | 可选值 |
| --- | --- | --- | --- | ---- |
| canvasType | 非  | String | 2d |  2d or '' |
| confirmText | 非  | String | 确认 |  any string |
| confirmTextColor | 非  | String | #fff | 颜色 |
| confirmBg | 非  | String | #f34250 | 颜色 |
| resetText | 非  | String | 重置 | any string |
| resetTextColor | 非  | String | #333 |  颜色 |
| resetBg | 非  | String | #fff |  颜色  |
| defaultText | 非  | String | 请签名 |  any string |
| defaultTextColor | 非  | String | #616165 |  颜色 |
| signtureLineWidth | 非  | Number | 2 | int number |
| signtureColor | 非  | String | #333 | 颜色 |

## TODO
- [x] 实现旧版canvas签名
- [x] 实现canvas 2d签名
- [x] 打包发布npm
- [x] 切换2d模式(当前默认使用canvas 2d)
