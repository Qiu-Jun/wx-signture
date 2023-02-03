import canvasConfig from './config'

function create2dCtx() {
    const { windowWidth, windowHeight, pixelRatio } = this.data.windowInfo
    const query = wx.createSelectorQuery()
    return new Promise((resolve) => {
        query.select('#signture')
            .fields({ node: true, size: true })
            .exec((res) => {
                const canvas = res[0].node
                canvas.width = windowWidth * pixelRatio
                canvas.height = windowHeight * pixelRatio
                const ctx = canvas.getContext('2d') || null
                ctx.scale(pixelRatio, pixelRatio)
                resolve({
                    ctx,
                    canvas
                })
        })
    })
}

function clearCanvas(ctx) {
    if(!ctx) throw new Error('请传入canvas对象')
    const { windowWidth, windowHeight } = this.data.windowInfo
    ctx.clearRect(0, 0, windowWidth, windowHeight)
    ctx.lineGap = 'round'
    ctx.lineJoin = 'round'
    ctx.textAlign = 'center'
    ctx.lineWidth = canvasConfig.signtrueLineWidth  ; // 字体粗细
    ctx.font = '20px Arial' // 字体大小，
    ctx.fillStyle = canvasConfig.defaultTextColor // 填充颜色
    ctx.fillText('请在灰色区域内完成签名', windowWidth / 2, windowHeight / 2)
    ctx.save()
} 

function canvasStart(ctx, target) {
    if(!ctx) throw new Error('请传入canvas对象')
    const { windowWidth, windowHeight } = this.data.windowInfo
    const { clientX, clientY } = target.changedTouches[0]
    if(!this.drawCount) {
        ctx.clearRect(0, 0, windowWidth, windowHeight);
    }
    ctx.beginPath()
    ctx.moveTo(clientX, clientY)
    this.drawCount ++
}

function canvasMove(ctx, target) {
    if(!ctx) throw new Error('请传入canvas对象')
    const { clientX, clientY } = target.changedTouches[0]
    ctx.lineTo(clientX, clientY)
    ctx.stroke()
}

export default {
    create2dCtx,
    clearCanvas,
    canvasStart,
    canvasMove
}