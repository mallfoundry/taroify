export const PARTICLE_COUNT = 5600

export interface ParticleShape {
  id: string
  label: string
  layout: ParticleLayout
  positions: Float32Array
}

type Random = () => number
type Point = [number, number, number]
type ParticleLayout = "bands" | "clusters" | "diagonal" | "scatter" | "wave"

interface Transform {
  x: number
  y: number
  rotate?: number
  scale?: number
  z?: number
}

function createRandom(seed: number): Random {
  let state = seed >>> 0

  return () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function splitCount(total: number, weights: number[]) {
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0)
  const counts = weights.map((weight) => Math.floor((total * weight) / weightTotal))
  counts[counts.length - 1] += total - counts.reduce((sum, count) => sum + count, 0)
  return counts
}

function toPositions(points: Point[]) {
  const positions = new Float32Array(PARTICLE_COUNT * 3)

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const point = points[index % points.length] ?? [0, 0, 0]
    positions[index * 3] = point[0]
    positions[index * 3 + 1] = point[1]
    positions[index * 3 + 2] = point[2]
  }

  return positions
}

function transformPoints(points: Point[], transform: Transform) {
  const scale = transform.scale ?? 1
  const rotation = transform.rotate ?? 0
  const cosine = Math.cos(rotation)
  const sine = Math.sin(rotation)

  return points.map(([pointX, pointY, pointZ]) => {
    const x = pointX * scale
    const y = pointY * scale
    return [
      x * cosine - y * sine + transform.x,
      x * sine + y * cosine + transform.y,
      pointZ * scale + (transform.z ?? 0),
    ] satisfies Point
  })
}

function sampleLine(
  count: number,
  start: [number, number],
  end: [number, number],
  random: Random,
  jitter = 0.025,
) {
  const points: Point[] = []
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const length = Math.hypot(dx, dy) || 1
  const normalX = -dy / length
  const normalY = dx / length

  for (let index = 0; index < count; index += 1) {
    const progress = random()
    const offset = (random() - 0.5) * jitter
    points.push([
      start[0] + dx * progress + normalX * offset,
      start[1] + dy * progress + normalY * offset,
      (random() - 0.5) * 0.1,
    ])
  }

  return points
}

function sampleArc(
  count: number,
  center: [number, number],
  radius: number,
  startAngle: number,
  endAngle: number,
  random: Random,
  thickness = 0.035,
) {
  const points: Point[] = []

  for (let index = 0; index < count; index += 1) {
    const angle = startAngle + (endAngle - startAngle) * random()
    const localRadius = radius + (random() - 0.5) * thickness
    points.push([
      center[0] + Math.cos(angle) * localRadius,
      center[1] + Math.sin(angle) * localRadius,
      (random() - 0.5) * 0.14,
    ])
  }

  return points
}

function sampleCircleFill(count: number, center: [number, number], radius: number, random: Random) {
  const points: Point[] = []

  for (let index = 0; index < count; index += 1) {
    const angle = random() * Math.PI * 2
    const localRadius = Math.sqrt(random()) * radius
    points.push([
      center[0] + Math.cos(angle) * localRadius,
      center[1] + Math.sin(angle) * localRadius,
      (random() - 0.5) * 0.16,
    ])
  }

  return points
}

function sampleRoundedRectBorder(
  count: number,
  width: number,
  height: number,
  radius: number,
  random: Random,
) {
  const points: Point[] = []
  const straightX = width - radius * 2
  const straightY = height - radius * 2
  const arcLength = (Math.PI * radius) / 2
  const segmentLengths = [
    straightX,
    arcLength,
    straightY,
    arcLength,
    straightX,
    arcLength,
    straightY,
    arcLength,
  ]
  const perimeter = segmentLengths.reduce((sum, length) => sum + length, 0)

  for (let index = 0; index < count; index += 1) {
    let distance = random() * perimeter
    let segment = 0

    while (distance > segmentLengths[segment] && segment < segmentLengths.length - 1) {
      distance -= segmentLengths[segment]
      segment += 1
    }

    const progress = distance / segmentLengths[segment]
    let x = 0
    let y = 0

    switch (segment) {
      case 0:
        x = -width / 2 + radius + straightX * progress
        y = height / 2
        break
      case 1: {
        const angle = Math.PI / 2 - (Math.PI / 2) * progress
        x = width / 2 - radius + Math.cos(angle) * radius
        y = height / 2 - radius + Math.sin(angle) * radius
        break
      }
      case 2:
        x = width / 2
        y = height / 2 - radius - straightY * progress
        break
      case 3: {
        const angle = -(Math.PI / 2) * progress
        x = width / 2 - radius + Math.cos(angle) * radius
        y = -height / 2 + radius + Math.sin(angle) * radius
        break
      }
      case 4:
        x = width / 2 - radius - straightX * progress
        y = -height / 2
        break
      case 5: {
        const angle = -Math.PI / 2 - (Math.PI / 2) * progress
        x = -width / 2 + radius + Math.cos(angle) * radius
        y = -height / 2 + radius + Math.sin(angle) * radius
        break
      }
      case 6:
        x = -width / 2
        y = -height / 2 + radius + straightY * progress
        break
      default: {
        const angle = Math.PI + (Math.PI / 2) * progress
        x = -width / 2 + radius + Math.cos(angle) * radius
        y = height / 2 - radius + Math.sin(angle) * radius
      }
    }

    const jitter = (random() - 0.5) * 0.045
    points.push([x + jitter, y + jitter, (random() - 0.5) * 0.14])
  }

  return points
}

function createButton(count: number, random: Random, width = 2.8, height = 0.78) {
  const [borderCount, iconCount, labelCount] = splitCount(count, [0.52, 0.18, 0.3])
  return [
    ...sampleRoundedRectBorder(borderCount, width, height, height * 0.48, random),
    ...sampleCircleFill(iconCount, [-width * 0.31, 0], height * 0.12, random),
    ...sampleLine(labelCount, [-width * 0.12, 0], [width * 0.29, 0], random, height * 0.09),
  ]
}

function createSwitch(count: number, random: Random) {
  const [borderCount, knobCount, statusCount] = splitCount(count, [0.46, 0.38, 0.16])
  return [
    ...sampleRoundedRectBorder(borderCount, 2.3, 1.08, 0.52, random),
    ...sampleCircleFill(knobCount, [0.62, 0], 0.38, random),
    ...sampleLine(statusCount, [-0.72, 0], [-0.26, 0], random, 0.09),
  ]
}

function createSlider(count: number, random: Random) {
  const [trackCount, valueCount, knobCount, tickCount] = splitCount(count, [0.28, 0.24, 0.32, 0.16])
  return [
    ...sampleLine(trackCount, [-1.8, 0], [1.8, 0], random, 0.055),
    ...sampleLine(valueCount, [-1.8, 0], [0.54, 0], random, 0.1),
    ...sampleCircleFill(knobCount, [0.54, 0], 0.27, random),
    ...sampleLine(tickCount, [1.38, -0.21], [1.38, 0.21], random, 0.045),
  ]
}

function createLoading(count: number, random: Random) {
  const [outerCount, innerCount, coreCount] = splitCount(count, [0.47, 0.38, 0.15])
  return [
    ...sampleArc(outerCount, [0, 0], 0.94, -Math.PI * 0.1, Math.PI * 1.35, random, 0.055),
    ...sampleArc(innerCount, [0, 0], 0.58, Math.PI * 0.22, Math.PI * 1.7, random, 0.045),
    ...sampleCircleFill(coreCount, [0, 0], 0.14, random),
  ]
}

function createCell(count: number, random: Random, width = 3.6) {
  const [borderCount, iconCount, titleCount, descriptionCount, chevronCount] = splitCount(
    count,
    [0.35, 0.2, 0.18, 0.15, 0.12],
  )
  return [
    ...sampleRoundedRectBorder(borderCount, width, 1.18, 0.28, random),
    ...sampleArc(iconCount, [-width * 0.34, 0], 0.28, 0, Math.PI * 2, random, 0.05),
    ...sampleLine(titleCount, [-width * 0.19, 0.19], [width * 0.19, 0.19], random, 0.07),
    ...sampleLine(descriptionCount, [-width * 0.19, -0.18], [width * 0.09, -0.18], random, 0.055),
    ...sampleLine(
      Math.floor(chevronCount / 2),
      [width * 0.34, 0.2],
      [width * 0.43, 0],
      random,
      0.035,
    ),
    ...sampleLine(
      chevronCount - Math.floor(chevronCount / 2),
      [width * 0.43, 0],
      [width * 0.34, -0.2],
      random,
      0.035,
    ),
  ]
}

