/* eslint-disable */
import type { Prisma, PassengerTripRequest } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreatePassengerTripRequest(options?: Omit<(UseMutationOptions<(PassengerTripRequest | undefined), DefaultError, Prisma.PassengerTripRequestCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.PassengerTripRequestCreateArgs, DefaultError, PassengerTripRequest, true>('PassengerTripRequest', 'POST', `${endpoint}/passengerTripRequest/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.PassengerTripRequestCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.PassengerTripRequestCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, PassengerTripRequest, Prisma.PassengerTripRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.PassengerTripRequestCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, PassengerTripRequest, Prisma.PassengerTripRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyPassengerTripRequest(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.PassengerTripRequestCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.PassengerTripRequestCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('PassengerTripRequest', 'POST', `${endpoint}/passengerTripRequest/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.PassengerTripRequestCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.PassengerTripRequestCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.PassengerTripRequestCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyPassengerTripRequest<TArgs extends Prisma.PassengerTripRequestFindManyArgs, TQueryFnData = Array<Prisma.PassengerTripRequestGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/findMany`, args, options, fetch);
}

export function useInfiniteFindManyPassengerTripRequest<TArgs extends Prisma.PassengerTripRequestFindManyArgs, TQueryFnData = Array<Prisma.PassengerTripRequestGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/findMany`, args, options, fetch);
}

export function useSuspenseFindManyPassengerTripRequest<TArgs extends Prisma.PassengerTripRequestFindManyArgs, TQueryFnData = Array<Prisma.PassengerTripRequestGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyPassengerTripRequest<TArgs extends Prisma.PassengerTripRequestFindManyArgs, TQueryFnData = Array<Prisma.PassengerTripRequestGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/findMany`, args, options, fetch);
}

export function useFindUniquePassengerTripRequest<TArgs extends Prisma.PassengerTripRequestFindUniqueArgs, TQueryFnData = Prisma.PassengerTripRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniquePassengerTripRequest<TArgs extends Prisma.PassengerTripRequestFindUniqueArgs, TQueryFnData = Prisma.PassengerTripRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/findUnique`, args, options, fetch);
}

export function useFindFirstPassengerTripRequest<TArgs extends Prisma.PassengerTripRequestFindFirstArgs, TQueryFnData = Prisma.PassengerTripRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstPassengerTripRequest<TArgs extends Prisma.PassengerTripRequestFindFirstArgs, TQueryFnData = Prisma.PassengerTripRequestGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/findFirst`, args, options, fetch);
}

export function useUpdatePassengerTripRequest(options?: Omit<(UseMutationOptions<(PassengerTripRequest | undefined), DefaultError, Prisma.PassengerTripRequestUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.PassengerTripRequestUpdateArgs, DefaultError, PassengerTripRequest, true>('PassengerTripRequest', 'PUT', `${endpoint}/passengerTripRequest/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.PassengerTripRequestUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.PassengerTripRequestUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, PassengerTripRequest, Prisma.PassengerTripRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.PassengerTripRequestUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, PassengerTripRequest, Prisma.PassengerTripRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyPassengerTripRequest(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.PassengerTripRequestUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.PassengerTripRequestUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('PassengerTripRequest', 'PUT', `${endpoint}/passengerTripRequest/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.PassengerTripRequestUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.PassengerTripRequestUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.PassengerTripRequestUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertPassengerTripRequest(options?: Omit<(UseMutationOptions<(PassengerTripRequest | undefined), DefaultError, Prisma.PassengerTripRequestUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.PassengerTripRequestUpsertArgs, DefaultError, PassengerTripRequest, true>('PassengerTripRequest', 'POST', `${endpoint}/passengerTripRequest/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.PassengerTripRequestUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.PassengerTripRequestUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, PassengerTripRequest, Prisma.PassengerTripRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.PassengerTripRequestUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, PassengerTripRequest, Prisma.PassengerTripRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeletePassengerTripRequest(options?: Omit<(UseMutationOptions<(PassengerTripRequest | undefined), DefaultError, Prisma.PassengerTripRequestDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.PassengerTripRequestDeleteArgs, DefaultError, PassengerTripRequest, true>('PassengerTripRequest', 'DELETE', `${endpoint}/passengerTripRequest/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.PassengerTripRequestDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.PassengerTripRequestDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, PassengerTripRequest, Prisma.PassengerTripRequestGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.PassengerTripRequestDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, PassengerTripRequest, Prisma.PassengerTripRequestGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyPassengerTripRequest(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.PassengerTripRequestDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.PassengerTripRequestDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('PassengerTripRequest', 'DELETE', `${endpoint}/passengerTripRequest/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.PassengerTripRequestDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.PassengerTripRequestDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.PassengerTripRequestDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregatePassengerTripRequest<TArgs extends Prisma.PassengerTripRequestAggregateArgs, TQueryFnData = Prisma.GetPassengerTripRequestAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/aggregate`, args, options, fetch);
}

export function useSuspenseAggregatePassengerTripRequest<TArgs extends Prisma.PassengerTripRequestAggregateArgs, TQueryFnData = Prisma.GetPassengerTripRequestAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/aggregate`, args, options, fetch);
}

export function useGroupByPassengerTripRequest<TArgs extends Prisma.PassengerTripRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.PassengerTripRequestGroupByArgs['orderBy'] } : { orderBy?: Prisma.PassengerTripRequestGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.PassengerTripRequestGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.PassengerTripRequestGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.PassengerTripRequestGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.PassengerTripRequestGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.PassengerTripRequestGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByPassengerTripRequest<TArgs extends Prisma.PassengerTripRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.PassengerTripRequestGroupByArgs['orderBy'] } : { orderBy?: Prisma.PassengerTripRequestGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.PassengerTripRequestGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.PassengerTripRequestGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.PassengerTripRequestGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.PassengerTripRequestGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.PassengerTripRequestGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/groupBy`, args, options, fetch);
}

export function useCountPassengerTripRequest<TArgs extends Prisma.PassengerTripRequestCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.PassengerTripRequestCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/count`, args, options, fetch);
}

export function useSuspenseCountPassengerTripRequest<TArgs extends Prisma.PassengerTripRequestCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.PassengerTripRequestCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.PassengerTripRequestCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/count`, args, options, fetch);
}
import type { TripRequestStatus } from '@zenstackhq/runtime/models';

export function useCheckPassengerTripRequest<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; from?: string; to?: string; seats?: number; status?: TripRequestStatus; description?: string; authorId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('PassengerTripRequest', `${endpoint}/passengerTripRequest/check`, args, options, fetch);
}
