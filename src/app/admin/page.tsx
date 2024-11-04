'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatNumber } from "@/lib/formatters"

function AdminDashboard() {
  const [productData, setProductData] = useState({
    activeCount: 0,
    inactiveCount: 0
  })

  useEffect(() => {
    const fetchData = () => {
      fetch('/admin/_actions/dashboard')
        .then(response => response.json())
        .then(data => setProductData(data))
        .catch(error => console.error('Error:', error))
    }

    fetchData()
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
