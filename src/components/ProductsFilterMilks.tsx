"use client"

import { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import Link from 'next/link'
import { getMilkTypes } from "@/app/_actions/milk-actions"

export default function ProductsFilterMilks() {
  const [isOpen, setIsOpen] = useState(false)
  const [milkTypes, setMilkTypes] = useState<{ id: string; name: string; createdAt: Date; updatedAt: Date; }[]>([])

  useEffect(() => {
    getMilkTypes().then(setMilkTypes)
  }, [])

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(!isOpen)}
        className="border-2 rounded-md p-2"
      >
        Types de lait
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full mt-2 bg-white rounded-md shadow-lg z-50 min-w-[200px]">
            <nav className="flex flex-col p-2">
              {milkTypes.map((type) => (
                <Link 
                  key={type.id}
                  href={`/milks/${encodeURIComponent(type.name)}`}
                  className="px-4 py-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {type.name}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
