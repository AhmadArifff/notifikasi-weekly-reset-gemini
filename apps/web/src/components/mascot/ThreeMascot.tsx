'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useChronosStore } from '@/lib/store/useChronosStore';
import { Heart } from 'lucide-react';

export const ThreeMascot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useChronosStore();
  const mascotMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const point = new THREE.PointLight(0xf43f5e, 2, 50);
    point.position.set(4, 4, 4);
    scene.add(point);

    const geometry = new THREE.TorusGeometry(0.8, 0.35, 16, 100);
    const material = new THREE.MeshStandardMaterial({
      color: theme === 'hacker' ? 0x00ff41 : theme === 'obsidian' ? 0x10b981 : 0xf43f5e,
      roughness: 0.2,
      metalness: 0.1,
      wireframe: theme === 'hacker',
    });
    const mascotMesh = new THREE.Mesh(geometry, material);
    scene.add(mascotMesh);
    mascotMeshRef.current = mascotMesh;

    let clock = new THREE.Clock();
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mascotMesh.rotation.x = Math.sin(t * 1.2) * 0.4;
      mascotMesh.rotation.y += 0.012;
      const scale = 1 + Math.sin(t * 2.5) * 0.05;
      mascotMesh.scale.set(scale, scale, scale);
      renderer.render(scene, camera);
    }
    animate();

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      mascotMesh.rotation.y += (e.clientX - prevX) * 0.01;
      mascotMesh.rotation.x += (e.clientY - prevY) * 0.01;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
    };
  }, []);

  // Update material on theme change
  useEffect(() => {
    if (!mascotMeshRef.current) return;
    const mat = mascotMeshRef.current.material as THREE.MeshStandardMaterial;
    if (theme === 'cute') {
      mat.color.setHex(0xf43f5e);
      mat.wireframe = false;
    } else if (theme === 'hacker') {
      mat.color.setHex(0x00ff41);
      mat.wireframe = true;
    } else if (theme === 'obsidian') {
      mat.color.setHex(0x10b981);
      mat.wireframe = false;
    }
  }, [theme]);

  const getMascotTitle = () => {
    if (theme === 'hacker') return 'Cyber Core Mesh';
    if (theme === 'obsidian') return 'Obsidian Torus';
    return '3D Kawaii Mascot';
  };

  return (
    <div className="theme-card p-5 md:col-span-1 flex flex-col items-center justify-between min-h-[320px]">
      <div className="w-full flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-rose-500" />
          <span>{getMascotTitle()}</span>
        </span>
        <span className="pill-badge px-2 py-0.5 text-[10px]">Happy Pulse</span>
      </div>

      <div
        ref={containerRef}
        className="w-full h-52 flex items-center justify-center cursor-grab active:cursor-grabbing"
      />

      <div className="text-center w-full">
        <p className="text-[11px] opacity-75 font-medium">Putar maskot dengan mouse atau jari Anda!</p>
      </div>
    </div>
  );
};
