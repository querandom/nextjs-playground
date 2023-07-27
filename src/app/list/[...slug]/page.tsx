import ContainerPage from './container'
import ClientItem from './item'

export default function DetailPage({ params, searchParams, children }: any) {
  return (
    <ContainerPage>
      <div>This is a catch all params page.</div>
      <ClientItem />
      ID: {JSON.stringify(params)}
    </ContainerPage>
  )
}
