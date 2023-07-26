import ContainerPage from './container'
import Item from './item'

export default function DetailPage({ params, searchParams, children }: any) {
  return (
    <ContainerPage {...{ params, searchParams }}>
      <Item />
    </ContainerPage>
  )
}
