'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatNumber } from "@/lib/formatters"
import { useEffect, useState } from 'react'

function AdminDashboard() {
  const [productData, setProductData] = useState({
    activeCount: 0,
    inactiveCount: 0
  })

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch('/admin/_actions/dashboard')
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        setProductData(data)
      } catch (error) {
        console.error('Error fetching product data:', error)
      }
    }

    fetchProductData()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  )
}

function DashboardCard({ title, subtitle, body }: {
  title: string
  subtitle: string
  body: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}

export default AdminDashboard
