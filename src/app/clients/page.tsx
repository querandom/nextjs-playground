import Link from 'next/link'

const clients = [
  { id: 'rodri', name: 'Rodrigo' },
  { id: 'samu', name: 'Samuel' },
]

const ClientsPage = () => {
  return (
    <div>
      <h1>Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClientsPage
