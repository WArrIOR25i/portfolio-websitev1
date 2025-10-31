import { NextResponse } from "next/server"

export async function GET() {
  const cvContent = `
RAJATH K
Bangalore, India | 21

EDUCATION
Bachelor of Computer Applications
Game Design & Graphics
Shoolini University, Himachal Pradesh
Graduated: 2025

FEATURED PROJECTS

Procedural Dungeon Generator (2024)
Advanced dungeon generation system using procedural algorithms in Unity. 
Features dynamic level layout, enemy placement, and interactive puzzle mechanics.

Character Animation Suite (2024)
Comprehensive character animation set in Blender with 50+ animations.
Includes rigging, motion capture integration, and seamless blend states.

3D Environment Pack (2023)
Modular sci-fi environment with high-quality renders.
Optimized for real-time rendering with custom shaders and materials.

SKILLS & EXPERTISE

Game Engines: Unity, Unreal Engine, Godot
3D Software: Blender, 3ds Max, Substance Painter
Programming: C#, C++, Python, JavaScript
Animation: Motion Design, Character Rigging, VFX
Design: UI/UX, Level Design, Concept Art
Tools & Version Control: Git, GitHub, Visual Studio Code
  `

  const headers = new Headers({
    "Content-Type": "text/plain",
    "Content-Disposition": 'attachment; filename="RAJATH_K_CV.txt"',
  })

  return new NextResponse(cvContent, { headers })
}
