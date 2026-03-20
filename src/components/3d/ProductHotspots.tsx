import { useState } from "react";
import { Html } from "@react-three/drei";
import { HOTSPOTS } from "@/utils/constants";

interface HotspotProps {
  position: [number, number, number];
  title: string;
  description: string;
  onClick: () => void;
}

function Hotspot({ position, title, description, onClick }: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color={isHovered ? "#EAEAF0" : "#9A9AA3"}
          transparent
          opacity={0.8}
        />
      </mesh>

      {isHovered && (
        <Html
          position={[0.2, 0, 0]}
          center
          distanceFactor={8}
          style={{
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <div className="bg-surface/95 backdrop-blur-sm px-4 py-3 rounded-lg border border-accent shadow-lg min-w-[200px]">
            <h4 className="text-text-primary font-medium text-sm mb-1">
              {title}
            </h4>
            <p className="text-text-secondary text-xs leading-relaxed">
              {description}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

export function ProductHotspots() {
  const handleHotspotClick = (id: string) => {
    console.log(`Hotspot clicked: ${id}`);
  };

  return (
    <group>
      {HOTSPOTS.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          position={hotspot.position}
          title={hotspot.title}
          description={hotspot.description}
          onClick={() => handleHotspotClick(hotspot.id)}
        />
      ))}
    </group>
  );
}
