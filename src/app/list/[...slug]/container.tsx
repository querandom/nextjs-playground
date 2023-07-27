export default function ContainerPage({ children }: React.PropsWithChildren) {
  return (
    <div>
      <h1>This is a container component rendered on the server</h1>
      <div>{children}</div>
    </div>
  )
}
