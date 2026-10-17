import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Line,
  RoundedBox,
  Text,
  useTexture,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import skillsData from "../../../data/skills.json";

import javaIcon from "../../../../assets/skills/java.png";
import springIcon from "../../../../assets/skills/spring.png";
import kafkaIcon from "../../../../assets/skills/kafka.png";
import awsIcon from "../../../../assets/skills/aws.png";

const ACCENT = "#b7ff3c";
const HERO_SKILL_TITLES = ["Java", "Spring", "Kafka", "AWS"];

type Skill = {
  title: string;
  imageSrc: string;
};

type NodePosition = [number, number, number];

const skills = skillsData as Skill[];

const heroSkills = HERO_SKILL_TITLES.map((title) =>
  skills.find((skill) => skill.title === title)
).filter((skill): skill is Skill => Boolean(skill));

const nodePositions: Record<string, NodePosition> = {
  Java: [-2.10, 1.52, 0.30],
  Spring: [2.10, 1.42, 0.30],
  Kafka: [-2.18, -0.28, 0.30],
  AWS: [2.18, -0.28, 0.30],
};

const nodeColors: Record<string, string> = {
  Java: "#e76f51",
  Spring: "#6db33f",
  Kafka: "#ffffff",
  AWS: "#ffb347",
};

function Monitor() {
  const screenMaterial = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (!screenMaterial.current) return;

    screenMaterial.current.emissiveIntensity =
      0.20 + Math.sin(clock.elapsedTime * 1.4) * 0.018;
  });

  return (
    <group position={[0, 0.48, 0]}>
      {/* Monitor shell */}
      <RoundedBox
        args={[3.35, 2.0, 0.2]}
        radius={0.09}
        smoothness={6}
      >
        <meshStandardMaterial
          color="#242a29"
          metalness={0.78}
          roughness={0.24}
        />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, 0.115]}>
        <planeGeometry args={[3.04, 1.72]} />

        <meshStandardMaterial
          ref={screenMaterial}
          color="#081008"
          emissive="#294b18"
          emissiveIntensity={0.20}
          metalness={0.05}
          roughness={0.62}
        />
      </mesh>

      {/* Terminal */}
      <Text
        position={[-1.34, 0.61, 0.14]}
        fontSize={0.095}
        color="#a4b78e"
        anchorX="left"
        anchorY="middle"
      >
        tarun@engineer ~
      </Text>

      <Text
        position={[-1.34, 0.32, 0.14]}
        fontSize={0.082}
        color="#b0bba7"
        anchorX="left"
        anchorY="top"
        lineHeight={1.48}
      >
        {"$ whoami\nsoftware engineer\n\n$ system.status()\nAPI          ONLINE\nDATABASE     ONLINE\nKAFKA        STREAMING\nAWS          READY"}
      </Text>

      <Text
        position={[-1.34, -0.59, 0.14]}
        fontSize={0.082}
        color={ACCENT}
        anchorX="left"
        anchorY="middle"
      >
        {"$ _"}
      </Text>

      {/* Monitor stand */}
      <mesh position={[0, -1.22, 0]}>
        <boxGeometry args={[0.14, 0.62, 0.14]} />
        <meshStandardMaterial
          color="#222827"
          metalness={0.76}
          roughness={0.25}
        />
      </mesh>

      <RoundedBox
        args={[1.25, 0.09, 0.5]}
        radius={0.025}
        smoothness={4}
        position={[0, -1.54, 0]}
      >
        <meshStandardMaterial
          color="#202524"
          metalness={0.74}
          roughness={0.27}
        />
      </RoundedBox>
    </group>
  );
}

function Keyboard() {
  const rows = [12, 12, 11, 9];

  return (
    <group position={[0, -1.18, 0.48]} rotation={[-0.16, 0, 0]}>
      <RoundedBox
        args={[2.72, 0.16, 0.88]}
        radius={0.07}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#252b29"
          metalness={0.62}
          roughness={0.32}
        />
      </RoundedBox>

      {rows.map((count, rowIndex) => {
        const spacing = 0.19;
        const totalWidth = (count - 1) * spacing;

        return Array.from({ length: count }).map((_, index) => (
          <mesh
            key={`${rowIndex}-${index}`}
            position={[
              -totalWidth / 2 + index * spacing,
              0.105,
              -0.27 + rowIndex * 0.17,
            ]}
          >
            <boxGeometry args={[0.145, 0.035, 0.12]} />
            <meshStandardMaterial
              color="#555d58"
              metalness={0.15}
              roughness={0.58}
            />
          </mesh>
        ));
      })}

      <mesh position={[0, 0.11, 0.26]}>
        <boxGeometry args={[0.92, 0.04, 0.13]} />
        <meshStandardMaterial
          color="#484f4b"
          metalness={0.15}
          roughness={0.58}
        />
      </mesh>
    </group>
  );
}

const skillIconMap: Record<string, string> = {
  Java: javaIcon,
  Spring: springIcon,
  Kafka: kafkaIcon,
  AWS: awsIcon,
};

