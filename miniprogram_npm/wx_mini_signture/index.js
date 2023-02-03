import canvas from './modules/canvas'
import canvas2d from './modules/canvas2d'

const CANVASTYPE = '2d' // 是否为canvas 2d  '' or '2d'
let ctx = null
let _cavans = null

Component({
    data: {
        is2d: CANVASTYPE === '2d', 
        windowInfo: null, // 窗口信息 
    },

    lifetimes: {
        async ready () {
            let winInfo = null 
            if(!wx.canIUse('getWindowInfo')) {
                winInfo = await wx.getSystemInfoSync()
            } else {
                winInfo = wx.getWindowInfo() 
            }
            const { is2d } = this.data
            this.drawCount = 0 // 等于0时，绘制会初始化，重置直接设置为0， 确认如果可以继续绘制那么就不用设置为0
            this.setData({
                windowInfo: winInfo
            }, async () => {
                if(!ctx) {
                    const { ctx: _ctx, canvas } = is2d ? await this.create2dCtx(ctx) :  this.createCtx(ctx)
                    ctx = _ctx
                    _cavans = canvas
                    this.clearCanvas(ctx)
                }
            })
        },

        detached () {
            ctx = null
            _cavans = null
            this.drawCount = 0
        },
    },

    methods: {
        ...((CANVASTYPE && CANVASTYPE === '2d') ? canvas2d : canvas),

        onTouchStart(e) {
            this.canvasStart(ctx, e)
        },
    
        onTouchMove(e) {
            this.canvasMove(ctx, e)
        },
    
        onBtn(e) {
            const type = e.target.dataset.type
            if(!this.drawCount) return
            const { is2d, windowInfo } = this.data
            const { windowWidth, windowHeight, pixelRatio } = windowInfo
            switch(type) {
                case 'reset':
                    this.clearCanvas(ctx)
                    this.drawCount = 0
                    break;
                case 'confirm':
                    wx.canvasToTempFilePath({
                        canvasId: 'signture',
                        canvas: is2d ? _cavans : null,
                        width: windowWidth,
                        height: windowHeight,
                        destWidth: windowWidth * pixelRatio,
                        destHeight: windowHeight * pixelRatio,
                        fileType: 'png',
                        success: res => {
                            if(res.tempFilePath) {
                                this.triggerEvent('signtureConfirm', {
                                    tempFilePath: res.tempFilePath
                                })
                                // wx.navigateTo({
                                //   url: `/pages/test/test?path=${res.tempFilePath}`,
                                // })
                            }
                        },
                        fail: err => console.log(err)
                    }, this)
                    break;
                default:
                    break;
            }
            
        }
    }
})