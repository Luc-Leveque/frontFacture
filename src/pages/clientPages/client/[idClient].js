import { useRouter } from 'next/router'

const Client = () => {
  const router = useRouter()
  const { idClient } = router.query

  return <p>Post: {idClient}</p>
}

export default Client
