import { Navigate} from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const AdminRoute = ({ children }) => {
    const {userData,isRoleLoading}=useRole();

  if (isRoleLoading) return <LoadingSpinner />
  if (userData?.role==="admin") return children
  return <Navigate to='/' replace='true' />
}

export default AdminRoute