function createTabs(count: number, random: Random) {
  const [borderCount, dividerCount, underlineCount, labelCount] = splitCount(
    count,
    [0.42, 0.18, 0.18, 0.22],
  )
  const perDivider = Math.floor(dividerCount / 2)
  const perLabel = Math.floor(labelCount / 3)
  return [
    ...sampleRoundedRectBorder(borderCount, 4.3, 0.92, 0.43, random),
    ...sampleLine(perDivider, [-0.72, -0.43], [-0.72, 0.43], random, 0.035),
    ...sampleLine(dividerCount - perDivider, [0.72, -0.43], [0.72, 0.43], random, 0.035),
    ...sampleLine(underlineCount, [-1.72, -0.27], [-0.88, -0.27], random, 0.09),
    ...sampleLine(perLabel, [-1.72, 0.08], [-0.88, 0.08], random, 0.055),
    ...sampleLine(perLabel, [-0.39, 0.08], [0.39, 0.08], random, 0.055),
    ...sampleLine(labelCount - perLabel * 2, [0.99, 0.08], [1.72, 0.08], random, 0.055),
  ]
}

function createSearch(count: number, random: Random) {
  const [borderCount, lensCount, handleCount, textCount] = splitCount(
    count,
    [0.48, 0.21, 0.08, 0.23],
  )
  return [
    ...sampleRoundedRectBorder(borderCount, 3.9, 0.92, 0.44, random),
    ...sampleArc(lensCount, [-1.37, 0.06], 0.2, 0, Math.PI * 2, random, 0.04),
    ...sampleLine(handleCount, [-1.23, -0.09], [-1.05, -0.27], random, 0.035),
    ...sampleLine(textCount, [-0.72, 0], [0.95, 0], random, 0.065),
  ]
}

function createInputStack(count: number, random: Random) {
  const counts = splitCount(count, [0.34, 0.33, 0.33])
  const points: Point[] = []

  counts.forEach((fieldCount, index) => {
    const [borderCount, labelCount, iconCount] = splitCount(fieldCount, [0.56, 0.29, 0.15])
    const y = 1.02 - index * 1.02
    points.push(
      ...transformPoints(sampleRoundedRectBorder(borderCount, 3.7, 0.76, 0.2, random), {
        x: 0,
        y,
      }),
      ...sampleLine(labelCount, [-1.35, y], [0.42 + index * 0.16, y], random, 0.055),
      ...sampleCircleFill(iconCount, [1.32, y], 0.12, random),
    )
  })

  return points
}

function createKeypad(count: number, random: Random) {
  const [panelCount, keyCount, actionCount] = splitCount(count, [0.22, 0.62, 0.16])
  const points = sampleRoundedRectBorder(panelCount, 3.25, 3.25, 0.35, random)
  const perKey = Math.floor(keyCount / 9)

  for (let index = 0; index < 9; index += 1) {
    const x = (index % 3) * 0.86 - 0.86
    const y = 0.88 - Math.floor(index / 3) * 0.86
    const currentCount = index === 8 ? keyCount - perKey * 8 : perKey
    points.push(...sampleArc(currentCount, [x, y], 0.25, 0, Math.PI * 2, random, 0.04))
  }

  points.push(...sampleLine(actionCount, [-0.58, -1.33], [0.58, -1.33], random, 0.09))
  return points
}

function createNotice(count: number, random: Random) {
  const [borderCount, iconCount, lineCount] = splitCount(count, [0.5, 0.24, 0.26])
  return [
    ...sampleRoundedRectBorder(borderCount, 3.2, 0.82, 0.2, random),
    ...sampleArc(iconCount, [-1.15, 0], 0.18, 0, Math.PI * 2, random, 0.04),
    ...sampleLine(lineCount, [-0.7, 0], [0.94, 0], random, 0.065),
  ]
}

function createCheckboxGroup(count: number, random: Random) {
  const points: Point[] = []
  const perItem = Math.floor(count / 3)

  for (let index = 0; index < 3; index += 1) {
    const currentCount = index === 2 ? count - perItem * 2 : perItem
    const [circleCount, checkCount, lineCount] = splitCount(currentCount, [0.48, 0.2, 0.32])
    const y = 0.78 - index * 0.78
    points.push(
      ...sampleArc(circleCount, [-0.94, y], 0.22, 0, Math.PI * 2, random, 0.04),
      ...sampleLine(Math.floor(checkCount / 2), [-1.05, y], [-0.95, y - 0.1], random, 0.035),
      ...sampleLine(
        checkCount - Math.floor(checkCount / 2),
        [-0.95, y - 0.1],
        [-0.79, y + 0.11],
        random,
        0.035,
      ),
      ...sampleLine(lineCount, [-0.5, y], [0.95, y], random, 0.06),
    )
  }

  return points
}

function createStepper(count: number, random: Random) {
  const [borderCount, dividerCount, minusCount, plusCount] = splitCount(
    count,
    [0.48, 0.2, 0.14, 0.18],
  )
  const perDivider = Math.floor(dividerCount / 2)
  const verticalPlus = Math.floor(plusCount / 2)
  return [
    ...sampleRoundedRectBorder(borderCount, 3.1, 0.92, 0.22, random),
    ...sampleLine(perDivider, [-0.73, -0.44], [-0.73, 0.44], random, 0.035),
    ...sampleLine(dividerCount - perDivider, [0.73, -0.44], [0.73, 0.44], random, 0.035),
    ...sampleLine(minusCount, [-1.28, 0], [-0.92, 0], random, 0.06),
    ...sampleLine(Math.floor(plusCount / 2), [0.92, 0], [1.28, 0], random, 0.06),
    ...sampleLine(verticalPlus, [1.1, -0.18], [1.1, 0.18], random, 0.06),
  ]
}

function createRating(count: number, random: Random) {
  const points: Point[] = []
  const perDot = Math.floor(count / 5)

  for (let index = 0; index < 5; index += 1) {
    const currentCount = index === 4 ? count - perDot * 4 : perDot
    points.push(
      ...sampleCircleFill(currentCount, [(index - 2) * 0.55, 0], index < 4 ? 0.15 : 0.1, random),
    )
  }

  return points
}

function createDialog(count: number, random: Random) {
  const [borderCount, titleCount, copyCount, actionsCount] = splitCount(
    count,
    [0.35, 0.14, 0.27, 0.24],
  )
  const copyLine = Math.floor(copyCount / 2)
  const actionLine = Math.floor(actionsCount / 3)
  return [
    ...sampleRoundedRectBorder(borderCount, 4.15, 3.15, 0.38, random),
    ...sampleLine(titleCount, [-1.44, 0.9], [0.35, 0.9], random, 0.09),
    ...sampleLine(copyLine, [-1.44, 0.28], [1.38, 0.28], random, 0.06),
    ...sampleLine(copyCount - copyLine, [-1.44, -0.18], [0.58, -0.18], random, 0.06),
    ...sampleLine(actionLine, [-2.02, -0.78], [2.02, -0.78], random, 0.05),
    ...sampleLine(actionLine, [0, -0.78], [0, -1.55], random, 0.05),
    ...sampleLine(actionsCount - actionLine * 2, [0.55, -1.15], [1.48, -1.15], random, 0.075),
  ]
}

function createSkeleton(count: number, random: Random) {
  const points: Point[] = []
  const rowCount = Math.floor(count / 3)

  for (let index = 0; index < 3; index += 1) {
    const currentCount = index === 2 ? count - rowCount * 2 : rowCount
    const [avatarCount, titleCount, copyCount] = splitCount(currentCount, [0.34, 0.36, 0.3])
    const y = 0.95 - index * 0.95
    points.push(
      ...sampleCircleFill(avatarCount, [-1.38, y], 0.25, random),
      ...sampleLine(titleCount, [-0.87, y + 0.11], [1.35, y + 0.11], random, 0.11),
      ...sampleLine(copyCount, [-0.87, y - 0.16], [0.62, y - 0.16], random, 0.085),
    )
  }

  return points
}

function createProgress(count: number, random: Random) {
  const [trackCount, valueCount, dotCount] = splitCount(count, [0.34, 0.48, 0.18])
  return [
    ...sampleLine(trackCount, [-1.8, 0], [1.8, 0], random, 0.045),
    ...sampleLine(valueCount, [-1.8, 0], [0.82, 0], random, 0.11),
    ...sampleCircleFill(dotCount, [0.82, 0], 0.18, random),
  ]
}

function createBadge(count: number, random: Random) {
  const [circleCount, firstCheck, secondCheck] = splitCount(count, [0.62, 0.16, 0.22])
  return [
    ...sampleArc(circleCount, [0, 0], 0.5, 0, Math.PI * 2, random, 0.06),
    ...sampleLine(firstCheck, [-0.24, 0], [-0.06, -0.18], random, 0.05),
    ...sampleLine(secondCheck, [-0.06, -0.18], [0.28, 0.2], random, 0.05),
  ]
}

