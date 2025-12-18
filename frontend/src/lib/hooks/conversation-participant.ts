/* eslint-disable */
import type { Prisma, ConversationParticipant } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateConversationParticipant(options?: Omit<(UseMutationOptions<(ConversationParticipant | undefined), DefaultError, Prisma.ConversationParticipantCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ConversationParticipantCreateArgs, DefaultError, ConversationParticipant, true>('ConversationParticipant', 'POST', `${endpoint}/conversationParticipant/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ConversationParticipantCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.ConversationParticipantCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ConversationParticipant, Prisma.ConversationParticipantGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ConversationParticipantCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ConversationParticipant, Prisma.ConversationParticipantGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyConversationParticipant(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ConversationParticipantCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ConversationParticipantCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('ConversationParticipant', 'POST', `${endpoint}/conversationParticipant/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ConversationParticipantCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ConversationParticipantCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ConversationParticipantCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyConversationParticipant<TArgs extends Prisma.ConversationParticipantFindManyArgs, TQueryFnData = Array<Prisma.ConversationParticipantGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/findMany`, args, options, fetch);
}

export function useInfiniteFindManyConversationParticipant<TArgs extends Prisma.ConversationParticipantFindManyArgs, TQueryFnData = Array<Prisma.ConversationParticipantGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/findMany`, args, options, fetch);
}

export function useSuspenseFindManyConversationParticipant<TArgs extends Prisma.ConversationParticipantFindManyArgs, TQueryFnData = Array<Prisma.ConversationParticipantGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyConversationParticipant<TArgs extends Prisma.ConversationParticipantFindManyArgs, TQueryFnData = Array<Prisma.ConversationParticipantGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/findMany`, args, options, fetch);
}

export function useFindUniqueConversationParticipant<TArgs extends Prisma.ConversationParticipantFindUniqueArgs, TQueryFnData = Prisma.ConversationParticipantGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueConversationParticipant<TArgs extends Prisma.ConversationParticipantFindUniqueArgs, TQueryFnData = Prisma.ConversationParticipantGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/findUnique`, args, options, fetch);
}

export function useFindFirstConversationParticipant<TArgs extends Prisma.ConversationParticipantFindFirstArgs, TQueryFnData = Prisma.ConversationParticipantGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstConversationParticipant<TArgs extends Prisma.ConversationParticipantFindFirstArgs, TQueryFnData = Prisma.ConversationParticipantGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/findFirst`, args, options, fetch);
}

export function useUpdateConversationParticipant(options?: Omit<(UseMutationOptions<(ConversationParticipant | undefined), DefaultError, Prisma.ConversationParticipantUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ConversationParticipantUpdateArgs, DefaultError, ConversationParticipant, true>('ConversationParticipant', 'PUT', `${endpoint}/conversationParticipant/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ConversationParticipantUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.ConversationParticipantUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ConversationParticipant, Prisma.ConversationParticipantGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ConversationParticipantUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ConversationParticipant, Prisma.ConversationParticipantGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyConversationParticipant(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ConversationParticipantUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ConversationParticipantUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('ConversationParticipant', 'PUT', `${endpoint}/conversationParticipant/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ConversationParticipantUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ConversationParticipantUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ConversationParticipantUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertConversationParticipant(options?: Omit<(UseMutationOptions<(ConversationParticipant | undefined), DefaultError, Prisma.ConversationParticipantUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ConversationParticipantUpsertArgs, DefaultError, ConversationParticipant, true>('ConversationParticipant', 'POST', `${endpoint}/conversationParticipant/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ConversationParticipantUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.ConversationParticipantUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ConversationParticipant, Prisma.ConversationParticipantGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ConversationParticipantUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ConversationParticipant, Prisma.ConversationParticipantGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteConversationParticipant(options?: Omit<(UseMutationOptions<(ConversationParticipant | undefined), DefaultError, Prisma.ConversationParticipantDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ConversationParticipantDeleteArgs, DefaultError, ConversationParticipant, true>('ConversationParticipant', 'DELETE', `${endpoint}/conversationParticipant/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ConversationParticipantDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.ConversationParticipantDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ConversationParticipant, Prisma.ConversationParticipantGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ConversationParticipantDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ConversationParticipant, Prisma.ConversationParticipantGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyConversationParticipant(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ConversationParticipantDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ConversationParticipantDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('ConversationParticipant', 'DELETE', `${endpoint}/conversationParticipant/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ConversationParticipantDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ConversationParticipantDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ConversationParticipantDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateConversationParticipant<TArgs extends Prisma.ConversationParticipantAggregateArgs, TQueryFnData = Prisma.GetConversationParticipantAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateConversationParticipant<TArgs extends Prisma.ConversationParticipantAggregateArgs, TQueryFnData = Prisma.GetConversationParticipantAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/aggregate`, args, options, fetch);
}

export function useGroupByConversationParticipant<TArgs extends Prisma.ConversationParticipantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.ConversationParticipantGroupByArgs['orderBy'] } : { orderBy?: Prisma.ConversationParticipantGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.ConversationParticipantGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.ConversationParticipantGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.ConversationParticipantGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.ConversationParticipantGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.ConversationParticipantGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByConversationParticipant<TArgs extends Prisma.ConversationParticipantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.ConversationParticipantGroupByArgs['orderBy'] } : { orderBy?: Prisma.ConversationParticipantGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.ConversationParticipantGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.ConversationParticipantGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.ConversationParticipantGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.ConversationParticipantGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.ConversationParticipantGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/groupBy`, args, options, fetch);
}

export function useCountConversationParticipant<TArgs extends Prisma.ConversationParticipantCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.ConversationParticipantCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/count`, args, options, fetch);
}

export function useSuspenseCountConversationParticipant<TArgs extends Prisma.ConversationParticipantCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.ConversationParticipantCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ConversationParticipantCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/count`, args, options, fetch);
}

export function useCheckConversationParticipant<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; userId?: string; conversationId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('ConversationParticipant', `${endpoint}/conversationParticipant/check`, args, options, fetch);
}
