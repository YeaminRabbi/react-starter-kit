import React from "react";
import { useGetHomeQuery } from "../features/api/apiSlice";

export default function Home() {

    const { data: blogs, isLoading, isError, error } = useGetHomeQuery(); // Fetch homapge content from API
    
    if (isLoading) {
        return (
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full animate-spin border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading Page...</p>
            </div>
        </div>
        );
    }
    
    
    if (isError) {
        return (
        <section className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <p className="text-xl font-semibold text-red-500">
                Error fetching content: {error?.message}
            </p>
        </section>
        );
    }

    return (
        <>
          <section>
            <div>
                hompage
            </div>
          </section>
        </>
    );
}
