import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useAuth from './useAuth'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${user.accessToken}`
          return config
        }
      )

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        res => res,
        err => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logOut()
              .then(() => {
                console.log('Logged out successfully.')
              })
              .catch(console.error)
            navigate('/login')
          }
          return Promise.reject(err)
        }
      )

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor)
        axiosInstance.interceptors.response.eject(responseInterceptor)
      }
    }
  }, [user, loading, logOut, navigate])

  return axiosInstance
}
export default useAxiosSecure











// Bearer Token: eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4MTFiMDdmMjhiODQxZjRiNDllNDgyNTg1ZmQ2NmQ1NWUzOGRiNWQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiaGVsbG8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9pLmliYi5jby9HNFZROEZIZC93LnBuZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS93aXNkb21jZWxsLWF1dGgiLCJhdWQiOiJ3aXNkb21jZWxsLWF1dGgiLCJhdXRoX3RpbWUiOjE3NjYyMjc1MzQsInVzZXJfaWQiOiJleG9ud1NuTE5uVVp4cVhqaGNBa3BjZU1DaHAyIiwic3ViIjoiZXhvbndTbkxOblVaeHFYamhjQWtwY2VNQ2hwMiIsImlhdCI6MTc2NjI4ODczMiwiZXhwIjoxNzY2MjkyMzMyLCJlbWFpbCI6Im5ld0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmV3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.U38vN2muNCtJxd_KwCTj1t2sei9vmTXQSjef0uDd48WFEAMfRgM7TihrYJmtCz3dyvSjbh5RBTOYf3S9S5qu_oQ1Cyg8X-jOMFZlfqK21bkNaRze0CK8HJlK1WIMk1ewMpjMDE4c9rTIcnBbLfYSRdz1mU5gqNti1ds82xYAaqd4im7uRrA-3GhAWSB4Vt5-sqWHPvBJUHYzaAL5uxi6aCj1mAE0AHxKxOuZEqzgcHtGk5joyGSP8g9SNlULGL4Ap41S2hi71uhZ8Y25AxHO2szfBa3L7huPCDAiii5xUYCiuleMpQwFXNbgGwPdDaxIwAS2PaTRw2DrDUgq_M_Msw
