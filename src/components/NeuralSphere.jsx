'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const TEAL = 0x1fb2ac;
const NODE_COUNT = 160;
const LINK_DISTANCE = 0.62;
const PULSE_COUNT = 28;

// Soft round sprite so points render as glowing dots instead of squares
function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.8)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

// Rotating 3D "brain" of nodes and links with signals travelling along the links.
// Renders `fallback` if WebGL is unavailable.
export default function NeuralSphere({ fallback = null }) {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // CSS controls the displayed size so the canvas never pushes its grid column wider
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6;
    const group = new THREE.Group();
    scene.add(group);

    // Nodes: Fibonacci sphere with jittered radius
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      const radius = 1.75 + (Math.random() - 0.5) * 0.35;
      nodes.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
    }
    const texture = dotTexture();
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes);
    const nodeColors = nodes.flatMap(() => (Math.random() < 0.15 ? [1, 1, 1] : [0.12, 0.7, 0.67]));
    nodeGeo.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.11, map: texture, vertexColors: true, transparent: true, depthWrite: false,
    });
    group.add(new THREE.Points(nodeGeo, nodeMat));

    // Links between nearby nodes
    const edges = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < LINK_DISTANCE) edges.push([i, j]);
      }
    }
    const linkGeo = new THREE.BufferGeometry().setFromPoints(edges.flatMap(([a, b]) => [nodes[a], nodes[b]]));
    const linkMat = new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.22 });
    group.add(new THREE.LineSegments(linkGeo, linkMat));

    // Inner wireframe core
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: TEAL, wireframe: true, transparent: true, opacity: 0.35 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Signals: bright dots moving along random links
    const pulses = Array.from({ length: PULSE_COUNT }, () => ({
      edge: edges[Math.floor(Math.random() * edges.length)],
      t: Math.random(),
      speed: 0.006 + Math.random() * 0.012,
    }));
    const pulsePositions = new Float32Array(PULSE_COUNT * 3);
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMat = new THREE.PointsMaterial({
      size: 0.16, map: texture, color: 0xffffff, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(pulseGeo, pulseMat));

    const tmp = new THREE.Vector3();
    function updatePulses(advance) {
      pulses.forEach((p, i) => {
        if (advance) {
          p.t += p.speed;
          if (p.t >= 1) {
            p.t = 0;
            p.edge = edges[Math.floor(Math.random() * edges.length)];
          }
        }
        tmp.lerpVectors(nodes[p.edge[0]], nodes[p.edge[1]], p.t);
        pulsePositions.set([tmp.x, tmp.y, tmp.z], i * 3);
      });
      pulseGeo.attributes.position.needsUpdate = true;
    }

    // Size to container
    function resize() {
      const { clientWidth: w, clientHeight: h } = mount;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // Mouse parallax
    const target = { x: 0, y: 0 };
    function onPointer(e) {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.6;
    }
    window.addEventListener('pointermove', onPointer);

    // Only animate while visible on screen
    let frame = null;
    let spin = 0;
    function tick() {
      spin += 0.0025;
      group.rotation.y = spin + target.x;
      group.rotation.x += (target.y - group.rotation.x) * 0.05;
      core.rotation.x -= 0.004;
      core.rotation.z += 0.003;
      updatePulses(true);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !frame && !reduceMotion) frame = requestAnimationFrame(tick);
      if (!entry.isIntersecting && frame) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    });
    io.observe(mount);

    updatePulses(false);
    renderer.render(scene, camera);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      [nodeGeo, linkGeo, coreGeo, pulseGeo, nodeMat, linkMat, coreMat, pulseMat, texture].forEach(o => o.dispose());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  if (failed) return fallback;
  return <div ref={mountRef} className="w-full aspect-square max-w-lg" aria-hidden="true" />;
}
