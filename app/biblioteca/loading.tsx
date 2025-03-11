export default function BibliotecaLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2" />
        <div className="h-4 w-96 bg-gray-200 rounded-lg dark:bg-gray-700" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-6">
            <div className="h-6 w-32 bg-gray-200 rounded-lg dark:bg-gray-700 mb-4" />
            <div className="h-10 w-16 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2" />
            <div className="h-4 w-24 bg-gray-200 rounded-lg dark:bg-gray-700" />
          </div>
        ))}
      </div>

      {/* Prompts list skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-3 flex-1">
                <div className="h-6 w-3/4 bg-gray-200 rounded-lg dark:bg-gray-700" />
                <div className="h-4 w-1/2 bg-gray-200 rounded-lg dark:bg-gray-700" />
              </div>
              <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-gray-200 rounded-full dark:bg-gray-700" />
              <div className="h-6 w-20 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
