const ProjectPage = ({ params }: any) => {
  return (
    <div>
      <h1>ProjectID Page</h1>
      <h2>Project ID: {JSON.stringify(params)}</h2>
    </div>
  )
}

export default ProjectPage
