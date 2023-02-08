function create2dCtx(ctx) {
    const { windowWidth, windowHeight, pixelRatio } = this.data.windowInfo
    const query = this.createSelectorQuery()
    return new Promise((resolve) => {
        query.select('#signture')
            .fields({ node: true, size: true })
            .exec((res) => {
                if(res[0]) {
                    const canvas = res[0].node
                    canvas.width = windowWidth * pixelRatio
                    canvas.height = windowHeight * pixelRatio
                    const ctx = canvas.getContext('2d') || null
                    ctx.scale(pixelRatio, pixelRatio)
                    resolve({ 
                        ctx,
                        canvas
                    })
                }
        })
    })
}

function clearCanvas(ctx) {
    if(!ctx) throw new Error('请传入canvas对象')
    const { windowWidth, windowHeight } = this.data.windowInfo
    const { defaultText, defaultTextColor, signtureLineWidth } = this.data
    ctx.clearRect(0, 0, windowWidth, windowHeight)
    ctx.lineGap = 'round'
    ctx.lineJoin = 'round'
    ctx.textAlign = 'center'
    ctx.lineWidth = signtureLineWidth // 字体粗细
    ctx.font = '20px Arial' // 字体大小，
    ctx.fillStyle = defaultTextColor// 填充颜色
    ctx.fillText(defaultText, windowWidth / 2, windowHeight / 2)
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
    const { signtureLineWidth, signtureColor } = this.data
    ctx.lineTo(clientX, clientY)
    ctx.lineWidth = signtureLineWidth // 字体粗细
    ctx.strokeStyle = signtureColor // 填充颜色
    ctx.stroke()
}

export default {
    create2dCtx,
    clearCanvas,
    canvasStart,
    canvasMove
}