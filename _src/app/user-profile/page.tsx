export interface UserProfile {
  username: string
}

function UserProfilePage() {
  return <h1>{'props.username || ' + 'Pablo'}</h1>
}

// export const getServerSideProps: GetServerSideProps<UserProfile> = async () => {
//   return {
//     props: {
//       username: 'Pablo',
//     },
//   }
// }
export default UserProfilePage
