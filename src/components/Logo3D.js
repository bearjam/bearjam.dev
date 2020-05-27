import React from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { OrbitControls } from "drei"
import * as THREE from "three"
import { useSpring } from "framer-motion"
import { useRef } from "react"
import { useEffect } from "react"

const Box = () => {
  return (
    <mesh>
      <boxGeometry attach="geometry" />
      {["rgb(240,182,211)", "rgb(102,16,242)", "rgb(172,131,248)"]
        .flatMap(x => [x, x])
        .map((color, i) => (
          <meshBasicMaterial key={i} color={color} attachArray="material" />
        ))}
    </mesh>
  )
}

const Material = props => (
  <meshBasicMaterial color="rgb(102,16,242)" {...props} />
)

const B = props => {
  return (
    <group {...props}>
      <mesh position={[0, -0.1, 0]}>
        <ringGeometry attach="geometry" args={[0.15, 0.2, 64]} />
        <Material attach="material" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.175, 0.08, 0]}>
        <planeGeometry attach="geometry" args={[0.05, 0.375]} />
        <Material attach="material" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.175, 0.27, 0]}>
        <circleGeometry attach="geometry" args={[0.025, 64]} />
        <Material attach="material" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

const Logo = () => {
  const groupRef = useRef()
  const x = useSpring(0, { damping: 0, mass: 5, stiffness: 100 })
  useFrame(() => {
    groupRef.current.rotation.y = x.get()
  })
  useEffect(() => {
    x.set(3)
  }, [])
  return (
    <group ref={groupRef}>
      <Box />
      <B position={[0, 0, 0.501]} />
      <B position={[0, 0, -0.501]} rotation={new THREE.Euler(0, Math.PI, 0)} />
    </group>
  )
}

const Logo3D = props => {
  return (
    <Canvas
      colorManagement
      // style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 0.9, 1.3] }}
      {...props}
    >
      <Logo />
      {/* <OrbitControls
      // autoRotate
      // autoRotateSpeed={50}
      // minPolarAngle={Math.PI / 3}
      // maxPolarAngle={Math.PI}
      // minAzimuthAngle={Math.PI / 2}
      /> */}
      {/* <axesHelper /> */}
    </Canvas>
  )
}

export default Logo3D
