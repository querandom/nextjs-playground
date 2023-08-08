import { GetServerSideProps } from 'next'

export interface UserIdPageProps {
  userId: string
}
export default function UserIdPage({ userId }: UserIdPageProps) {
  return <h1>{userId}</h1>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  const userId = params?.uid

  return {
    props: {
      userId: `user-id-${userId}`,
    },
  }
}
