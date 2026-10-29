import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  RoundedBox,
  Text,
  useTexture,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import javaIcon from "../../../../assets/skills/java.png";
import springIcon from "../../../../assets/skills/spring.png";
import kafkaIcon from "../../../../assets/skills/kafka.png";
import awsIcon from "../../../../assets/skills/aws.png";
import monoFont from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff?url";

const ICONS = [javaIcon, springIcon, kafkaIcon, awsIcon];
const ORBIT_RADIUS = 3.2;

const CODE = `@RestController
class CreditController {

  @PostMapping("/decision")
  Decision decide(Applicant a) {
    var score = bureau.fetch(a);
    kafka.send("credit.events", score);
    return rules.evaluate(score);
  }
}`;

const TOKEN_COLORS: [RegExp, string][] = [
  [/"[^"]*"/y, "#4fe3c8"],
  [/@\w+/y, "#ff8fb1"],
  [/\b(class|var|return|new)\b/y, "#a995ff"],
  [/\b[A-Z]\w*/y, "#ffd37a"],
];

const DEFAULT_COLOR = "#d8d4f0";
const CODE_FONT_SIZE = 0.13;
const CODE_LINE_HEIGHT = 1.55;
// JetBrains Mono advances 0.6em per character.
const CHAR_WIDTH = CODE_FONT_SIZE * 0.6;

interface Token {
  line: number;
  col: number;
  start: number;
  text: string;
  color: string;
}

const TOKENS: Token[] = (() => {
  const tokens: Token[] = [];
  let lineStart = 0;

  CODE.split("\n").forEach((lineText, line) => {
    let i = 0;
    let runStart = 0;

    const push = (from: number, to: number, color: string) => {
      const raw = lineText.slice(from, to);
      const text = raw.trimStart();
      if (!text) return;
      const lead = raw.length - text.length;
      tokens.push({ line, col: from + lead, start: lineStart + from + lead, text, color });
    };

    while (i < lineText.length) {
      let matched = false;
      for (const [re, color] of TOKEN_COLORS) {
        re.lastIndex = i;
        const m = re.exec(lineText);
        if (m) {
          push(runStart, i, DEFAULT_COLOR);
          push(i, i + m[0].length, color);
          i += m[0].length;
          runStart = i;
          matched = true;
          break;
        }
      }
      if (!matched) i += 1;
    }
    push(runStart, lineText.length, DEFAULT_COLOR);
    lineStart += lineText.length + 1;
  });

  return tokens;
})();

function useTypedCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((n) => (n >= CODE.length + 40 ? 0 : n + 1));
    }, 55);
    return () => window.clearInterval(id);
  }, []);

  return count;
}

function CodeText({ count }: { count: number }) {
  return (
    <group position={[-1.78, 0.98, 0.09]}>
      {TOKENS.map((token) => {
        const visible = token.text.slice(0, Math.max(0, count - token.start));
        if (!visible) return null;
        return (
          <Text
            key={`${token.line}-${token.col}`}
            font={monoFont}
            position={[token.col * CHAR_WIDTH, -token.line * CODE_FONT_SIZE * CODE_LINE_HEIGHT, 0]}
            fontSize={CODE_FONT_SIZE}
            color={token.color}
            anchorX="left"
            anchorY="top"
          >
            {visible}
          </Text>
        );
      })}
    </group>
  );
}

