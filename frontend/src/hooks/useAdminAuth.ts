import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

const ADMIN_SESSION_KEY = 'azad_admin_session';

export function useAdminAuth() {
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  const { data: isAdmin, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ['adminStatus'],
    queryFn: async () => {
      if (!actor) return false;
      // Check session storage first for quick response
      const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (!session) return false;
      // Verify with backend
      try {
        return await actor.isAdminLoggedIn();
      } catch {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      if (!actor) throw new Error('Actor not available');
      const success = await actor.adminLogin(username, password);
      if (!success) throw new Error('Invalid credentials');
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminStatus'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      await actor.adminLogout();
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminStatus'] });
      queryClient.removeQueries({ queryKey: ['inquiries'] });
      queryClient.removeQueries({ queryKey: ['blogPosts'] });
    },
  });

  return {
    isAdmin: !!isAdmin,
    isLoading: actorFetching || isCheckingAdmin,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error?.message,
  };
}
