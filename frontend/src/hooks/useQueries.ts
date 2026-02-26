import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BlogPost, Service, Inquiry } from '../backend';

// ── Inquiry Hooks ────────────────────────────────────────────────────────────

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      company: string;
      country: string;
      riceVariety: string;
      quantityMT: number;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitInquiry(
        data.name,
        data.company,
        data.country,
        data.riceVariety,
        data.quantityMT,
        data.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

export function useGetInquiries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Inquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInquiries();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAllInquiries() {
  return useGetInquiries();
}

export function useDeleteInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteInquiry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

export function useClearInquiries() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.clearInquiries();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

// ── Blog Post Hooks ──────────────────────────────────────────────────────────

export function useGetBlogPosts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBlogPosts();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetBlogPost(id: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<BlogPost | null>({
    queryKey: ['blogPost', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getBlogPost(id);
    },
    enabled: !!actor && !actorFetching && id !== null,
  });
}

export function useCreateBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      imageDescription: string;
      publishedDate: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createBlogPost(data.title, data.content, data.imageDescription, data.publishedDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
}

export function useEditBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      content: string;
      imageDescription: string;
      publishedDate: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.editBlogPost(data.id, data.title, data.content, data.imageDescription, data.publishedDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPost'] });
    },
  });
}

export function useDeleteBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
}

// ── Service Hooks ────────────────────────────────────────────────────────────

export function useGetServices() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetService(id: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Service | null>({
    queryKey: ['service', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getService(id);
    },
    enabled: !!actor && !actorFetching && id !== null,
  });
}

export function useEditService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      description: string;
      details: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.editService(data.id, data.name, data.description, data.details);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service'] });
    },
  });
}

// ── Admin Auth Hooks ─────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdminLoggedIn();
    },
    enabled: !!actor && !actorFetching,
  });
}
