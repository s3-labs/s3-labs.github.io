'use client'

import React, { useState, useEffect } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'

interface TreeConfig {
  parentSize: number
  childSize: number
  parentX: number
  child1X: number
  child2X: number
  child3X: number
  fontSize: number
}

const getTreeConfig = (windowWidth: number): TreeConfig => {
  if (windowWidth < 640) {
    // Mobile
    return {
      parentSize: 80,
      childSize: 90,
      parentX: 150,
      child1X: 30,
      child2X: 130,
      child3X: 230,
      fontSize: 10,
    }
  } else if (windowWidth < 1024) {
    // Tablet
    return {
      parentSize: 100,
      childSize: 110,
      parentX: 250,
      child1X: 70,
      child2X: 200,
      child3X: 330,
      fontSize: 11,
    }
  } else {
    // Desktop
    return {
      parentSize: 120,
      childSize: 140,
      parentX: 400,
      child1X: 50,
      child2X: 380,
      child3X: 710,
      fontSize: 13,
    }
  }
}

const createNodes = (config: TreeConfig): Node[] => [
  {
    id: 'parent',
    data: { label: 'S3' },
    position: { x: config.parentX, y: 0 },
    draggable: false,
    style: {
      width: config.parentSize,
      height: config.parentSize,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(8px) saturate(120%)',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: '800',
      color: '#32a852',
      boxShadow: '0 8px 32px rgba(50, 168, 82, 0.1)',
      cursor: 'default',
      transition: 'transform 0.3s ease',
    },
  },
  {
    id: 'child1',
    data: { label: 'Smart Solutions\nfor the Society' },
    position: { x: config.child1X, y: 150 },
    draggable: false,
    style: {
      width: config.childSize,
      height: config.childSize,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(8px) saturate(120%)',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${config.fontSize}px`,
      fontWeight: '600',
      color: '#32a852',
      textAlign: 'center',
      padding: '8px',
      boxShadow: '0 8px 32px rgba(30, 64, 175, 0.08)',
      cursor: 'default',
      transition: 'transform 0.3s ease',
    },
  },
  {
    id: 'child2',
    data: { label: 'Simple Solutions\nby Students' },
    position: { x: config.child2X, y: 150 },
    draggable: false,
    style: {
      width: config.childSize,
      height: config.childSize,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(8px) saturate(120%)',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${config.fontSize}px`,
      fontWeight: '600',
      color: '#32a852',
      textAlign: 'center',
      padding: '8px',
      boxShadow: '0 8px 32px rgba(50, 168, 82, 0.08)',
      cursor: 'default',
      transition: 'transform 0.3s ease',
    },
  },
  {
    id: 'child3',
    data: { label: 'Scalable Smart\nSystems' },
    position: { x: config.child3X, y: 150 },
    draggable: false,
    style: {
      width: config.childSize,
      height: config.childSize,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(8px) saturate(120%)',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${config.fontSize}px`,
      fontWeight: '600',
      color: '#32a852',
      textAlign: 'center',
      padding: '8px',
      boxShadow: '0 8px 32px rgba(50, 168, 82, 0.08)',
      cursor: 'default',
      transition: 'transform 0.3s ease',
    },
  },
]

const initialEdges: Edge[] = [
  { id: 'parent-child1', source: 'parent', target: 'child1', animated: true, style: { stroke: '#32a852', strokeWidth: 2, opacity: 0.5 } },
  { id: 'parent-child2', source: 'parent', target: 'child2', animated: true, style: { stroke: '#32a852', strokeWidth: 2, opacity: 0.5 } },
  { id: 'parent-child3', source: 'parent', target: 'child3', animated: true, style: { stroke: '#32a852', strokeWidth: 2, opacity: 0.5 } },
]

export default function S3Tree(){
  const [windowWidth, setWindowWidth] = useState<number>(1024)
  const config = getTreeConfig(windowWidth)
  const [nodes, setNodes] = useNodesState(createNodes(config))
  const [edges] = useEdgesState(initialEdges)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setNodes(createNodes(config))
  }, [windowWidth, setNodes])

  const getContainerHeight = () => {
    if (windowWidth < 640) return 'h-80'
    if (windowWidth < 1024) return 'h-96'
    return 'h-96'
  }

  return (
    <>
      <style>{`
        .reactflow-wrapper {
          background: transparent !important;
        }
        .react-flow__attribution {
          display: none !important;
        }
        .react-flow__node:hover {
          transform: scale(1.05);
        }
        .react-flow__pane {
          cursor: default !important;
        }
      `}</style>
      <div className={`w-full ${getContainerHeight()} overflow-x-auto`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodesDraggable={false}
          nodesConnectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          fitView
        >
          <Background color="#32a852" gap={16} size={0.5} style={{ opacity: 0.1 }} />
        </ReactFlow>
      </div>
    </>
  )
}