function createRadioGroup(count: number, random: Random) {
  const points: Point[] = []
  const itemCount = Math.floor(count / 3)

  for (let index = 0; index < 3; index += 1) {
    const currentCount = index === 2 ? count - itemCount * 2 : itemCount
    const [ringCount, centerCount, lineCount] = splitCount(currentCount, [0.48, 0.18, 0.34])
    const y = 0.78 - index * 0.78
    points.push(
      ...sampleArc(ringCount, [-0.94, y], 0.22, 0, Math.PI * 2, random, 0.04),
      ...(index === 0
        ? sampleCircleFill(centerCount, [-0.94, y], 0.1, random)
        : sampleArc(centerCount, [-0.94, y], 0.11, 0, Math.PI * 2, random, 0.025)),
      ...sampleLine(lineCount, [-0.5, y], [0.95, y], random, 0.06),
    )
  }

  return points
}

function createPasswordInput(count: number, random: Random) {
  const [borderCount, dividerCount, dotCount] = splitCount(count, [0.42, 0.24, 0.34])
  const points = sampleRoundedRectBorder(borderCount, 4.2, 0.92, 0.16, random)
  const perDivider = Math.floor(dividerCount / 5)
  const perDot = Math.floor(dotCount / 6)

  for (let index = 1; index < 6; index += 1) {
    const x = -2.1 + index * 0.7
    const currentCount = index === 5 ? dividerCount - perDivider * 4 : perDivider
    points.push(...sampleLine(currentCount, [x, -0.44], [x, 0.44], random, 0.03))
  }

  for (let index = 0; index < 6; index += 1) {
    const x = -1.75 + index * 0.7
    const currentCount = index === 5 ? dotCount - perDot * 5 : perDot
    points.push(...sampleCircleFill(currentCount, [x, 0], 0.09, random))
  }

  return points
}

function createUploader(count: number, random: Random) {
  const [panelCount, tileCount, plusCount] = splitCount(count, [0.26, 0.58, 0.16])
  const points = sampleRoundedRectBorder(panelCount, 3.5, 2.7, 0.28, random)
  const perTile = Math.floor(tileCount / 4)

  for (let index = 0; index < 4; index += 1) {
    const x = (index % 2) * 1.26 - 0.63
    const y = 0.64 - Math.floor(index / 2) * 1.26
    const currentCount = index === 3 ? tileCount - perTile * 3 : perTile
    points.push(
      ...transformPoints(sampleRoundedRectBorder(currentCount, 0.92, 0.92, 0.14, random), {
        x,
        y,
      }),
    )
  }

  const halfPlus = Math.floor(plusCount / 2)
  points.push(
    ...sampleLine(halfPlus, [-0.2, -0.64], [0.2, -0.64], random, 0.05),
    ...sampleLine(plusCount - halfPlus, [0, -0.84], [0, -0.44], random, 0.05),
  )
  return points
}

function createSignature(count: number, random: Random) {
  const [borderCount, baselineCount, strokeCount] = splitCount(count, [0.34, 0.18, 0.48])
  const strokeCounts = splitCount(strokeCount, [0.2, 0.22, 0.24, 0.18, 0.16])
  return [
    ...sampleRoundedRectBorder(borderCount, 4.1, 2.1, 0.24, random),
    ...sampleLine(baselineCount, [-1.58, -0.68], [1.58, -0.68], random, 0.045),
    ...sampleLine(strokeCounts[0], [-1.35, -0.2], [-0.72, 0.48], random, 0.08),
    ...sampleLine(strokeCounts[1], [-0.72, 0.48], [-0.26, -0.18], random, 0.08),
    ...sampleLine(strokeCounts[2], [-0.26, -0.18], [0.4, 0.58], random, 0.08),
    ...sampleLine(strokeCounts[3], [0.4, 0.58], [0.78, -0.12], random, 0.08),
    ...sampleLine(strokeCounts[4], [0.78, -0.12], [1.42, 0.26], random, 0.08),
  ]
}

function createCalendar(count: number, random: Random) {
  const [borderCount, headerCount, gridCount] = splitCount(count, [0.28, 0.18, 0.54])
  const points = sampleRoundedRectBorder(borderCount, 3.65, 3.45, 0.28, random)
  const halfHeader = Math.floor(headerCount / 2)
  points.push(
    ...sampleLine(halfHeader, [-1.34, 1.12], [0.28, 1.12], random, 0.075),
    ...sampleLine(headerCount - halfHeader, [-1.78, 0.72], [1.78, 0.72], random, 0.045),
  )

  const cells = 28
  const perCell = Math.floor(gridCount / cells)
  for (let index = 0; index < cells; index += 1) {
    const x = (index % 7) * 0.47 - 1.41
    const y = 0.27 - Math.floor(index / 7) * 0.55
    const currentCount = index === cells - 1 ? gridCount - perCell * (cells - 1) : perCell
    points.push(...sampleCircleFill(currentCount, [x, y], index === 17 ? 0.12 : 0.065, random))
  }

  return points
}

function createPickerColumns(count: number, random: Random, columns = 3) {
  const [borderCount, selectionCount, rowCount] = splitCount(count, [0.25, 0.2, 0.55])
  const points = sampleRoundedRectBorder(borderCount, 3.7, 3.25, 0.28, random)
  points.push(
    ...sampleRoundedRectBorder(selectionCount, 3.34, 0.66, 0.12, random).map(
      ([x, y, z]) => [x, y - 0.06, z] satisfies Point,
    ),
  )

  const rows = columns * 5
  const perRow = Math.floor(rowCount / rows)
  for (let index = 0; index < rows; index += 1) {
    const column = index % columns
    const row = Math.floor(index / columns)
    const x = columns === 1 ? 0 : -1.18 + (column / (columns - 1)) * 2.36
    const y = 1.08 - row * 0.54
    const currentCount = index === rows - 1 ? rowCount - perRow * (rows - 1) : perRow
    points.push(...sampleLine(currentCount, [x - 0.28, y], [x + 0.28, y], random, 0.06))
  }

  return points
}

function createCascader(count: number, random: Random) {
  const [borderCount, dividerCount, rowCount] = splitCount(count, [0.26, 0.18, 0.56])
  const points = sampleRoundedRectBorder(borderCount, 4.1, 3.15, 0.28, random)
  const halfDivider = Math.floor(dividerCount / 2)
  points.push(
    ...sampleLine(halfDivider, [-0.68, -1.56], [-0.68, 1.56], random, 0.04),
    ...sampleLine(dividerCount - halfDivider, [0.68, -1.56], [0.68, 1.56], random, 0.04),
  )

  const rows = 12
  const perRow = Math.floor(rowCount / rows)
  for (let index = 0; index < rows; index += 1) {
    const column = index % 3
    const row = Math.floor(index / 3)
    const x = -1.36 + column * 1.36
    const y = 0.92 - row * 0.64
    const currentCount = index === rows - 1 ? rowCount - perRow * (rows - 1) : perRow
    points.push(...sampleLine(currentCount, [x - 0.34, y], [x + 0.26, y], random, 0.055))
  }
  return points
}

function createDropdown(count: number, random: Random) {
  const [borderCount, dividerCount, labelCount, chevronCount] = splitCount(
    count,
    [0.4, 0.18, 0.27, 0.15],
  )
  const points = sampleRoundedRectBorder(borderCount, 4.2, 1.05, 0.18, random)
  const perDivider = Math.floor(dividerCount / 2)
  const perLabel = Math.floor(labelCount / 3)
  points.push(
    ...sampleLine(perDivider, [-0.7, -0.52], [-0.7, 0.52], random, 0.035),
    ...sampleLine(dividerCount - perDivider, [0.7, -0.52], [0.7, 0.52], random, 0.035),
  )
  for (let index = 0; index < 3; index += 1) {
    const x = -1.4 + index * 1.4
    const currentCount = index === 2 ? labelCount - perLabel * 2 : perLabel
    points.push(...sampleLine(currentCount, [x - 0.34, 0], [x + 0.2, 0], random, 0.06))
  }
  const halfChevron = Math.floor(chevronCount / 2)
  points.push(
    ...sampleLine(halfChevron, [1.62, 0.13], [1.78, -0.03], random, 0.03),
    ...sampleLine(chevronCount - halfChevron, [1.78, -0.03], [1.94, 0.13], random, 0.03),
  )
  return points
}

