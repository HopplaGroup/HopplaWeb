/* eslint-disable */
import type { Prisma, TripRequestRule } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateTripRequestRule(options?: Omit<(UseMutationOptions<(TripRequestRule | undefined), DefaultError, Prisma.TripRequestRuleCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TripRequestRuleCreateArgs, DefaultError, TripRequestRule, true>('TripRequestRule', 'POST', `${endpoint}/tripRequestRule/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TripRequestRuleCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.TripRequestRuleCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, TripRequestRule, Prisma.TripRequestRuleGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TripRequestRuleCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, TripRequestRule, Prisma.TripRequestRuleGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyTripRequestRule(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TripRequestRuleCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TripRequestRuleCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('TripRequestRule', 'POST', `${endpoint}/tripRequestRule/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TripRequestRuleCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TripRequestRuleCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TripRequestRuleCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyTripRequestRule<TArgs extends Prisma.TripRequestRuleFindManyArgs, TQueryFnData = Array<Prisma.TripRequestRuleGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/findMany`, args, options, fetch);
}

export function useInfiniteFindManyTripRequestRule<TArgs extends Prisma.TripRequestRuleFindManyArgs, TQueryFnData = Array<Prisma.TripRequestRuleGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/findMany`, args, options, fetch);
}

export function useSuspenseFindManyTripRequestRule<TArgs extends Prisma.TripRequestRuleFindManyArgs, TQueryFnData = Array<Prisma.TripRequestRuleGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyTripRequestRule<TArgs extends Prisma.TripRequestRuleFindManyArgs, TQueryFnData = Array<Prisma.TripRequestRuleGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/findMany`, args, options, fetch);
}

export function useFindUniqueTripRequestRule<TArgs extends Prisma.TripRequestRuleFindUniqueArgs, TQueryFnData = Prisma.TripRequestRuleGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueTripRequestRule<TArgs extends Prisma.TripRequestRuleFindUniqueArgs, TQueryFnData = Prisma.TripRequestRuleGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/findUnique`, args, options, fetch);
}

export function useFindFirstTripRequestRule<TArgs extends Prisma.TripRequestRuleFindFirstArgs, TQueryFnData = Prisma.TripRequestRuleGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstTripRequestRule<TArgs extends Prisma.TripRequestRuleFindFirstArgs, TQueryFnData = Prisma.TripRequestRuleGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/findFirst`, args, options, fetch);
}

export function useUpdateTripRequestRule(options?: Omit<(UseMutationOptions<(TripRequestRule | undefined), DefaultError, Prisma.TripRequestRuleUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TripRequestRuleUpdateArgs, DefaultError, TripRequestRule, true>('TripRequestRule', 'PUT', `${endpoint}/tripRequestRule/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TripRequestRuleUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.TripRequestRuleUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, TripRequestRule, Prisma.TripRequestRuleGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TripRequestRuleUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, TripRequestRule, Prisma.TripRequestRuleGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyTripRequestRule(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TripRequestRuleUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TripRequestRuleUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('TripRequestRule', 'PUT', `${endpoint}/tripRequestRule/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TripRequestRuleUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TripRequestRuleUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TripRequestRuleUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertTripRequestRule(options?: Omit<(UseMutationOptions<(TripRequestRule | undefined), DefaultError, Prisma.TripRequestRuleUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TripRequestRuleUpsertArgs, DefaultError, TripRequestRule, true>('TripRequestRule', 'POST', `${endpoint}/tripRequestRule/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TripRequestRuleUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.TripRequestRuleUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, TripRequestRule, Prisma.TripRequestRuleGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TripRequestRuleUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, TripRequestRule, Prisma.TripRequestRuleGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteTripRequestRule(options?: Omit<(UseMutationOptions<(TripRequestRule | undefined), DefaultError, Prisma.TripRequestRuleDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TripRequestRuleDeleteArgs, DefaultError, TripRequestRule, true>('TripRequestRule', 'DELETE', `${endpoint}/tripRequestRule/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TripRequestRuleDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.TripRequestRuleDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, TripRequestRule, Prisma.TripRequestRuleGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TripRequestRuleDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, TripRequestRule, Prisma.TripRequestRuleGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyTripRequestRule(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TripRequestRuleDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TripRequestRuleDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('TripRequestRule', 'DELETE', `${endpoint}/tripRequestRule/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TripRequestRuleDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TripRequestRuleDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TripRequestRuleDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateTripRequestRule<TArgs extends Prisma.TripRequestRuleAggregateArgs, TQueryFnData = Prisma.GetTripRequestRuleAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateTripRequestRule<TArgs extends Prisma.TripRequestRuleAggregateArgs, TQueryFnData = Prisma.GetTripRequestRuleAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/aggregate`, args, options, fetch);
}

export function useGroupByTripRequestRule<TArgs extends Prisma.TripRequestRuleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.TripRequestRuleGroupByArgs['orderBy'] } : { orderBy?: Prisma.TripRequestRuleGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.TripRequestRuleGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.TripRequestRuleGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.TripRequestRuleGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.TripRequestRuleGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.TripRequestRuleGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByTripRequestRule<TArgs extends Prisma.TripRequestRuleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.TripRequestRuleGroupByArgs['orderBy'] } : { orderBy?: Prisma.TripRequestRuleGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.TripRequestRuleGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.TripRequestRuleGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.TripRequestRuleGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.TripRequestRuleGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.TripRequestRuleGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/groupBy`, args, options, fetch);
}

export function useCountTripRequestRule<TArgs extends Prisma.TripRequestRuleCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.TripRequestRuleCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/count`, args, options, fetch);
}

export function useSuspenseCountTripRequestRule<TArgs extends Prisma.TripRequestRuleCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.TripRequestRuleCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TripRequestRuleCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TripRequestRule', `${endpoint}/tripRequestRule/count`, args, options, fetch);
}

export function useCheckTripRequestRule<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; ruleId?: string; rideRequestId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('TripRequestRule', `${endpoint}/tripRequestRule/check`, args, options, fetch);
}
