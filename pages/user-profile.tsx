import { GetServerSideProps } from 'next'

export interface UserProfile {
  username: string
}

export default function UserProfilePage(props: UserProfile) {
  return <h1>{props.username}</h1>
}

export const getServerSideProps: GetServerSideProps<UserProfile> = async () => {
  return {
    props: {
      username: 'Pablo',
    },
  }
}
