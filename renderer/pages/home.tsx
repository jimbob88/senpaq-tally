import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Pipeline from "../components/pipeline";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - SenPAQ Tally</title>
      </Head>
      <div className="h-screen flex items-center justify-center">
          <Pipeline></Pipeline>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/next">Go to next page</Link>
      </div>
    </React.Fragment>
  )
}
