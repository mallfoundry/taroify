"use client"

import "animejs/adapters/three"

import { animate } from "animejs"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { createParticleShape, createParticleShapes, PARTICLE_COUNT } from "./particleShapes"

const vertexShader = `
  attribute vec3 aTarget;
  attribute float aSeed;
  attribute float aSize;

  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uPointScale;
  uniform float uEnergy;
  uniform float uFlowMode;

  varying float vSeed;
  varying float vEnergy;
  varying float vCenterFade;

  void main() {
    float staggerDelay = aSeed * 0.14;
    float localProgress = clamp(
      (uProgress - staggerDelay) / (1.0 - staggerDelay),
      0.0,
      1.0
    );
    float easedProgress = localProgress * localProgress * (3.0 - 2.0 * localProgress);
    float transitionWave = sin(localProgress * 3.14159265);
    float spin = aSeed * 6.2831853 + localProgress * 7.8539816;
    vec2 radialFlow = vec2(cos(spin), sin(spin));
    vec2 flowAxis = vec2(cos(uFlowMode), sin(uFlowMode));
    float flowBlend = 0.5 + 0.5 * sin(uFlowMode + aSeed * 9.4247779);
    vec2 transitionFlow = mix(
      radialFlow,
      flowAxis * sin(spin * 1.35 + uFlowMode),
      flowBlend * 0.72
    );

    vec3 transformed = mix(position, aTarget, easedProgress);
    transformed.xy += transitionFlow
      * transitionWave
      * (0.16 + aSeed * 0.34);
    transformed.xy += vec2(-flowAxis.y, flowAxis.x)
      * transitionWave
      * sin(aSeed * 18.8495559 + uFlowMode)
      * 0.16;
    transformed.z += transitionWave * (0.28 + aSeed * 0.62);
    transformed.x += sin(uTime * 0.58 + aSeed * 31.0) * 0.016;
    transformed.y += cos(uTime * 0.52 + aSeed * 27.0) * 0.016;
    transformed.z += sin(uTime * 0.74 + aSeed * 19.0) * 0.028;

    float centerDistance = length(transformed.xy / vec2(2.72, 2.08));
    vCenterFade = mix(0.035, 1.0, smoothstep(0.62, 1.16, centerDistance));

    vec4 modelPosition = modelMatrix * vec4(transformed, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = aSize
      * (1.0 + uEnergy * 0.34)
      * uPixelRatio
      * uPointScale
      * (9.0 / -viewPosition.z);

    vSeed = aSeed;
    vEnergy = uEnergy;
  }
`

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uColorSoft;
  uniform float uOpacity;

  varying float vSeed;
  varying float vEnergy;
  varying float vCenterFade;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(center);

    if (distanceToCenter > 0.5) {
      discard;
    }

    float alpha = smoothstep(0.5, 0.12, distanceToCenter);
    float core = smoothstep(0.22, 0.0, distanceToCenter);
    vec3 color = mix(uColorSoft, uColor, core * 0.78 + vSeed * 0.12);
    color = mix(color, vec3(0.82, 0.93, 1.0), vEnergy * core * 0.26);

    gl_FragColor = vec4(color, alpha * uOpacity * vCenterFade);
  }
