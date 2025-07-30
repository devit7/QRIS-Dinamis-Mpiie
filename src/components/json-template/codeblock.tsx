'use client'
import { JSX, useLayoutEffect, useState } from 'react'
import { highlight } from './shared'


export function CodeBlock({ initial, code }: { initial?: JSX.Element, code?:string }) {
    const [nodes, setNodes] = useState(initial)

    useLayoutEffect(() => {
        if (code) {
            void highlight(code, 'json').then(setNodes)
        }
    }, [code]) // Add code as dependency so it re-renders when code changes

    return (
        <div className="overflow-auto max-w-full h-[300px] border rounded-md">
            <pre className="whitespace-pre-wrap break-words text-sm ">
                {nodes ?? <p>Loading...</p>}
            </pre>
        </div>
    )
}