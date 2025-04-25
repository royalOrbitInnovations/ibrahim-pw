// "use client";
//
// import Particles from "react-tsparticles";
// import { loadLinksPreset } from "tsparticles-preset-links";
// import { useCallback } from "react";
//
// export default function ConstellationBg() {
//   // preload preset once
//   const init = useCallback(async (engine) => {
//     await loadLinksPreset(engine);
//   }, []);
//
//   return (
//     <Particles
//       id="tsparticles"
//       init={init}
//       className="fixed inset-0 -z-10"
//       options={{
//         preset: "links",
//         fullScreen: false,
//         fpsLimit: 60,
//         background: { color: "transparent" },
//         particles: {
//           number: { value: 75, density: { enable: true, area: 800 } },
//           color: { value: "#ffffff" },
//           links: {
//             enable: true,
//             color: "#ffffff",
//             opacity: 0.2,
//             distance: 140,
//             width: 1,
//           },
//           move: {
//             enable: true,
//             speed: 1,
//             direction: "none",
//             outModes: { default: "bounce" },
//             attract: { enable: false },
//           },
//           opacity: {
//             value: 0.7,
//             animation: { enable: true, speed: 0.5, minimumValue: 0.3 },
//           },
//           size: { value: 2, random: true },
//         },
//         interactivity: {
//           events: {
//             onHover: { enable: true, mode: "repulse" },
//             onClick: { enable: false },
//             resize: true,
//           },
//           modes: { repulse: { distance: 150, duration: 0.4 } },
//         },
//         detectRetina: true,
//       }}
//     />
//   );
// }

"use client";

import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";
import { useCallback } from "react";

export default function ConstellationBg() {
  // preload preset once
  const init = useCallback(async (engine) => {
    await loadLinksPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      className="-z-10"
      options={{
        // enable the fullscreen canvas plugin so it spans the viewport
        fullScreen: {
          enable: true,
          zIndex: -10,
        },
        fpsLimit: 60,
        background: { color: "transparent" },
        particles: {
          number: { value: 75, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          links: {
            enable: true,
            color: "#ffffff",
            opacity: 0.2,
            distance: 140,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: { default: "bounce" },
            attract: { enable: false },
          },
          opacity: {
            value: 0.7,
            animation: { enable: true, speed: 0.5, minimumValue: 0.3 },
          },
          size: { value: 2, random: true },
        },
        interactivity: {
          detectsOn: "canvas", // listen for hover on the canvas itself
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: false },
            resize: true,
          },
          modes: {
            repulse: { distance: 150, duration: 0.4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
