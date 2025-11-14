import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SymptomsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-6" />

          {/* Emergency Alert Skeleton */}
          <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg">
            <Skeleton className="h-4 w-4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* AI Chat Button Skeleton */}
          <Skeleton className="h-12 w-64 mb-6" />
        </div>

        {/* Search Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Symptoms Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-9 w-9 rounded-lg" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <div className="flex flex-wrap gap-1">
                      <Skeleton className="h-5 w-20 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Medical Disclaimer Skeleton */}
        <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
          <Skeleton className="h-4 w-4 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
      </div>
    </div>
  )
}