function createTreeSelect(count: number, random: Random) {
  const [borderCount, dividerCount, leftCount, rightCount] = splitCount(
    count,
    [0.25, 0.14, 0.26, 0.35],
  )
  const points = sampleRoundedRectBorder(borderCount, 4.05, 3.25, 0.24, random)
  points.push(...sampleLine(dividerCount, [-0.72, -1.62], [-0.72, 1.62], random, 0.045))
  const perLeft = Math.floor(leftCount / 4)
  for (let index = 0; index < 4; index += 1) {
    const currentCount = index === 3 ? leftCount - perLeft * 3 : perLeft
    points.push(
      ...sampleLine(
        currentCount,
        [-1.7, 1.04 - index * 0.68],
        [-0.96, 1.04 - index * 0.68],
        random,
        0.06,
      ),
    )
  }
  const perRight = Math.floor(rightCount / 6)
  for (let index = 0; index < 6; index += 1) {
    const currentCount = index === 5 ? rightCount - perRight * 5 : perRight
    const x = 0.04 + (index % 2) * 1.08
    const y = 0.92 - Math.floor(index / 2) * 0.82
    points.push(
      ...sampleRoundedRectBorder(currentCount, 0.78, 0.52, 0.12, random).map(
        ([pointX, pointY, pointZ]) => [pointX + x, pointY + y, pointZ] satisfies Point,
      ),
    )
  }
  return points
}

function createPagination(count: number, random: Random) {
  const points: Point[] = []
  const perItem = Math.floor(count / 7)
  for (let index = 0; index < 7; index += 1) {
    const currentCount = index === 6 ? count - perItem * 6 : perItem
    const x = (index - 3) * 0.58
    points.push(
      ...(index === 0 || index === 6
        ? sampleArc(currentCount, [x, 0], 0.22, 0, Math.PI * 2, random, 0.04)
        : sampleRoundedRectBorder(currentCount, 0.42, 0.52, 0.11, random).map(
            ([pointX, pointY, pointZ]) => [pointX + x, pointY, pointZ] satisfies Point,
          )),
    )
  }
  return points
}

function createSidebarShape(count: number, random: Random) {
  const [borderCount, activeCount, rowCount] = splitCount(count, [0.28, 0.22, 0.5])
  const points = sampleRoundedRectBorder(borderCount, 1.62, 3.65, 0.22, random)
  points.push(
    ...sampleRoundedRectBorder(activeCount, 1.28, 0.58, 0.12, random).map(
      ([x, y, z]) => [x, y + 0.72, z] satisfies Point,
    ),
  )
  const perRow = Math.floor(rowCount / 4)
  for (let index = 0; index < 4; index += 1) {
    const currentCount = index === 3 ? rowCount - perRow * 3 : perRow
    const y = 1.34 - index * 0.82
    points.push(...sampleLine(currentCount, [-0.52, y], [0.42, y], random, 0.06))
  }
  return points
}

function createStepsShape(count: number, random: Random) {
  const [lineCount, circleCount, labelCount] = splitCount(count, [0.34, 0.42, 0.24])
  const points = sampleLine(lineCount, [-1.72, 0.24], [1.72, 0.24], random, 0.055)
  const perCircle = Math.floor(circleCount / 4)
  const perLabel = Math.floor(labelCount / 4)
  for (let index = 0; index < 4; index += 1) {
    const x = -1.62 + index * 1.08
    const currentCircle = index === 3 ? circleCount - perCircle * 3 : perCircle
    const currentLabel = index === 3 ? labelCount - perLabel * 3 : perLabel
    points.push(
      ...sampleCircleFill(currentCircle, [x, 0.24], index < 2 ? 0.18 : 0.11, random),
      ...sampleLine(currentLabel, [x - 0.28, -0.42], [x + 0.28, -0.42], random, 0.055),
    )
  }
  return points
}

function createNavbar(count: number, random: Random) {
  const [borderCount, titleCount, backCount, actionCount] = splitCount(
    count,
    [0.44, 0.25, 0.14, 0.17],
  )
  const halfBack = Math.floor(backCount / 2)
  return [
    ...sampleRoundedRectBorder(borderCount, 4.4, 0.92, 0.16, random),
    ...sampleLine(titleCount, [-0.72, 0], [0.76, 0], random, 0.08),
    ...sampleLine(halfBack, [-1.54, 0], [-1.3, 0.22], random, 0.04),
    ...sampleLine(backCount - halfBack, [-1.54, 0], [-1.3, -0.22], random, 0.04),
    ...sampleCircleFill(actionCount, [1.58, 0], 0.15, random),
  ]
}

function createTabbar(count: number, random: Random) {
  const [borderCount, iconCount, labelCount] = splitCount(count, [0.36, 0.4, 0.24])
  const points = sampleRoundedRectBorder(borderCount, 4.45, 1.28, 0.22, random)
  const perIcon = Math.floor(iconCount / 4)
  const perLabel = Math.floor(labelCount / 4)
  for (let index = 0; index < 4; index += 1) {
    const x = -1.62 + index * 1.08
    const currentIcon = index === 3 ? iconCount - perIcon * 3 : perIcon
    const currentLabel = index === 3 ? labelCount - perLabel * 3 : perLabel
    points.push(
      ...sampleArc(currentIcon, [x, 0.22], 0.2, 0, Math.PI * 2, random, 0.04),
      ...sampleLine(currentLabel, [x - 0.22, -0.3], [x + 0.22, -0.3], random, 0.05),
    )
  }
  return points
}

function createFixedNav(count: number, random: Random) {
  const [borderCount, iconCount, labelCount] = splitCount(count, [0.38, 0.4, 0.22])
  const points = sampleRoundedRectBorder(borderCount, 3.75, 0.98, 0.46, random)
  const perIcon = Math.floor(iconCount / 4)
  const perLabel = Math.floor(labelCount / 4)
  for (let index = 0; index < 4; index += 1) {
    const x = -1.34 + index * 0.9
    const currentIcon = index === 3 ? iconCount - perIcon * 3 : perIcon
    const currentLabel = index === 3 ? labelCount - perLabel * 3 : perLabel
    points.push(
      ...sampleCircleFill(currentIcon, [x, 0.12], 0.14, random),
      ...sampleLine(currentLabel, [x - 0.17, -0.2], [x + 0.17, -0.2], random, 0.045),
    )
  }
  return points
}

function createBackTop(count: number, random: Random) {
  const [ringCount, firstCount, secondCount] = splitCount(count, [0.62, 0.19, 0.19])
  return [
    ...sampleArc(ringCount, [0, 0], 0.56, 0, Math.PI * 2, random, 0.055),
    ...sampleLine(firstCount, [-0.24, 0.05], [0, 0.28], random, 0.05),
    ...sampleLine(secondCount, [0, 0.28], [0.24, 0.05], random, 0.05),
  ]
}

function createFloatingBubble(count: number, random: Random) {
  const [ringCount, horizontalCount, verticalCount] = splitCount(count, [0.64, 0.18, 0.18])
  return [
    ...sampleCircleFill(ringCount, [0, 0], 0.54, random),
    ...sampleLine(horizontalCount, [-0.22, 0], [0.22, 0], random, 0.055),
    ...sampleLine(verticalCount, [0, -0.22], [0, 0.22], random, 0.055),
  ]
}

function createGridShape(count: number, random: Random) {
  const [borderCount, tileCount] = splitCount(count, [0.2, 0.8])
  const points = sampleRoundedRectBorder(borderCount, 3.45, 3.05, 0.24, random)
  const perTile = Math.floor(tileCount / 9)
  for (let index = 0; index < 9; index += 1) {
    const x = (index % 3) * 0.9 - 0.9
    const y = 0.88 - Math.floor(index / 3) * 0.88
    const currentCount = index === 8 ? tileCount - perTile * 8 : perTile
    points.push(
      ...sampleRoundedRectBorder(currentCount, 0.58, 0.58, 0.12, random).map(
        ([pointX, pointY, pointZ]) => [pointX + x, pointY + y, pointZ] satisfies Point,
      ),
    )
  }
  return points
}

function createIndexList(count: number, random: Random) {
  const [borderCount, rowCount, railCount] = splitCount(count, [0.24, 0.58, 0.18])
  const points = sampleRoundedRectBorder(borderCount, 3.45, 3.65, 0.24, random)
  const perRow = Math.floor(rowCount / 6)
  for (let index = 0; index < 6; index += 1) {
    const y = 1.34 - index * 0.52
    const currentCount = index === 5 ? rowCount - perRow * 5 : perRow
    points.push(
      ...sampleCircleFill(Math.floor(currentCount * 0.32), [-1.18, y], 0.13, random),
      ...sampleLine(
        currentCount - Math.floor(currentCount * 0.32),
        [-0.82, y],
        [0.74, y],
        random,
        0.055,
      ),
    )
  }
  const perRail = Math.floor(railCount / 8)
  for (let index = 0; index < 8; index += 1) {
    const currentCount = index === 7 ? railCount - perRail * 7 : perRail
    points.push(...sampleCircleFill(currentCount, [1.38, 1.3 - index * 0.36], 0.055, random))
  }
  return points
}

