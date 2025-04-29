import { FileText } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const NoSummaries = () => {
  return (
    <div className='flex justify-center h-full flex-col mx-auto mt-10'>
      <FileText className='w-20 h-20 text-gray-500 self-center mb-4' />
      <div className='flex flex-col gap-2 items-center justify-center'>
        <h2 className='text-lg font-semibold text-gray-700'>No Summaries yet</h2>
        <p className='text-gray-500'>Upload your first PDF to get started with AI-powered summaries.</p>
        <Button className='bg-linear-to-r from-rose-500 to-rose-700 text-white hover:from-rose-800 hover:to-rose-500'>
          <Link href='/upload'>Create Your First Summary</Link>
        </Button>
      </div>
    </div>
  )
}

export default NoSummaries
