import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useProductStore } from "@/store/useProductStore";
import { CAMERA_POSITIONS } from "@/utils/constants";
import { lerp } from "@/utils/helpers";
import * as THREE from "three";
import { gsap } from "gsap";

export function CameraRig() {
  const { camera } = useThree();
  const cameraState = useProductStore((state) => state.cameraState);
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    const target = CAMERA_POSITIONS[cameraState];

    gsap.to(targetPosition.current, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      duration: 1.5,
      ease: "power2.inOut",
    });

    gsap.to(targetLookAt.current, {
      x: target.target[0],
      y: target.target[1],
      z: target.target[2],
      duration: 1.5,
      ease: "power2.inOut",
    });
  }, [cameraState]);

  useFrame(() => {
    camera.position.x = lerp(camera.position.x, targetPosition.current.x, 0.05);
    camera.position.y = lerp(camera.position.y, targetPosition.current.y, 0.05);
    camera.position.z = lerp(camera.position.z, targetPosition.current.z, 0.05);

    currentLookAt.current.x = lerp(
      currentLookAt.current.x,
      targetLookAt.current.x,
      0.05,
    );
    currentLookAt.current.y = lerp(
      currentLookAt.current.y,
      targetLookAt.current.y,
      0.05,
    );
    currentLookAt.current.z = lerp(
      currentLookAt.current.z,
      targetLookAt.current.z,
      0.05,
    );

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
