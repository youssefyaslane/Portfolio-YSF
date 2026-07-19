import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber'

type GLTFModelProps = ThreeElements['group'] & {
  path: string
}

/**
 * Loads a static (non-animated) GLTF and renders a cloned instance.
 * Cloning is required because the same cached scene graph can't be
 * attached at multiple positions at once (e.g. the same tree model
 * reused across several stops).
 */
export function GLTFModel({ path, ...props }: GLTFModelProps) {
  const { scene } = useGLTF(path)

  const cloned = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
    return clone
  }, [scene])

  return (
    <group {...props}>
      <primitive object={cloned} />
    </group>
  )
}
