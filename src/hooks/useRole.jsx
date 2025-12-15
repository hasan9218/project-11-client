import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // get user's role
    const { data: userData = {}, isLoading:isRoleLoading } = useQuery({
    queryKey: ['role', user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get('/user/role');
      return res.data;
    },
    enabled: !loading && !!user?.email,
  });
    return { userData, isRoleLoading }
};

export default useRole;