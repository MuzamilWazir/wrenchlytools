'use client'

import { useEffect, useState, type ComponentType } from 'react'
import {
 CATEGORY_MODULES,
 getToolBinding,
 type ToolComponentBinding,
} from './toolComponentMap'

function ToolSkeleton() {
 return (
 <div className="space-y-6 animate-pulse" role="status" aria-label="Loading tool">
 <div className="grid gap-4 sm:grid-cols-2">
 <div className="h-32 rounded-2xl bg-stone-200/70" />
 <div className="h-32 rounded-2xl bg-stone-200/70" />
 </div>
 <div className="h-40 rounded-2xl bg-stone-200/70" />
 </div>
 )
}

function useToolComponent(binding: ToolComponentBinding | undefined) {
 const [Loaded, setLoaded] = useState<ComponentType | null>(null)
 const [failed, setFailed] = useState(false)

 useEffect(() => {
 if (!binding) return

 let active = true
 setLoaded(null)
 setFailed(false)

 CATEGORY_MODULES[binding.category]().then(
 (module) => {
 const component = module[binding.exportName]
 if (active && component) setLoaded(() => component)
 },
 () => {
 if (active) setFailed(true)
 },
 )

 return () => {
 active = false
 }
 }, [binding])

 return { Loaded, failed }
}

export default function ToolBody({ slug }: { slug: string }) {
 const binding = getToolBinding(slug)
 const { Loaded, failed } = useToolComponent(binding)

 if (!binding) {
 return (
 <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-sm text-stone-500">
 This tool is not available.
 </div>
 )
 }

 if (failed) {
 return (
 <div className="rounded-2xl border border-red-200 p-8 text-center text-sm text-red-600">
 The tool could not be loaded. Please refresh the page and try again.
 </div>
 )
 }

 if (!Loaded) return <ToolSkeleton />

 return <Loaded />
}
