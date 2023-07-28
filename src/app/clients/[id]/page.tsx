'use client'

import { useRouter } from 'next/navigation'

const ClientsDetailPage = ({ params }: any) => {
  const router = useRouter()
  function onClickHandler() {
    router.push(`/clients/${params.id}/projectA`)
  }
  return (
    <div>
      <h1>Client Detail page</h1>
      <h2>Client ID: {params.id}</h2>

      <button onClick={onClickHandler}>Load Project A</button>
    </div>
  )
}

export default ClientsDetailPage
