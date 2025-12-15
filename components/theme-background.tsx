"use client";

import { Effects } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Particles } from "./Particles";
import { VignetteShader } from "./shaders/vignetteShader";

export default function ThemeBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Delay rendering để giảm TBT
  useEffect(() => {
    // Chờ hydration xong
    setMounted(true);
    // Delay render Canvas để không block main thread
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !shouldRender) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none bg-background" />
    );
  }

  const isDark = theme === "dark";
  const backgroundColor = isDark ? "#000000" : "#ffffff";

  const fov = 45;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        className="w-full h-full"
        camera={{
          position: [1.2, 2.8, -1.3],
          fov,
          near: 0.01,
          far: 300,
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: false }}
      >
        <color attach="background" args={[backgroundColor]} />
        <Particles
          speed={1.0}
          aperture={1.4}
          focus={3.8}
          size={256}
          noiseScale={0.3}
          noiseIntensity={1.1}
          timeScale={0.3}
          pointSize={6}
          opacity={0.75}
          planeScale={12}
          isDark={isDark}
        />
        <Effects multisamping={0} disableGamma>
          <shaderPass
            args={[VignetteShader]}
            uniforms-darkness-value={1.5}
            uniforms-offset-value={0.4}
          />
        </Effects>
      </Canvas>
    </div>
  );
}
