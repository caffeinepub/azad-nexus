import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

const ADMIN_ACCESS_KEY = 'adminAccessKey';

function getStoredAccessKey(): string {
  return sessionStorage.getItem(ADMIN_ACCESS_KEY) ?? '';
}

// ── Submit Inquiry (open to all, no auth required) ────────────────────────────
export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      company: string;
      country: string;
      quantityMT: string;
      riceCategory: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitInquiry(
        data.name,
        data.company,
        data.country,
        data.quantityMT,
        data.riceCategory,
        data.email,
        data.phone,
        data.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

// ── Validate Admin (calls backend validateAdmin with username/password) ────────
export function useValidateAdmin() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (credentials: { user: string; pass: string }): Promise<string | null> => {
      if (!actor) throw new Error('Actor not available');
      return actor.validateAdmin(credentials.user, credentials.pass);
    },
  });
}

// ── Get Inquiries (admin-only, requires valid access key) ─────────────────────
export function useGetInquiries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const key = getStoredAccessKey();
      if (!key) throw new Error('Unauthorized: No admin access key');
      const result = await actor.getInquiries(key);
      return result;
    },
    enabled: !!actor && !actorFetching,
    staleTime: 0,
    refetchOnMount: true,
    retry: false,
  });
}

// ── Mark Resolved ─────────────────────────────────────────────────────────────
export function useMarkResolved() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      const key = getStoredAccessKey();
      if (!key) throw new Error('Unauthorized: No admin access key');
      return actor.markResolved(key, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

// ── Delete Inquiry ────────────────────────────────────────────────────────────
export function useDeleteInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      const key = getStoredAccessKey();
      if (!key) throw new Error('Unauthorized: No admin access key');
      return actor.deleteInquiry(key, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

// ── Is Caller Admin (kept for compatibility) ──────────────────────────────────
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    staleTime: 0,
    retry: false,
  });
}