function createSticky(count: number, random: Random) {
  const [topCount, bodyCount, pinCount] = splitCount(count, [0.34, 0.44, 0.22])
  return [
    ...sampleRoundedRectBorder(topCount, 4, 0.72, 0.14, random).map(
      ([x, y, z]) => [x, y + 0.86, z] satisfies Point,
    ),
    ...sampleRoundedRectBorder(bodyCount, 3.6, 1.75, 0.2, random).map(
      ([x, y, z]) => [x, y - 0.45, z] satisfies Point,
    ),
    ...sampleCircleFill(pinCount, [1.48, 0.86], 0.14, random),
  ]
}

function createSafeArea(count: number, random: Random) {
  const [deviceCount, insetCount, homeCount] = splitCount(count, [0.5, 0.28, 0.22])
  return [
    ...sampleRoundedRectBorder(deviceCount, 2.55, 3.8, 0.46, random),
    ...sampleLine(insetCount, [-1.08, -1.2], [1.08, -1.2], random, 0.07),
    ...sampleLine(homeCount, [-0.38, -1.58], [0.38, -1.58], random, 0.09),
  ]
}

function createFixedView(count: number, random: Random) {
  const [frameCount, fixedCount, markerCount] = splitCount(count, [0.4, 0.42, 0.18])
  return [
    ...sampleRoundedRectBorder(frameCount, 3.45, 3.35, 0.26, random),
    ...sampleRoundedRectBorder(fixedCount, 3.12, 0.86, 0.15, random).map(
      ([x, y, z]) => [x, y + 1.03, z] satisfies Point,
    ),
    ...sampleCircleFill(markerCount, [1.18, 1.03], 0.13, random),
  ]
}

function createPopup(count: number, random: Random) {
  const [panelCount, handleCount, contentCount] = splitCount(count, [0.45, 0.17, 0.38])
  const points = sampleRoundedRectBorder(panelCount, 4.05, 2.75, 0.34, random)
  points.push(...sampleLine(handleCount, [-0.42, 1.05], [0.42, 1.05], random, 0.08))
  const lines = splitCount(contentCount, [0.36, 0.34, 0.3])
  lines.forEach((lineCount, index) => {
    const y = 0.38 - index * 0.58
    points.push(...sampleLine(lineCount, [-1.35, y], [1.2 - index * 0.22, y], random, 0.07))
  })
  return points
}

function createActionSheet(count: number, random: Random) {
  const [borderCount, handleCount, rowCount] = splitCount(count, [0.27, 0.13, 0.6])
  const points = sampleRoundedRectBorder(borderCount, 3.9, 3.35, 0.32, random)
  points.push(...sampleLine(handleCount, [-0.4, 1.34], [0.4, 1.34], random, 0.07))
  const perRow = Math.floor(rowCount / 5)
  for (let index = 0; index < 5; index += 1) {
    const currentCount = index === 4 ? rowCount - perRow * 4 : perRow
    const y = 0.78 - index * 0.58
    points.push(...sampleLine(currentCount, [-1.26, y], [1.26, y], random, 0.07))
  }
  return points
}

function createShareSheet(count: number, random: Random) {
  const [borderCount, iconCount, labelCount, cancelCount] = splitCount(
    count,
    [0.27, 0.36, 0.2, 0.17],
  )
  const points = sampleRoundedRectBorder(borderCount, 4.05, 2.8, 0.32, random)
  const perIcon = Math.floor(iconCount / 5)
  const perLabel = Math.floor(labelCount / 5)
  for (let index = 0; index < 5; index += 1) {
    const x = -1.45 + index * 0.72
    const currentIcon = index === 4 ? iconCount - perIcon * 4 : perIcon
    const currentLabel = index === 4 ? labelCount - perLabel * 4 : perLabel
    points.push(
      ...sampleArc(currentIcon, [x, 0.58], 0.22, 0, Math.PI * 2, random, 0.04),
      ...sampleLine(currentLabel, [x - 0.18, 0.1], [x + 0.18, 0.1], random, 0.045),
    )
  }
  points.push(...sampleLine(cancelCount, [-1.38, -0.88], [1.38, -0.88], random, 0.075))
  return points
}

function createToast(count: number, random: Random) {
  const [borderCount, iconCount, lineCount] = splitCount(count, [0.48, 0.26, 0.26])
  return [
    ...sampleRoundedRectBorder(borderCount, 2.65, 1.1, 0.22, random),
    ...sampleCircleFill(iconCount, [-0.82, 0], 0.2, random),
    ...sampleLine(lineCount, [-0.42, 0], [0.86, 0], random, 0.07),
  ]
}

function createNotify(count: number, random: Random) {
  const [borderCount, iconCount, lineCount] = splitCount(count, [0.44, 0.2, 0.36])
  return [
    ...sampleRoundedRectBorder(borderCount, 4.35, 0.78, 0.12, random),
    ...sampleArc(iconCount, [-1.62, 0], 0.16, 0, Math.PI * 2, random, 0.035),
    ...sampleLine(lineCount, [-1.18, 0], [1.42, 0], random, 0.07),
  ]
}

function createEmpty(count: number, random: Random) {
  const [outerCount, innerCount, titleCount, copyCount] = splitCount(
    count,
    [0.34, 0.22, 0.25, 0.19],
  )
  return [
    ...sampleArc(outerCount, [0, 0.46], 0.82, Math.PI * 0.08, Math.PI * 1.92, random, 0.07),
    ...sampleArc(innerCount, [0, 0.46], 0.38, 0, Math.PI * 2, random, 0.055),
    ...sampleLine(titleCount, [-0.92, -0.68], [0.92, -0.68], random, 0.08),
    ...sampleLine(copyCount, [-0.62, -1.08], [0.62, -1.08], random, 0.06),
  ]
}

function createBackdrop(count: number, random: Random) {
  const [frameCount, modalCount, centerCount] = splitCount(count, [0.52, 0.34, 0.14])
  return [
    ...sampleRoundedRectBorder(frameCount, 4.3, 3.45, 0.28, random),
    ...sampleRoundedRectBorder(modalCount, 2.15, 1.45, 0.24, random),
    ...sampleCircleFill(centerCount, [0, 0], 0.18, random),
  ]
}

function createPullRefresh(count: number, random: Random) {
  const [ringCount, arrowCount, rowCount] = splitCount(count, [0.3, 0.16, 0.54])
  const points = sampleArc(
    ringCount,
    [0, 1.05],
    0.48,
    -Math.PI * 0.2,
    Math.PI * 1.35,
    random,
    0.055,
  )
  const halfArrow = Math.floor(arrowCount / 2)
  points.push(
    ...sampleLine(halfArrow, [-0.12, 0.74], [0, 0.58], random, 0.04),
    ...sampleLine(arrowCount - halfArrow, [0.12, 0.74], [0, 0.58], random, 0.04),
  )
  const rows = splitCount(rowCount, [0.36, 0.34, 0.3])
  rows.forEach((currentCount, index) => {
    const y = 0.1 - index * 0.62
    points.push(...sampleLine(currentCount, [-1.55, y], [1.55 - index * 0.3, y], random, 0.08))
  })
  return points
}

function createImageShape(count: number, random: Random) {
  const [borderCount, sunCount, mountainCount] = splitCount(count, [0.5, 0.18, 0.32])
  const halfMountain = Math.floor(mountainCount / 2)
  return [
    ...sampleRoundedRectBorder(borderCount, 3.55, 2.65, 0.25, random),
    ...sampleCircleFill(sunCount, [0.92, 0.58], 0.22, random),
    ...sampleLine(halfMountain, [-1.42, -0.76], [-0.34, 0.42], random, 0.07),
    ...sampleLine(mountainCount - halfMountain, [-0.34, 0.42], [1.44, -0.76], random, 0.07),
  ]
}

function createAvatar(count: number, random: Random) {
  const [outerCount, headCount, bodyCount] = splitCount(count, [0.48, 0.22, 0.3])
  return [
    ...sampleArc(outerCount, [0, 0], 0.86, 0, Math.PI * 2, random, 0.06),
    ...sampleCircleFill(headCount, [0, 0.28], 0.24, random),
    ...sampleArc(bodyCount, [0, -0.44], 0.48, Math.PI, Math.PI * 2, random, 0.07),
  ]
}

