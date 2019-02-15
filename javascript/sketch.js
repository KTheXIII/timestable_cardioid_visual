let total
let r
let factor
let rotationOffset
let counter
let dotRadius
let paddingFactor
let x1 = 0
let x2 = 15
let animate
let origCounter = 0.01

function setup() {
    createCanvas(windowWidth, windowHeight).addClass('noselect')
    totalInputUpdate()
    animate = select('#animateValueToF').mousePressed(animateToF)
    select('#totalNum').input(totalInputUpdate)
    select('#totalSliderValue').input(totalSliderUpdate)
    select('#xoneLimit').input(updateLimit)
    select('#xtwoLimit').input(updateLimit)
    select('#factorSliderValue').input(factorSlider)
    select('#factorNum').input(factorInputUpdate)

    // select('#totalSliderValue').input(totalSliderUpdate)
    factor = 2
    counter = origCounter
    rotationOffset = PI
    paddingFactor = 0.9
    calculateRadius()
}

function draw() {
    translate(width / 2, height / 2)
    drawTimesTable()
    updateFactorNum()
}

function drawTimesTable() {
    background(0)

    stroke(255)
    noFill()
    ellipse(0, 0, r * 2)

    if (animate.checked()) factor += counter

    for (let i = 0; i < total; i++) {
        let v = getVector(i, total)
        // let hue = map(factor, 0, x2, 0, 1)
        let hue = map(i, 0, total, 0, 0.1)
        let colorArr = hslToRgb(0.503, 1, 0.5)
        fill(colorArr[0], colorArr[1], colorArr[2])
        stroke(colorArr[0], colorArr[1], colorArr[2])
        ellipse(v.x, v.y, dotRadius * 2)

        let a = getVector(i, total)
        let b = getVector(i * factor, total)
        line(a.x, a.y, b.x, b.y)
    }

    if (factor > x2 || factor < x1) counter *= -1
}

function calculateRadius() {
    if (width < height) r = (width / 2) * paddingFactor
    else r = (height / 2) * paddingFactor
    dotRadius = r * 0.008
}

function getVector(index, total) {
    let angle = map(index % total, 0, total, 0, TWO_PI)
    let v = p5.Vector.fromAngle(angle + rotationOffset)
    v.mult(r)
    return v
}

function factorInputUpdate() {
    factor = parseFloat(select('#factorNum').value())
    drawTimesTable()
}

function updateFactorNum() {
    select('#factorSliderValue').value(map(factor, x1, x2, 0, 1000))
    select('#factorNum').value(factor.toFixed(2))
    select('#currentFactorNum').html('x=' + factor.toFixed(1))
}

function factorSlider() {
    // translate(0, 0)
    factor = map(select('#factorSliderValue').value(), 0, 1000, x1, x2)
    updateFactorNum()
    drawTimesTable()
}

function totalInputUpdate() {
    total = parseInt(select('#totalNum').value())
    select('#totalSliderValue').attribute('max', total)
    select('#totalSliderValue').value(total)
}

function updateLimit() {
    x1 = select('#xoneLimit').value()
    x2 = select('#xtwoLimit').value()
}

function totalSliderUpdate() {
    total = select('#totalSliderValue').value()
    select('#totalNum').value(total)
    drawTimesTable()
}

function animateToF() {
    if (!animate.checked()) {
        factor = 0
        loop()
    } else {
        noLoop()
    }
    console.log(animate.checked())
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    calculateRadius()
}
