function createCtx() {
    const ctx = wx.createCanvasContext('signture', this)
    return  {
        ctx,
        canvas: null // 2d 时需要的，这里直接null
    }
}

function clearCanvas(ctx) {
    if(!ctx) throw new Error('请传入canvas对象')
    const windowInfo = this.data.windowInfo
    const { windowWidth, windowHeight } = windowInfo || {}
    const { defaultText, defaultTextColor } = this.data
    ctx.setTextBaseline('top')
    ctx.setTextAlign('center')
    ctx.setFontSize(20)
    ctx.setFillStyle(defaultTextColor); 
    ctx.fillText(defaultText, windowWidth / 2, windowHeight / 2 - 20)
    ctx.draw(false)
}

function canvasStart(ctx, target) {
    if(!ctx) throw new Error('请传入canvas对象')
    const { clientX, clientY } = target.changedTouches[0]
    if(!this.drawCount) {
        ctx.draw(false)
    }
    this.drawCount ++
    ctx.moveTo(clientX, clientY)
}

function canvasMove(ctx, target) {
    if(!ctx) throw new Error('请传入canvas对象')
    const { clientX, clientY } = target.changedTouches[0]
    const { signtureLineWidth, signtureColor } = this.data
    if (target.touches.length > 1) return
    ctx.setStrokeStyle(signtureColor)
    ctx.setLineWidth(signtureLineWidth)
    ctx.setShadow(0, 0, 0.5, '#000000')
    ctx.setLineCap('round')
    ctx.setLineJoin('round')
    ctx.lineTo(clientX, clientY)
    ctx.stroke()
    ctx.draw(true)
    ctx.moveTo(clientX, clientY)
}

export default {
    createCtx,
    clearCanvas,
    canvasStart,
    canvasMove
}