function createTag(count: number, random: Random) {
  const [borderCount, labelCount] = splitCount(count, [0.62, 0.38])
  return [
    ...sampleRoundedRectBorder(borderCount, 2.25, 0.72, 0.32, random),
    ...sampleLine(labelCount, [-0.58, 0], [0.58, 0], random, 0.07),
  ]
}

function createListShape(count: number, random: Random) {
  const counts = splitCount(count, [0.34, 0.33, 0.33])
  return counts.flatMap((itemCount, index) =>
    transformPoints(createCell(itemCount, random, 3.55), {
      x: 0,
      y: 1.16 - index * 1.16,
      scale: 0.82,
    }),
  )
}

function createCollapse(count: number, random: Random) {
  const [borderCount, rowCount, detailCount] = splitCount(count, [0.26, 0.5, 0.24])
  const points = sampleRoundedRectBorder(borderCount, 3.75, 3.2, 0.24, random)
  const perRow = Math.floor(rowCount / 3)
  for (let index = 0; index < 3; index += 1) {
    const currentCount = index === 2 ? rowCount - perRow * 2 : perRow
    const y = 0.88 - index * 0.92
    points.push(...sampleLine(currentCount, [-1.36, y], [1.08, y], random, 0.07))
  }
  points.push(...sampleLine(detailCount, [-1.12, 0.28], [0.58, 0.28], random, 0.055))
  return points
}

function createDivider(count: number, random: Random) {
  const [leftCount, centerCount, rightCount] = splitCount(count, [0.4, 0.2, 0.4])
  return [
    ...sampleLine(leftCount, [-1.92, 0], [-0.42, 0], random, 0.045),
    ...sampleCircleFill(centerCount, [0, 0], 0.12, random),
    ...sampleLine(rightCount, [0.42, 0], [1.92, 0], random, 0.045),
  ]
}

function createTextEllipsis(count: number, random: Random) {
  const lines = splitCount(count, [0.31, 0.29, 0.24, 0.16])
  const points = [
    ...sampleLine(lines[0], [-1.8, 0.72], [1.8, 0.72], random, 0.08),
    ...sampleLine(lines[1], [-1.8, 0.18], [1.48, 0.18], random, 0.08),
    ...sampleLine(lines[2], [-1.8, -0.36], [0.78, -0.36], random, 0.08),
  ]
  const perDot = Math.floor(lines[3] / 3)
  for (let index = 0; index < 3; index += 1) {
    const currentCount = index === 2 ? lines[3] - perDot * 2 : perDot
    points.push(...sampleCircleFill(currentCount, [1.08 + index * 0.28, -0.36], 0.07, random))
  }
  return points
}

function createTimeline(count: number, random: Random) {
  const [railCount, nodeCount, contentCount] = splitCount(count, [0.22, 0.32, 0.46])
  const points = sampleLine(railCount, [-1.22, -1.52], [-1.22, 1.52], random, 0.055)
  const perNode = Math.floor(nodeCount / 4)
  const perContent = Math.floor(contentCount / 4)
  for (let index = 0; index < 4; index += 1) {
    const y = 1.12 - index * 0.76
    const currentNode = index === 3 ? nodeCount - perNode * 3 : perNode
    const currentContent = index === 3 ? contentCount - perContent * 3 : perContent
    points.push(
      ...sampleCircleFill(currentNode, [-1.22, y], 0.15, random),
      ...sampleLine(currentContent, [-0.78, y], [1.42 - index * 0.16, y], random, 0.07),
    )
  }
  return points
}

function createCountdown(count: number, random: Random) {
  const [boxCount, digitCount, colonCount] = splitCount(count, [0.48, 0.38, 0.14])
  const points: Point[] = []
  const perBox = Math.floor(boxCount / 4)
  const perDigit = Math.floor(digitCount / 4)
  for (let index = 0; index < 4; index += 1) {
    const x = -1.35 + index * 0.9
    const currentBox = index === 3 ? boxCount - perBox * 3 : perBox
    const currentDigit = index === 3 ? digitCount - perDigit * 3 : perDigit
    points.push(
      ...sampleRoundedRectBorder(currentBox, 0.62, 0.88, 0.12, random).map(
        ([pointX, pointY, pointZ]) => [pointX + x, pointY, pointZ] satisfies Point,
      ),
      ...sampleLine(currentDigit, [x, -0.2], [x, 0.2], random, 0.09),
    )
  }
  const halfColon = Math.floor(colonCount / 2)
  points.push(
    ...sampleCircleFill(halfColon, [-0.45, 0.18], 0.06, random),
    ...sampleCircleFill(colonCount - halfColon, [-0.45, -0.18], 0.06, random),
  )
  return points
}

function createRollingText(count: number, random: Random) {
  const [boxCount, railCount, digitCount] = splitCount(count, [0.42, 0.22, 0.36])
  const points: Point[] = []
  const perBox = Math.floor(boxCount / 4)
  const perRail = Math.floor(railCount / 4)
  const perDigit = Math.floor(digitCount / 4)
  for (let index = 0; index < 4; index += 1) {
    const x = -1.35 + index * 0.9
    points.push(
      ...sampleRoundedRectBorder(
        index === 3 ? boxCount - perBox * 3 : perBox,
        0.64,
        1.45,
        0.12,
        random,
      ).map(([pointX, pointY, pointZ]) => [pointX + x, pointY, pointZ] satisfies Point),
      ...sampleLine(
        index === 3 ? railCount - perRail * 3 : perRail,
        [x, -0.58],
        [x, 0.58],
        random,
        0.05,
      ),
      ...sampleCircleFill(index === 3 ? digitCount - perDigit * 3 : perDigit, [x, 0], 0.13, random),
    )
  }
  return points
}

function createWatermark(count: number, random: Random) {
  const points: Point[] = []
  const perLine = Math.floor(count / 7)
  for (let index = 0; index < 7; index += 1) {
    const currentCount = index === 6 ? count - perLine * 6 : perLine
    const y = 1.35 - index * 0.45
    points.push(...sampleLine(currentCount, [-1.72, y - 0.52], [1.72, y + 0.52], random, 0.065))
  }
  return points
}

function createSwiper(count: number, random: Random) {
  const [cardCount, activeCount, dotCount] = splitCount(count, [0.58, 0.28, 0.14])
  const points: Point[] = []
  const perCard = Math.floor(cardCount / 2)
  points.push(
    ...transformPoints(sampleRoundedRectBorder(perCard, 2.7, 1.72, 0.2, random), {
      x: -0.7,
      y: 0.18,
      rotate: -0.1,
    }),
    ...transformPoints(sampleRoundedRectBorder(cardCount - perCard, 2.7, 1.72, 0.2, random), {
      x: 0.72,
      y: 0.18,
      rotate: 0.1,
    }),
    ...sampleRoundedRectBorder(activeCount, 2.85, 1.86, 0.22, random),
  )
  const perDot = Math.floor(dotCount / 3)
  for (let index = 0; index < 3; index += 1) {
    const currentCount = index === 2 ? dotCount - perDot * 2 : perDot
    points.push(...sampleCircleFill(currentCount, [(index - 1) * 0.34, -1.24], 0.07, random))
  }
  return points
}

function createSwipeCell(count: number, random: Random) {
  const [cellCount, actionCount, labelCount] = splitCount(count, [0.52, 0.3, 0.18])
  return [
    ...sampleRoundedRectBorder(cellCount, 4.2, 1.25, 0.2, random),
    ...sampleRoundedRectBorder(actionCount, 1.08, 1.08, 0.14, random).map(
      ([x, y, z]) => [x + 1.44, y, z] satisfies Point,
    ),
    ...sampleLine(labelCount, [-1.62, 0], [0.42, 0], random, 0.08),
  ]
}

function createFlexShape(count: number, random: Random) {
  const points: Point[] = []
  const perBox = Math.floor(count / 5)
  const placements = [
    [-1.18, 0.58],
    [0, 0.58],
    [1.18, 0.58],
    [-0.62, -0.62],
    [0.62, -0.62],
  ]
  placements.forEach(([x, y], index) => {
    const currentCount = index === 4 ? count - perBox * 4 : perBox
    points.push(
      ...sampleRoundedRectBorder(currentCount, 0.92, 0.72, 0.12, random).map(
        ([pointX, pointY, pointZ]) => [pointX + x, pointY + y, pointZ] satisfies Point,
      ),
    )
  })
  return points
}