`

function createDustGeometry(count: number) {
  const positions = new Float32Array(count * 3)
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let index = 0; index < count; index += 1) {
    const progress = index / count
    const angle = index * goldenAngle + Math.sin(index * 0.73) * 0.12
    const radius = 2.8 + Math.sqrt(progress) * 4.15
    positions[index * 3] = Math.cos(angle) * radius
    positions[index * 3 + 1] = Math.sin(angle) * radius * 0.57
    positions[index * 3 + 2] = Math.sin(angle * 1.7) * 0.86
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  return geometry
}

function getSeed(index: number) {
  const value = Math.sin((index + 1) * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

export function ParticleMorphScene() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current

    if (!root || !canvas) {
      return
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const sceneSeed =
      (Date.now() ^ Math.floor(window.performance.now() * 1000) ^ window.innerWidth) >>> 0
    const shapes = createParticleShapes(sceneSeed)
    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        canvas,
        powerPreference: "high-performance",
      })
    } catch {
      root.dataset.webgl = "fallback"
      return
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 9.4

    const group = new THREE.Group()
    scene.add(group)

    const staticShapeIndex = shapes.length - 1
    const initialShape = reduceMotion ? shapes[staticShapeIndex] : shapes[0]
    const currentPositions = new Float32Array(initialShape.positions)
    const targetPositions = new Float32Array(initialShape.positions)
    const seeds = new Float32Array(PARTICLE_COUNT)
    const sizes = new Float32Array(PARTICLE_COUNT)

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const seed = getSeed(index)
      seeds[index] = seed
      sizes[index] = 2.8 + seed * 3.2 + (index % 61 === 0 ? 1.8 : 0)
    }

    const geometry = new THREE.BufferGeometry()
    const positionAttribute = new THREE.BufferAttribute(currentPositions, 3)
    const targetAttribute = new THREE.BufferAttribute(targetPositions, 3)
    geometry.setAttribute("position", positionAttribute)
    geometry.setAttribute("aTarget", targetAttribute)
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1))
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      fragmentShader,
      transparent: true,
      uniforms: {
        uColor: { value: new THREE.Color("#327fc5") },
        uColorSoft: { value: new THREE.Color("#91b7d8") },
        uEnergy: { value: 0 },
        uFlowMode: { value: 0 },
        uOpacity: { value: reduceMotion ? 0.9 : 0 },
        uPixelRatio: { value: 1 },
        uPointScale: { value: 1 },
        uProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader,
    })

    const particles = new THREE.Points(geometry, material)
    particles.frustumCulled = false
    group.add(particles)

    const dustGeometry = createDustGeometry(680)
    const dustMaterial = new THREE.PointsMaterial({
      color: "#7fa8ca",
      depthTest: false,
      depthWrite: false,
      opacity: 0.16,
      size: 0.022,
      transparent: true,
    })
    const dust = new THREE.Points(dustGeometry, dustMaterial)
    group.add(dust)

    const clock = new THREE.Clock()
    let currentShapeIndex = reduceMotion ? staticShapeIndex : 0
    let currentShape = initialShape
    let layoutGeneration = 0
    const previousLayouts = shapes.map((shape) => shape.layout)
    let destroyed = false
    let holdTimer: number | undefined
    let targetRotationX = 0
    let targetRotationY = 0
    let morphAnimation: ReturnType<typeof animate> | null = null
    let introAnimation: ReturnType<typeof animate> | null = null
    let labelAnimation: ReturnType<typeof animate> | null = null
    let themeAnimation: ReturnType<typeof animate> | null = null

    const renderScene = () => {
      const elapsed = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsed
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.045
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.045
      dust.rotation.z = elapsed * 0.028
      dust.rotation.x = Math.sin(elapsed * 0.16) * 0.05
      renderer.render(scene, camera)
    }

    const resizeScene = () => {
      const width = Math.max(root.clientWidth, 1)
      const height = Math.max(root.clientHeight, 1)
      const pixelRatio = Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1.45 : 1.75)

      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(width, height, false)
      camera.aspect = width / height

      if (width < 560) {
        camera.position.z = 13.8
        group.scale.set(0.4, 0.92, 0.4)
        material.uniforms.uPointScale.value = 2
      } else if (width < 900) {
        camera.position.z = 11.8
        group.scale.setScalar(0.64)
        material.uniforms.uPointScale.value = 1.35
      } else if (width < 1180) {
        camera.position.z = 10.2
        group.scale.setScalar(0.82)
        material.uniforms.uPointScale.value = 1.12
      } else {
        camera.position.z = 9.4
        group.scale.setScalar(1)
        material.uniforms.uPointScale.value = 1
      }

      camera.updateProjectionMatrix()
      material.uniforms.uPixelRatio.value = pixelRatio

      if (reduceMotion) {
        renderScene()
      }
    }

    const updateTheme = (immediate = false) => {
      const styles = getComputedStyle(root)
      const primary = styles.getPropertyValue("--tf-particle-webgl").trim() || "#327fc5"
      const soft = styles.getPropertyValue("--tf-particle-webgl-soft").trim() || "#91b7d8"
      const dustColor = styles.getPropertyValue("--tf-particle-webgl-dust").trim() || "#7fa8ca"

      dustMaterial.color.set(dustColor)

      if (immediate || reduceMotion) {
        material.uniforms.uColor.value.set(primary)
        material.uniforms.uColorSoft.value.set(soft)
        renderScene()
        return
      }

      themeAnimation?.cancel()
      themeAnimation = animate(material, {
        uColor: primary,
        uColorSoft: soft,
        duration: 520,
        ease: "out(3)",
      })
    }

    const updateLabel = (label: string) => {
      const element = labelRef.current

      if (!element) {
        return
      }

      labelAnimation?.cancel()
      labelAnimation = animate(element, {
        opacity: [
          { to: 0, duration: 180, ease: "in(2)" },
          { to: 1, duration: 420, ease: "out(3)" },
        ],
        translateY: [
          { to: 5, duration: 180, ease: "in(2)" },
          { from: -5, to: 0, duration: 420, ease: "out(3)" },
        ],
      })

      window.setTimeout(() => {
        if (!destroyed) {
          element.textContent = label
        }
      }, 180)
    }

    const beginMorph = () => {
      if (destroyed || reduceMotion) {
        return
      }

      const nextShapeIndex = (currentShapeIndex + 1) % shapes.length
      let nextShape = shapes[nextShapeIndex]
      let nextSeed = sceneSeed
      let attempts = 0
      const previousSceneLayout = previousLayouts[nextShapeIndex]

      do {
        layoutGeneration += 1
        nextSeed =
          (sceneSeed +
            Math.imul(layoutGeneration + attempts, 0x9e3779b9) +
            nextShapeIndex * 7919) >>>
          0
        nextShape = createParticleShape(nextShapeIndex, nextSeed)
        attempts += 1
      } while (
        (nextShape.layout === currentShape.layout || nextShape.layout === previousSceneLayout) &&
        attempts < 8
      )

      const variation = getSeed(layoutGeneration * 37 + nextShapeIndex * 11)
      const duration = 1740 + variation * 620
      const energy = 0.66 + variation * 0.3

      currentPositions.set(currentShape.positions)
      targetPositions.set(nextShape.positions)
      positionAttribute.needsUpdate = true
      targetAttribute.needsUpdate = true
      material.uniforms.uProgress.value = 0
      material.uniforms.uEnergy.value = 0
      material.uniforms.uFlowMode.value = (nextSeed / 0xffffffff) * Math.PI * 2
      previousLayouts[nextShapeIndex] = nextShape.layout
      updateLabel(nextShape.label)

      morphAnimation?.cancel()
      morphAnimation = animate(material, {
        uEnergy: [
          { to: energy, duration: duration * 0.38, ease: "out(3)" },
          { to: 0, duration: duration * 0.62, ease: "inOut(2)" },
        ],
        uProgress: 1,
        duration,
        ease: "inOut(4)",
        onComplete: () => {
          currentShapeIndex = nextShapeIndex
          currentShape = nextShape
          holdTimer = window.setTimeout(beginMorph, 1350 + variation * 1050)
        },
      })
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      targetRotationX = y * -0.055
      targetRotationY = x * 0.075
    }

    const handlePointerLeave = () => {
      targetRotationX = 0
      targetRotationY = 0
    }

    const handleVisibility = () => {
      if (reduceMotion) {
        return
      }

      renderer.setAnimationLoop(document.hidden ? null : renderScene)
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault()
      renderer.setAnimationLoop(null)
      root.dataset.webgl = "fallback"
    }

    const resizeObserver = new ResizeObserver(resizeScene)
    const themeObserver = new MutationObserver(() => updateTheme())

    resizeObserver.observe(root)
    themeObserver.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    })
    window.addEventListener("resize", resizeScene)
    canvas.addEventListener("webglcontextlost", handleContextLost)

    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove)
      document.documentElement.addEventListener("pointerleave", handlePointerLeave)
      document.addEventListener("visibilitychange", handleVisibility)
      renderer.setAnimationLoop(renderScene)
      introAnimation = animate(material, {
        uOpacity: [0, 0.9],
        duration: 1350,
        ease: "out(4)",
      })
      holdTimer = window.setTimeout(beginMorph, 1650)
    } else {
      if (labelRef.current) {
        labelRef.current.textContent = shapes[staticShapeIndex].label
      }
      renderScene()
    }

    updateTheme(true)
    resizeScene()
    renderer.render(scene, camera)
    if (labelRef.current) {
      labelRef.current.textContent = shapes[currentShapeIndex].label
    }
    root.dataset.webgl = "ready"

    return () => {
      destroyed = true
      window.clearTimeout(holdTimer)
      window.removeEventListener("pointermove", handlePointerMove)
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
      document.removeEventListener("visibilitychange", handleVisibility)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      window.removeEventListener("resize", resizeScene)
      canvas.removeEventListener("webglcontextlost", handleContextLost)
      renderer.setAnimationLoop(null)
      morphAnimation?.cancel()
      introAnimation?.cancel()
      labelAnimation?.cancel()
      themeAnimation?.cancel()
      geometry.dispose()
      material.dispose()
      dustGeometry.dispose()
      dustMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="tf-particle-morph" data-webgl="loading" ref={rootRef}>
      <canvas
        aria-label="粒子在页面背景中随机组合成覆盖 68 个 Taroify 组件的多组界面系统"
        className="tf-particle-morph__canvas"
        ref={canvasRef}
        role="img"
      />
      <div aria-hidden="true" className="tf-particle-morph__fallback">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <span aria-hidden="true" className="tf-particle-morph__label" ref={labelRef}>
        Form controls · 14 · particle field · 68/71
      </span>
    </div>
  )
}