function CodeCard() {
  const count = useTypedCount();
  const lineNumbers = Array.from({ length: 10 }, (_, i) => i + 1).join("\n");

  return (
    <Float speed={1.2} floatIntensity={0.25} rotationIntensity={0.08}>
      <group rotation={[0, -0.18, 0]}>
        <RoundedBox args={[4.5, 3.05, 0.14]} radius={0.12} smoothness={5}>
          <meshStandardMaterial color="#14112b" roughness={0.45} metalness={0.3} />
        </RoundedBox>

        {/* Title bar */}
        <mesh position={[0, 1.3, 0.075]}>
          <planeGeometry args={[4.5, 0.4]} />
          <meshBasicMaterial color="#201b42" />
        </mesh>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
          <mesh key={c} position={[-2.0 + i * 0.2, 1.3, 0.09]}>
            <circleGeometry args={[0.055, 24]} />
            <meshBasicMaterial color={c} />
          </mesh>
        ))}
        <Text
          position={[-1.25, 1.3, 0.09]}
          fontSize={0.105}
          color="#8f89b8"
          anchorX="left"
          anchorY="middle"
        >
          CreditController.java
        </Text>

        <Text
          position={[-1.95, 0.98, 0.09]}
          font={monoFont}
          fontSize={0.13}
          lineHeight={1.55}
          color="#5b5780"
          anchorX="right"
          anchorY="top"
          textAlign="right"
        >
          {lineNumbers}
        </Text>
        <CodeText count={count} />
      </group>
    </Float>
  );
}

const SYMBOLS: { glyph: string; color: string; position: [number, number, number] }[] = [
  { glyph: "{ }", color: "#4fe3c8", position: [-2.5, 1.9, 0.6] },
  { glyph: "</>", color: "#ff8fb1", position: [2.5, -1.8, 0.7] },
  { glyph: "=>", color: "#a995ff", position: [2.6, 1.9, 0.4] },
];

function Symbols() {
  return (
    <>
      {SYMBOLS.map((s, i) => (
        <Float key={s.glyph} speed={1.4 + i * 0.3} floatIntensity={0.6} rotationIntensity={0.3}>
          <Text position={s.position} fontSize={0.42} color={s.color} anchorX="center" anchorY="middle">
            {s.glyph}
          </Text>
        </Float>
      ))}
    </>
  );
}

function Core() {
  return (
    <group>
      <CodeCard />
      <Symbols />
    </group>
  );
}

function IconTile({ src, index }: { src: string; index: number }) {
  const texture = useTexture(src);
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const angle = clock.elapsedTime * 0.28 + (index * Math.PI) / 2;
    ref.current.position.set(
      Math.cos(angle) * ORBIT_RADIUS,
      Math.sin(angle) * 2.25,
      Math.sin(angle) * 0.5
    );
  });

  return (
    <group ref={ref}>
      <Float speed={1.6} floatIntensity={0.35} rotationIntensity={0.25}>
        <RoundedBox args={[0.72, 0.72, 0.12]} radius={0.16} smoothness={5}>
          <meshPhysicalMaterial
            color="#f2efff"
            roughness={0.3}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.15}
          />
        </RoundedBox>
        <sprite scale={[0.4, 0.4, 0.4]} position={[0, 0, 0.1]}>
          <spriteMaterial map={texture} transparent depthWrite={false} />
        </sprite>
      </Float>
    </group>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const scale = size.width < 500 ? 0.6 : 0.82;

  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.3, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.18, 0.05);
  });

  return (
    <group ref={group} scale={scale}>
      <Core />
      {ICONS.map((src, i) => (
        <IconTile key={src} src={src} index={i} />
      ))}
    </group>
  );
}

const MAX_RECOVERIES = 3;

export function GlassScene() {
  const [attempt, setAttempt] = useState(0);

  // A lost WebGL context is rebuilt with a fresh canvas; give up after a few tries.
  if (attempt > MAX_RECOVERIES) return null;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        key={attempt}
        camera={{ position: [0, 0, 7.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            window.setTimeout(() => setAttempt((n) => n + 1), 300);
          });
        }}
      >
        <ambientLight intensity={0.35} />
        <Rig />
        {/* Procedural studio lights; no remote HDR needed */}
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={4} color="#9d8cff" position={[-4, 2, 3]} scale={[6, 3, 1]} />
          <Lightformer form="rect" intensity={3} color="#4fe3c8" position={[4, -1, 3]} scale={[5, 3, 1]} />
          <Lightformer form="ring" intensity={2.5} color="#ff8fb1" position={[0, 4, -3]} scale={4} />
          <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[0, 0, 6]} scale={[8, 4, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
