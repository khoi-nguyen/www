type Point = [number, number]

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`
type Color = RGB | RGBA | HEX | string

type BoardMode = 'draw' | 'erase' | 'readonly'
export type BoardEventName =
  | 'addBoard'
  | 'addStroke'
  | 'clearBoard'
  | 'removeBoard'
  | 'removeStroke'
  | 'slideChange'

export interface Stroke {
  color: string
  lineWidth: number
  points: Point[]
}

export default class Whiteboard {
  private container: HTMLElement
  private isActive: boolean = false

  public canvas: HTMLCanvasElement
  get ctx() {
    return this.canvas.getContext('2d')!
  }

  public color: Color = '#255994'
  public hasUnsavedChanges: boolean = false
  public lineWidth: number = 2
  public mode: BoardMode = 'draw'
  public strokes: Stroke[]

  get lastStroke(): Stroke {
    if (!this.strokes.length) {
      this.startStroke()
    }
    return this.strokes[this.strokes.length - 1]
  }

  /**
   * Add a point to the last stroke
   * @param point Point to add
   */
  addPoint(point: Point): void {
    if (this.lastStroke.points.length) {
      const lastPoint = this.lastStroke.points[this.lastStroke.points.length - 1]
      if (lastPoint[0] == point[0] && lastPoint[1] == point[1]) {
        return
      }
    }
    this.lastStroke.points.push(point)
    this.drawStroke(this.lastStroke)
  }

  changeBrush(color: Color, lineWidth: number) {
    this.lastStroke.color = color
    this.lastStroke.lineWidth = lineWidth
    this.color = color
    this.lineWidth = lineWidth
  }

  /**
   * Clear the whiteboard
   * @param removeStrokes Whether to remove the stored strokes
   */
  clearBoard(removeStrokes: boolean = false): void {
    if (removeStrokes) {
      this.emit('clearBoard', true)
      this.strokes.splice(0, this.strokes.length)
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  constructor(container: HTMLElement, canvas: HTMLCanvasElement, strokes: Stroke[] = []) {
    this.container = container
    this.canvas = canvas
    this.strokes = strokes
  }

  /**
   * Set up listeners on a canvas
   * @param container Used to calculate the offset
   */
  init() {
    Object.assign(this.canvas.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      cursor: 'crosshair',
      zIndex: 1,
    })

    this.canvas.oncontextmenu = () => false
    this.canvas.onselectstart = () => false
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
    this.setUpTouchEvents()

    this.redraw()
  }

  /**
   * Draw a stroke on the canvas
   * @param stroke Stroke to draw on the canvas
   */
  drawStroke(stroke: Stroke): void {
    this.ctx.beginPath()
    this.ctx.fillStyle = stroke.color
    this.ctx.strokeStyle = stroke.color
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this.ctx.lineWidth = stroke.lineWidth
    if (stroke.points.length < 6) {
      for (const point of stroke.points) {
        this.ctx.lineTo(...point)
      }
    } else {
      this.ctx.moveTo(...stroke.points[0])
      for (let i = 1; i < stroke.points.length - 2; i++) {
        let x = (stroke.points[i][0] + stroke.points[i + 1][0]) / 2
        let y = (stroke.points[i][1] + stroke.points[i + 1][1]) / 2
        this.ctx.quadraticCurveTo(...stroke.points[i], x, y)
      }
      const i = stroke.points.length - 2
      this.ctx.quadraticCurveTo(...stroke.points[i], ...stroke.points[i + 1])
    }
    this.ctx.stroke()
    this.ctx.closePath()
  }

  /**
   * Emit an event
   * @param eventName event name
   * @param data
   */
  emit(eventName: BoardEventName, data: any): void {
    const event = new CustomEvent('boardChange', { detail: { eventName, data } })
    this.canvas.dispatchEvent(event)
    this.hasUnsavedChanges = true
  }

  /**
   * Erase all strokes that contain a certain point
   * @param point Point
   */
  eraseStroke(point: Point): void {
    for (let i = 0; i < this.strokes.length; i++) {
      const stroke = this.strokes[i]
      for (const p of stroke.points) {
        const dist = (p[0] - point[0]) ** 2 + (p[1] - point[1]) ** 2
        if (dist <= 5) {
          this.emit('removeStroke', point)
          this.strokes.splice(i, 1)
          this.redraw()
          return
        }
      }
    }
  }

  /**
   * Mouse down event listener
   * @param event Mouse event
   */
  onMouseDown(event: MouseEvent): void {
    if (this.mode === 'readonly') {
      return
    }
    const leftClick = event.button === 0 || event.button === 1
    const rightClick = event.button === 2
    if (leftClick || rightClick) {
      this.isActive = true
      if (rightClick) {
        this.mode = 'erase'
      }
    }
  }

  /**
   * Mouse move event listener
   * @param event Mouse event
   */
  onMouseMove(event: MouseEvent): void {
    if (!this.isActive) {
      return
    }
    const boundingClientRect = this.canvas.getBoundingClientRect()
    const scaleX = this.canvas.offsetWidth / boundingClientRect.width
    const scaleY = this.canvas.offsetHeight / boundingClientRect.height
    const container = this.container.getBoundingClientRect()
    const x = Math.round((event.clientX - container.left) * scaleX)
    const y = Math.round((event.clientY - container.top) * scaleY)
    if (this.mode === 'draw') {
      this.addPoint([x, y])
    } else if (this.mode === 'erase') {
      this.eraseStroke([x, y])
    }
  }

  /**
   * Mouse up event listener
   * @param event Mouse event
   */
  onMouseUp(event: MouseEvent): void {
    this.isActive = false
    if (this.mode === 'draw') {
      this.emit('addStroke', this.lastStroke)
      this.redraw()
    }
    if (event.button === 2) {
      this.mode = 'draw'
    }
  }

  /**
   * Redraw all the strokes on the canvas
   */
  redraw(): void {
    this.clearBoard()
    for (const stroke of this.strokes) {
      this.drawStroke(stroke)
    }
    this.startStroke()
  }

  /**
   * Convert touch events to mouse events
   */
  setUpTouchEvents(): void {
    type TouchEventName = 'touchstart' | 'touchmove' | 'touchend'
    const convert = (touchEvent: TouchEventName, mouseEvent: string) => {
      this.canvas.addEventListener(touchEvent, (event: TouchEvent) => {
        this.canvas.dispatchEvent(
          new MouseEvent(mouseEvent, {
            clientX: event.targetTouches[0].clientX,
            clientY: event.targetTouches[0].clientY,
          }),
        )
      })
    }
    convert('touchstart', 'mousedown')
    convert('touchmove', 'mousemove')
    convert('touchend', 'mouseup')
  }

  /**
   * Start a new stroke
   */
  startStroke(): void {
    if (this.strokes.length && this.lastStroke.points.length === 0) {
      this.strokes.splice(this.strokes.length - 1, 1)
    }
    this.strokes.push({
      color: this.color,
      lineWidth: this.lineWidth,
      points: [],
    })
  }

  /**
   * Describe how JSON serialization should happen
   * @returns List of all the strokes on the whiteboard
   */
  toJSON(): Stroke[] {
    return this.strokes
  }
}