function createSpaceShape(count: number, random: Random) {
  const points: Point[] = []
  const widths = [0.72, 1.08, 0.84, 1.2]
  const perBox = Math.floor(count / widths.length)
  let x = -1.8
  widths.forEach((width, index) => {
    const currentCount = index === widths.length - 1 ? count - perBox * 3 : perBox
    points.push(
      ...sampleRoundedRectBorder(currentCount, width, 0.88, 0.14, random).map(
        ([pointX, pointY, pointZ]) => [pointX + x + width / 2, pointY, pointZ] satisfies Point,
      ),
    )
    x += width + 0.28 + random() * 0.16
  })
  return points
}

function createActionBar(count: number, random: Random) {
  const [borderCount, iconCount, buttonCount] = splitCount(count, [0.34, 0.24, 0.42])
  const points = sampleRoundedRectBorder(borderCount, 4.55, 1.08, 0.18, random)
  const halfIcon = Math.floor(iconCount / 2)
  points.push(
    ...sampleArc(halfIcon, [-1.82, 0], 0.2, 0, Math.PI * 2, random, 0.04),
    ...sampleArc(iconCount - halfIcon, [-1.18, 0], 0.2, 0, Math.PI * 2, random, 0.04),
  )
  const halfButton = Math.floor(buttonCount / 2)
  points.push(
    ...sampleRoundedRectBorder(halfButton, 1.12, 0.68, 0.3, random).map(
      ([x, y, z]) => [x + 0.52, y, z] satisfies Point,
    ),
    ...sampleRoundedRectBorder(buttonCount - halfButton, 1.12, 0.68, 0.3, random).map(
      ([x, y, z]) => [x + 1.68, y, z] satisfies Point,
    ),
  )
  return points
}

function createFloatingPanel(count: number, random: Random) {
  const [borderCount, handleCount, titleCount, contentCount] = splitCount(
    count,
    [0.34, 0.14, 0.18, 0.34],
  )
  const points = sampleRoundedRectBorder(borderCount, 4.05, 3.45, 0.36, random)
  points.push(
    ...sampleLine(handleCount, [-0.5, 1.4], [0.5, 1.4], random, 0.08),
    ...sampleLine(titleCount, [-1.42, 0.82], [0.48, 0.82], random, 0.09),
  )
  const lines = splitCount(contentCount, [0.36, 0.34, 0.3])
  lines.forEach((lineCount, index) => {
    const y = 0.18 - index * 0.58
    points.push(...sampleLine(lineCount, [-1.42, y], [1.38 - index * 0.3, y], random, 0.07))
  })
  return points
}

interface ComponentCluster {
  points: Point[]
  scale?: [number, number]
}

interface ComposedScene {
  layout: ParticleLayout
  positions: Float32Array
}

const PARTICLE_LAYOUTS: ParticleLayout[] = ["scatter", "diagonal", "bands", "wave", "clusters"]

const LAYOUT_LABELS: Record<ParticleLayout, string> = {
  bands: "floating bands",
  clusters: "dense clusters",
  diagonal: "diagonal flow",
  scatter: "spatial scatter",
  wave: "wave field",
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}

function shuffle<T>(items: T[], random: Random) {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1))
    ;[shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]]
  }

  return shuffled
}

function createScatterAnchors(count: number, random: Random) {
  const anchors: Array<[number, number]> = []

  for (let index = 0; index < count; index += 1) {
    let candidate: [number, number] = [0, 0]

    for (let attempt = 0; attempt < 60; attempt += 1) {
      candidate = [(random() - 0.5) * 12.4, (random() - 0.5) * 6.15]
      const separated = anchors.every(([x, y]) => {
        const horizontal = (candidate[0] - x) / 2.15
        const vertical = (candidate[1] - y) / 1.25
        return horizontal * horizontal + vertical * vertical > 1
      })

      if (separated) {
        break
      }
    }

    anchors.push(candidate)
  }

  return anchors
}

function createDiagonalAnchors(count: number, random: Random) {
  const direction = random() > 0.5 ? 1 : -1
  const offset = (random() - 0.5) * 1.2
  const lanes = count > 10 ? 2 : 1
  const itemsPerLane = Math.ceil(count / lanes)

  return Array.from({ length: count }, (_, index) => {
    const lane = index % lanes
    const laneIndex = Math.floor(index / lanes)
    const progress = itemsPerLane === 1 ? 0.5 : laneIndex / (itemsPerLane - 1)
    const x = -5.85 + progress * 11.7 + (random() - 0.5) * 0.85
    const laneOffset = (lane - (lanes - 1) / 2) * 1.55
    const y = clamp(direction * x * 0.34 + offset + laneOffset + (random() - 0.5) * 0.7, -3, 3)
    return [x, y] satisfies [number, number]
  })
}

function createBandAnchors(count: number, random: Random) {
  const rows = count > 11 ? (random() > 0.48 ? 4 : 3) : random() > 0.45 ? 3 : 2
  const slots = Array.from({ length: count }, (_, index) => {
    const row = index % rows
    const column = Math.floor(index / rows)
    const columns = Math.ceil(count / rows)
    const x =
      columns === 1
        ? (random() - 0.5) * 2
        : -5.65 + (column / (columns - 1)) * 11.3 + (random() - 0.5) * 0.7
    const y = -2.45 + (row / Math.max(rows - 1, 1)) * 4.9 + (random() - 0.5) * 0.65
    return [x, y] satisfies [number, number]
  })

  return shuffle(slots, random)
}

function createWaveAnchors(count: number, random: Random) {
  const phase = random() * Math.PI * 2
  const frequency = 0.68 + random() * 0.28
  const lanes = count > 10 ? 2 : 1
  const itemsPerLane = Math.ceil(count / lanes)

  return Array.from({ length: count }, (_, index) => {
    const lane = index % lanes
    const laneIndex = Math.floor(index / lanes)
    const progress = itemsPerLane === 1 ? 0.5 : laneIndex / (itemsPerLane - 1)
    const x = -5.95 + progress * 11.9 + (random() - 0.5) * 0.58
    const laneOffset = (lane - (lanes - 1) / 2) * 1.5
    const y = clamp(
      Math.sin(x * frequency + phase) * 1.58 + laneOffset + (random() - 0.5) * 0.42,
      -3,
      3,
    )
    return [x, y] satisfies [number, number]
  })
}

function createClusterAnchors(count: number, random: Random) {
  const centers = createScatterAnchors(3, random).map(([x, y]) => [x * 0.76, y * 0.7])

  return Array.from({ length: count }, (_, index) => {
    const center = centers[index % centers.length]
    const angle = random() * Math.PI * 2
    const radiusX = 0.55 + random() * 1.22
    const radiusY = 0.38 + random() * 0.74
    return [
      clamp(center[0] + Math.cos(angle) * radiusX, -6.05, 6.05),
      clamp(center[1] + Math.sin(angle) * radiusY, -3.02, 3.02),
    ] satisfies [number, number]
  })
}

function createLayoutAnchors(count: number, random: Random, layout: ParticleLayout) {
  switch (layout) {
    case "bands":
      return createBandAnchors(count, random)
    case "clusters":
      return createClusterAnchors(count, random)
    case "diagonal":
      return createDiagonalAnchors(count, random)
    case "wave":
      return createWaveAnchors(count, random)
    default:
      return createScatterAnchors(count, random)
  }
}

function composeScene(
  components: ComponentCluster[],
  random: Random,
  layout: ParticleLayout,
): ComposedScene {
  const anchors = createLayoutAnchors(components.length, random, layout)
  const rotationRange = layout === "scatter" || layout === "clusters" ? 0.38 : 0.22
  const densityScale = components.length >= 13 ? 0.82 : components.length >= 11 ? 0.88 : 0.94
  const layoutScale =
    layout === "clusters" ? 0.82 : layout === "diagonal" || layout === "wave" ? 0.9 : 1

  const points = components.flatMap((component, index) => {
    const [minimumScale, maximumScale] = component.scale ?? [0.58, 0.86]
    const [x, y] = anchors[index]
    const depth = (random() - 0.5) * 0.74
    const depthScale = 1 + depth * 0.16

    return transformPoints(component.points, {
      x,
      y,
      rotate: (random() - 0.5) * rotationRange,
      scale:
        (minimumScale + random() * (maximumScale - minimumScale)) *
        depthScale *
        densityScale *
        layoutScale,
      z: depth,
    })
  })

  return {
    layout,
    positions: toPositions(points),
  }
}

interface ParticleSceneDefinition {
  components: readonly string[]
  id: string
  name: string
}

const LARGE_COMPONENTS = new Set([
  "action-sheet",
  "area-picker",
  "backdrop",
  "calendar",
  "cascader",
  "dialog",
  "floating-panel",
  "form",
  "index-list",
  "number-keyboard",
  "picker",
  "popup",
  "safe-area",
  "share-sheet",
  "tree-select",
  "uploader",
])

