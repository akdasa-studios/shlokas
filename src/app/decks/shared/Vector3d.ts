export class Vector3d {
  constructor(
    public x: number,
    public y: number,
    public z: number
  ) { }

  get length() {
    return Math.sqrt(
      Math.pow(this.x, 2) +
      Math.pow(this.y, 2) +
      Math.pow(this.z, 2)
    )
  }

  get direction() {
    const xaxis = Math.abs(this.x) > Math.abs(this.y)
    return (
      xaxis &&  this.x > 0 ? "right" :
      xaxis &&  this.x < 0 ? "left" :
      !xaxis && this.y > 0 ? "bottom" :
      !xaxis && this.y < 0 ? "top" : "unknown"
    )
  }

  get isLeftOrRight() {
    return ["left", "right"].includes(this.direction)
  }
}