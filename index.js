import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>HomeGuard Pro - AI-Powered Home Maintenance | Epic Tech AI</title>
        <meta name="description" content="Revolutionary AI-powered home maintenance ecosystem" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-800">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            HomeGuard Pro
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            AI-Powered Home Maintenance Ecosystem by Epic Tech AI
          </p>
          <button 
            onClick={() => window.open('https://buy.stripe.com/dR6dRZ5yc5yPaVq9AE')}
            className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full text-lg font-bold"
          >
            🚀 Subscribe Now
          </button>
        </div>
      </div>
    </>
  )
}