const SMALL_COMPONENTS = new Set([
  "avatar",
  "back-top",
  "badge",
  "circle",
  "divider",
  "floating-bubble",
  "loading",
  "progress",
  "rate",
  "switch",
  "tag",
])

const PARTICLE_SCENE_DEFINITIONS: ParticleSceneDefinition[] = [
  {
    id: "form-controls",
    name: "Form controls",
    components: [
      "button",
      "cell",
      "field",
      "form",
      "checkbox",
      "radio",
      "switch",
      "slider",
      "stepper",
      "search",
      "uploader",
      "rate",
      "password-input",
      "signature",
    ],
  },
  {
    id: "picker-workflows",
    name: "Picker workflows",
    components: [
      "calendar",
      "datetime-picker",
      "picker",
      "area-picker",
      "cascader",
      "number-keyboard",
      "dropdown-menu",
      "tree-select",
      "tabs",
      "pagination",
      "sidebar",
      "steps",
    ],
  },
  {
    id: "navigation-flow",
    name: "Navigation flow",
    components: [
      "navbar",
      "tabbar",
      "fixed-nav",
      "back-top",
      "floating-bubble",
      "grid",
      "index-list",
      "sticky",
      "safe-area",
      "fixed-view",
      "flex",
      "space",
      "action-bar",
      "avatar",
    ],
  },
  {
    id: "feedback-layer",
    name: "Feedback layer",
    components: [
      "dialog",
      "popup",
      "action-sheet",
      "share-sheet",
      "toast",
      "notify",
      "notice-bar",
      "loading",
      "progress",
      "circle",
      "skeleton",
      "empty",
      "backdrop",
      "pull-refresh",
    ],
  },
  {
    id: "content-system",
    name: "Content system",
    components: [
      "image",
      "avatar",
      "badge",
      "tag",
      "list",
      "collapse",
      "divider",
      "text-ellipsis",
      "timeline",
      "countdown",
      "rolling-text",
      "watermark",
      "swiper",
      "swipe-cell",
    ],
  },
  {
    id: "adaptive-layout",
    name: "Adaptive layout",
    components: [
      "floating-panel",
      "sidebar",
      "tree-select",
      "uploader",
      "image",
      "button",
      "cell",
      "navbar",
      "tabbar",
      "pagination",
      "tabs",
      "steps",
      "action-bar",
      "fixed-nav",
    ],
  },
]

export const PARTICLE_COMPONENT_COVERAGE = Array.from(
  new Set(PARTICLE_SCENE_DEFINITIONS.flatMap((scene) => scene.components)),
)
export const PARTICLE_TOTAL_COMPONENTS = 71

function getComponentScale(name: string): [number, number] {
  if (LARGE_COMPONENTS.has(name)) {
    return [0.38, 0.56]
  }
  if (SMALL_COMPONENTS.has(name)) {
    return [0.58, 0.88]
  }
  return [0.45, 0.67]
}

function createComponentPoints(name: string, count: number, random: Random): Point[] {
  switch (name) {
    case "action-bar":
      return createActionBar(count, random)
    case "action-sheet":
      return createActionSheet(count, random)
    case "area-picker":
      return createPickerColumns(count, random, 3)
    case "avatar":
      return createAvatar(count, random)
    case "back-top":
      return createBackTop(count, random)
    case "backdrop":
      return createBackdrop(count, random)
    case "badge":
      return createBadge(count, random)
    case "button":
      return createButton(count, random)
    case "calendar":
      return createCalendar(count, random)
    case "cascader":
      return createCascader(count, random)
    case "cell":
    case "field":
      return createCell(count, random)
    case "checkbox":
      return createCheckboxGroup(count, random)
    case "circle":
    case "loading":
      return createLoading(count, random)
    case "collapse":
      return createCollapse(count, random)
    case "countdown":
      return createCountdown(count, random)
    case "datetime-picker":
      return createPickerColumns(count, random, 2)
    case "dialog":
      return createDialog(count, random)
    case "divider":
      return createDivider(count, random)
    case "dropdown-menu":
      return createDropdown(count, random)
    case "empty":
      return createEmpty(count, random)
    case "fixed-nav":
      return createFixedNav(count, random)
    case "fixed-view":
      return createFixedView(count, random)
    case "flex":
      return createFlexShape(count, random)
    case "floating-bubble":
      return createFloatingBubble(count, random)
    case "floating-panel":
      return createFloatingPanel(count, random)
    case "form":
      return createInputStack(count, random)
    case "grid":
      return createGridShape(count, random)
    case "image":
      return createImageShape(count, random)
    case "index-list":
      return createIndexList(count, random)
    case "list":
      return createListShape(count, random)
    case "navbar":
      return createNavbar(count, random)
    case "notice-bar":
      return createNotice(count, random)
    case "notify":
      return createNotify(count, random)
    case "number-keyboard":
      return createKeypad(count, random)
    case "pagination":
      return createPagination(count, random)
    case "password-input":
      return createPasswordInput(count, random)
    case "picker":
      return createPickerColumns(count, random)
    case "popup":
      return createPopup(count, random)
    case "progress":
      return createProgress(count, random)
    case "pull-refresh":
      return createPullRefresh(count, random)
    case "radio":
      return createRadioGroup(count, random)
    case "rate":
      return createRating(count, random)
    case "rolling-text":
      return createRollingText(count, random)
    case "safe-area":
      return createSafeArea(count, random)
    case "search":
      return createSearch(count, random)
    case "share-sheet":
      return createShareSheet(count, random)
    case "sidebar":
      return createSidebarShape(count, random)
    case "signature":
      return createSignature(count, random)
    case "skeleton":
      return createSkeleton(count, random)
    case "slider":
      return createSlider(count, random)
    case "space":
      return createSpaceShape(count, random)
    case "stepper":
      return createStepper(count, random)
    case "steps":
      return createStepsShape(count, random)
    case "sticky":
      return createSticky(count, random)
    case "swipe-cell":
      return createSwipeCell(count, random)
    case "swiper":
      return createSwiper(count, random)
    case "switch":
      return createSwitch(count, random)
    case "tabbar":
      return createTabbar(count, random)
    case "tabs":
      return createTabs(count, random)
    case "tag":
      return createTag(count, random)
    case "text-ellipsis":
      return createTextEllipsis(count, random)
    case "timeline":
      return createTimeline(count, random)
    case "toast":
      return createToast(count, random)
    case "tree-select":
      return createTreeSelect(count, random)
    case "uploader":
      return createUploader(count, random)
    case "watermark":
      return createWatermark(count, random)
    default:
      return createCell(count, random)
  }
}

function createCoveredScene(
  componentNames: readonly string[],
  random: Random,
  layout: ParticleLayout,
) {
  const weights = componentNames.map((name) => {
    if (LARGE_COMPONENTS.has(name)) {
      return 1.24
    }
    if (SMALL_COMPONENTS.has(name)) {
      return 0.78
    }
    return 1
  })
  const counts = splitCount(PARTICLE_COUNT, weights)
  const components = componentNames.map((name, index) => ({
    points: createComponentPoints(name, counts[index], random),
    scale: getComponentScale(name),
  }))

  return composeScene(components, random, layout)
}

export const PARTICLE_SCENE_COUNT = PARTICLE_SCENE_DEFINITIONS.length

export function createParticleShape(sceneIndex: number, seed = 0x7461726f): ParticleShape {
  const index = ((sceneIndex % PARTICLE_SCENE_COUNT) + PARTICLE_SCENE_COUNT) % PARTICLE_SCENE_COUNT
  const layoutRandom = createRandom(seed)
  const layoutOffset = Math.floor(layoutRandom() * PARTICLE_LAYOUTS.length)
  const layout = PARTICLE_LAYOUTS[(layoutOffset + index * 2) % PARTICLE_LAYOUTS.length]
  const random = createRandom((seed ^ Math.imul(index + 1, 0x85ebca6b)) >>> 0)
  const definition = PARTICLE_SCENE_DEFINITIONS[index]
  const scene = createCoveredScene(definition.components, random, layout)

  return {
    id: definition.id,
    label: `${definition.name} · ${definition.components.length} · ${LAYOUT_LABELS[scene.layout]} · ${PARTICLE_COMPONENT_COVERAGE.length}/${PARTICLE_TOTAL_COMPONENTS}`,
    layout: scene.layout,
    positions: scene.positions,
  }
}

export function createParticleShapes(seed = 0x7461726f): ParticleShape[] {
  return Array.from({ length: PARTICLE_SCENE_COUNT }, (_, index) =>
    createParticleShape(index, seed),
  )
}
