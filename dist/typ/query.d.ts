/**
 * Query type module
 *
 * @packageDocumentation
 */
import { AtomHardProperties, AtomCommonProperties } from './common';
import * as atoms from './atom';
export declare type Query<A extends atoms.AtomName> = Query.Expression<A> | Query.Logical<A>;
export declare namespace Query {
    type QueryAtomKey<A extends atoms.AtomName> = keyof AtomHardProperties | keyof AtomCommonProperties | keyof atoms.Atom<A>;
    type QueryAtomRealType<A extends atoms.AtomName, P extends QueryAtomKey<A>> = P extends keyof AtomHardProperties ? AtomHardProperties[P] : P extends keyof AtomCommonProperties ? AtomCommonProperties[P] : P extends keyof atoms.Atom<A> ? atoms.Atom<A>[P] : never;
    export type Equal<A extends atoms.AtomName> = {
        [P in QueryAtomKey<A>]?: QueryAtomRealType<A, P>;
    };
    type Comparsion<T> = {
        $eq?: T;
    } | {
        $gt?: T;
    } | {
        $gte?: T;
    } | {
        $in?: T[];
    } | {
        $lt?: T;
    } | {
        $lte?: T;
    } | {
        $ne?: T;
    } | {
        $nin?: T[];
    } | {
        $exists: boolean;
    };
    type WithComparsion<A extends atoms.AtomName> = {
        [P in QueryAtomKey<A>]?: Comparsion<QueryAtomRealType<A, P>>;
    };
    export type Expression<A extends atoms.AtomName> = Equal<A> | WithComparsion<A>;
    export type Logical<A extends atoms.AtomName> = {
        $and?: (Expression<A> | Logical<A>)[];
    } | {
        $not?: Expression<A> | Logical<A>;
    } | {
        $nor?: (Expression<A> | Logical<A>)[];
    } | {
        $or?: (Expression<A> | Logical<A>)[];
    };
    export type Options<A extends atoms.AtomName, D extends atoms.Depth = 0> = {
        depth?: D;
        sort?: string | Equal<A>;
        limit?: number;
        skip?: number;
        depth_query?: Query<A>;
    };
    export {};
}
