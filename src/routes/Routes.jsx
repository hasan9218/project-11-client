import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import { createBrowserRouter } from 'react-router'
import AddLesson from '../pages/Dashboard/User/AddLesson/AddLesson'
import MyLesson from '../pages/Dashboard/User/MyLesson/MyLesson'
import PrivateRoute from './PrivateRoute'
import Profile from '../pages/Dashboard/Profile/Profile'
import DashboardHome from '../pages/Dashboard/Common/DashboardHome'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers/ManageUsers'
import PublicLessons from '../pages/PublicLessons/PublicLessons'
import LessonDetails from '../pages/LessonDetails/LessonDetails'
import AuthorProfile from '../components/AuthorProfile/AuthorProfile'
import MyFavorites from '../pages/Dashboard/User/MyFavorites/MyFavorites'
import ReportedLessons from '../pages/Dashboard/Admin/ReportedLessons/ReportedLessons'
import Payment from '../pages/Payment/Payment'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import PaymentCancel from '../pages/Payment/PaymentCancel'
import ManageLessons from '../pages/Dashboard/Admin/ManageLessons/ManageLessons'
import UpdateLesson from '../pages/Dashboard/User/UpdateLesson/UpdateLesson'
import UpdateProfile from '../pages/Dashboard/Profile/UpdateProfile'
import AdminRoute from './AdminRoute'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/public-lessons',
        element:<PublicLessons />
      },
      {
        path: '/lesson-details/:id',
        element: <LessonDetails></LessonDetails>
      },
      {
        path:"/author-profile/:authorEmail",
        element: <AuthorProfile></AuthorProfile>
      },
      {
        path:"/payment",
        element: <Payment></Payment>
      },
      {
        path:"/payment-success",
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path:"/payment-cancel",
        element: <PaymentCancel></PaymentCancel>
      },
      {
        path:"/update-profile",
        element: <UpdateProfile></UpdateProfile>
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: 'add-lesson',
        element: (
          <PrivateRoute>
            <AddLesson></AddLesson>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-lessons',
        element: (
          <PrivateRoute>
            <MyLesson></MyLesson>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-favorites',
        element: (
          <PrivateRoute>
            <MyFavorites></MyFavorites>
          </PrivateRoute>
        ),
      },
      // admin routes
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-lessons',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageLessons></ManageLessons>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'reported-lessons',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ReportedLessons/>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      
    ],
  },
])
