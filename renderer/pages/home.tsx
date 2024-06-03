import React from 'react'
import Head from 'next/head'
import Pipeline from "../components/pipeline";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - SenPAQ Tally</title>
      </Head>
      <div className="h-full w-full flex items-center justify-center">
          <Pipeline></Pipeline>
      </div>
    </React.Fragment>
  )
}