function SkillIcon({
  skill,
  accent,
}: {
  skill: Skill;
  accent: string;
}) {
  const texture = useTexture(skillIconMap[skill.title]);

  return (
    <group>
      <sprite scale={[0.25, 0.25, 0.25]} position={[-0.22, 0, 0.12]}>
        <spriteMaterial
          map={texture}
          transparent
          depthWrite={false}
        />
      </sprite>

      <Text
        position={[0.17, 0, 0.12]}
        fontSize={0.075}
        color={ACCENT}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.5}
      >
        {skill.title.toUpperCase()}
      </Text>

      <mesh position={[0, -0.15, 0.11]}>
        <boxGeometry args={[0.42, 0.012, 0.018]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

function SkillNode({
  skill,
  position,
  active,
}: {
  skill: Skill;
  position: NodePosition;
  active?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const accent = nodeColors[skill.title] ?? ACCENT;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.z =
      Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.025;
  });

  return (
    <Float
      speed={1.15}
      rotationIntensity={0.08}
      floatIntensity={0.18}
    >
      <group ref={groupRef} position={position}>
        <RoundedBox
          args={[1.08, 0.44, 0.10]}
          radius={0.08}
          smoothness={5}
        >
          <meshStandardMaterial
            color="#101511"
            metalness={0.72}
            roughness={0.26}
            emissive="#1b2a12"
            emissiveIntensity={active ? 0.8 : 0.42}
          />
        </RoundedBox>

        <SkillIcon skill={skill} accent={accent} />
      </group>
    </Float>
  );
}

function Connection({
  points,
  delay = 0,
}: {
  points: NodePosition[];
  delay?: number;
}) {
  const packetRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const vectors = points.map((point) => new THREE.Vector3(...point));

    const curvePoints: THREE.Vector3[] = [];

    for (let i = 0; i < vectors.length - 1; i += 1) {
      const start = vectors[i];
      const end = vectors[i + 1];
      const segment = new THREE.LineCurve3(start, end);

      segment.getPoints(12).forEach((point, pointIndex) => {
        if (i > 0 && pointIndex === 0) return;
        curvePoints.push(point);
      });
    }

    return new THREE.CatmullRomCurve3(
      curvePoints,
      false,
      "centripetal",
      0.15
    );
  }, [points]);

  const linePoints = useMemo(
    () =>
      curve
        .getPoints(48)
        .map((point) => point.toArray() as NodePosition),
    [curve]
  );

  useFrame(({ clock }) => {
    if (!packetRef.current) return;

    const progress =
      ((clock.elapsedTime * 0.18 + delay) % 1 + 1) % 1;

    const point = curve.getPointAt(progress);
    packetRef.current.position.copy(point);
  });

  return (
    <>
      <Line
        points={linePoints}
        color="#587d2d"
        lineWidth={1.35}
        transparent
        opacity={0.82}
      />

      <mesh ref={packetRef}>
        <sphereGeometry args={[0.045, 14, 14]} />
        <meshBasicMaterial
          color={ACCENT}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function SkillNetwork() {
  const connectionPaths: Record<string, NodePosition[]> = {
    Java: [
      nodePositions.Java,
      [-1.72, 1.52, 0.18],
      [-1.72, 1.42, 0.18],
      [-1.42, 1.42, 0.18],
    ],
    Spring: [
      nodePositions.Spring,
      [1.72, 1.42, 0.18],
      [1.72, 1.32, 0.18],
      [1.42, 1.32, 0.18],
    ],
    Kafka: [
      nodePositions.Kafka,
      [-1.78, -0.28, 0.18],
      [-1.78, -0.42, 0.18],
      [-1.45, -0.42, 0.18],
    ],
    AWS: [
      nodePositions.AWS,
      [1.78, -0.28, 0.18],
      [1.78, -0.42, 0.18],
      [1.45, -0.42, 0.18],
    ],
  };

  return (
    <group>
      {heroSkills.map((skill, index) => (
        <Connection
          key={`connection-${skill.title}`}
          points={connectionPaths[skill.title]}
          delay={index * 0.19}
        />
      ))}

      {heroSkills.map((skill) => (
        <SkillNode
          key={skill.title}
          skill={skill}
          position={nodePositions[skill.title]}
          active={skill.title === "Java" || skill.title === "Spring"}
        />
      ))}
    </group>
  );
}

function FloorGrid() {
  return (
    <gridHelper
      args={[4.8, 24, "#162015", "#090d09"]}
      position={[0, -2.05, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function Workstation() {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const isMobile = size.width < 600;

  useFrame(({ mouse }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.08,
      0.035
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.035,
      0.035
    );
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0.30, 0]}
      scale={isMobile ? 0.72 : 0.86}
    >
      <Monitor />
      <Keyboard />
      <SkillNetwork />
    </group>
  );
}

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useFrame(() => {
    const isMobile = size.width < 600;
    const targetZ = isMobile ? 5.7 : size.width < 900 ? 6.7 : 7.5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function HeroScene() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{
          position: [0, 0.05, 7.5],
          fov: 42,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={0.52} />

        <pointLight
          position={[0, 3, 5]}
          intensity={4.2}
          distance={11}
        />

        <pointLight
          position={[-4, 1.5, 3]}
          intensity={2.0}
          distance={8}
        />

        <pointLight
          position={[4, 1.5, 3]}
          intensity={2.0}
          distance={8}
        />

        <pointLight
          position={[0, 0.8, -3]}
          intensity={0.32}
          distance={8}
          color="#6bff2b"
        />

        <pointLight
          position={[0, 1.0, 2.5]}
          intensity={0.9}
          distance={5}
          color="#b7ff3c"
        />

        <ResponsiveCamera />
        <Workstation />
        <FloorGrid />
      </Canvas>
    </div>
  );
}
