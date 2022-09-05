/**
 * Atom types module
 *
 * This modules defines all the Atom types.
 * Here are defined only the essential Atoms. Uranio CLI will replace this file
 * with the full list of essential and user-defined atoms.
 *
 * An `Atom` type is composed by:
 * - `atom_hard_properties`: the common properties that are generated when
 *      saved to the db: _id, _date
 * - `atom_common_properties`: the common properties for each Atom
 * - and the properties defined by the developer.
 *
 * An `AtomShape` is an `Atom` without the `atom_hard_properties`.
 *
 * A `Molecule` is an `Atom` with all its Atom-type-properties populated with
 * other Atoms.
 *
 * @packageDocumentation
 */
import { AtomHardProperties, AtomCommonProperties } from './common';
export declare type Depth = undefined | 0 | 1 | 2 | 3;
declare type PrimitiveShape<A extends AtomName> = Omit<AtomShape<A>, BondProperties<A>>;
declare type BondPrimitiveShape<A extends AtomName> = BondProperties<A> extends keyof AtomShape<A> ? Pick<AtomShape<A>, BondProperties<A>> : never;
declare type AtomPrimitiveShape<A extends AtomName> = PrimitiveShape<A>;
declare type BondShape<A extends AtomName, D extends Depth> = D extends (0 | undefined) ? BondPrimitiveShape<A> : D extends 1 ? BondShapeDepth1<A> : D extends 2 ? BondShapeDepth2<A> : D extends 3 ? BondShapeDepth3<A> : D extends 4 ? BondShapeDepth4<A> : never;
export declare type Molecule<A extends AtomName, D extends Depth = 0> = D extends (0 | undefined) ? Atom<A> : AtomHardProperties & AtomCommonProperties & AtomPrimitiveShape<A> & BondShape<A, D>;
export declare type AuthAtom<A extends AuthName> = Atom<A>;
export declare type AuthAtomShape<A extends AuthName> = AtomShape<A>;
/** --uranio-generate-start */
export declare type AtomName = '_superuser' | '_user' | '_group' | '_media';
export declare type AuthName = '_superuser' | '_user';
export declare type LogName = never;
declare type SuperuserShape = AtomCommonProperties & {
    email: string;
    password: string;
    groups: string[];
    favicon?: string;
};
declare type UserShape = AtomCommonProperties & {
    email: string;
    password: string;
    groups: string[];
};
declare type GroupShape = AtomCommonProperties & {
    name: string;
};
declare type MediaShape = AtomCommonProperties & {
    src: string;
    filename: string;
    type: string;
    size: number;
};
declare type BondProperties<A extends AtomName> = A extends '_superuser' ? 'groups' | 'favicon' : A extends '_user' ? 'groups' : A extends '_group' ? never : A extends '_media' ? never : never;
declare type BondShapeDepth1<A extends AtomName> = A extends '_superuser' ? {
    groups: Atom<'_group'>[];
    favicon?: Atom<'_media'>;
} : A extends '_user' ? {
    groups: Atom<'_group'>[];
} : A extends '_group' ? never : A extends '_media' ? never : never;
declare type BondShapeDepth2<A extends AtomName> = A extends '_superuser' ? {
    groups: Molecule<'_group', 1>[];
    favicon?: Molecule<'_media', 1>;
} : A extends '_user' ? {
    groups: Molecule<'_group', 1>[];
} : A extends '_group' ? never : A extends '_media' ? never : never;
declare type BondShapeDepth3<A extends AtomName> = A extends '_superuser' ? {
    groups: Molecule<'_group', 2>[];
    favicon?: Molecule<'_media', 2>;
} : A extends '_user' ? {
    groups: Molecule<'_group', 2>[];
} : A extends '_group' ? never : A extends '_media' ? never : never;
declare type BondShapeDepth4<A extends AtomName> = A extends '_superuser' ? {
    groups: Molecule<'_group', 3>[];
    favicon?: Molecule<'_media', 3>;
} : A extends '_user' ? {
    groups: Molecule<'_group', 3>[];
} : A extends '_group' ? never : A extends '_media' ? never : never;
declare type Superuser = AtomHardProperties & SuperuserShape;
declare type User = AtomHardProperties & UserShape;
declare type Group = AtomHardProperties & GroupShape;
declare type Media = AtomHardProperties & MediaShape;
export declare type AtomShape<A extends AtomName> = A extends '_superuser' ? SuperuserShape : A extends '_user' ? UserShape : A extends '_group' ? GroupShape : A extends '_media' ? MediaShape : never;
export declare type Atom<A extends AtomName> = A extends '_superuser' ? Superuser : A extends '_user' ? User : A extends '_group' ? Group : A extends '_media' ? Media : never;
export declare type RouteCustomName<A extends AtomName> = A extends '_superuser' ? never : A extends '_user' ? never : A extends '_group' ? never : A extends '_media' ? never : A extends '_request' ? never : A extends '_error' ? never : never;
declare type RouteDefaultName = 'count' | 'find_one' | 'find' | 'find_id' | 'insert' | 'update' | 'delete' | 'insert_multiple' | 'update_multiple' | 'delete_multiple' | 'search_count' | 'search';
export declare type RouteName<A extends AtomName> = RouteCustomName<A> | RouteDefaultName;
export declare type RouteQueryParam<A extends AtomName, R extends RouteName<A>> = A extends '_superuser' ? R extends 'count' ? 'filter' : R extends 'find_one' ? 'filter' | 'options' : R extends 'find' ? 'filter' | 'options' : R extends 'find_id' ? 'options' : R extends 'insert' ? never : R extends 'update' ? 'options' : R extends 'delete' ? never : R extends 'insert_multiple' ? never : R extends 'update_multiple' ? never : R extends 'delete_multiple' ? never : R extends 'search_count' ? never : R extends 'search' ? 'options' : never : never;
export declare type RouteURL<A extends AtomName, R extends RouteName<A>> = A extends '_superuser' ? R extends 'count' ? '/count' : R extends 'find_one' ? '/first' : R extends 'find' ? '/' : R extends 'find_id' ? '/:id' : R extends 'insert' ? '/' : R extends 'update' ? '/:id' : R extends 'delete' ? '/:id' : R extends 'insert_multiple' ? '/multiple' : R extends 'update_multiple' ? '/multiple/:ids' : R extends 'delete_multiple' ? '/multiple/:ids' : R extends 'search_count' ? '/search/count/:q' : R extends 'search' ? '/search/:q' : never : never;
export declare type CallResponse<A extends AtomName, R extends RouteName<A>, D extends Depth = 0> = A extends '_superuser' ? R extends 'count' ? number : R extends 'find_one' ? Molecule<A, D> : R extends 'find' ? Molecule<A, D>[] : R extends 'find_id' ? Molecule<A, D> : R extends 'insert' ? Molecule<A, D> : R extends 'update' ? Molecule<A, D> : R extends 'delete' ? Molecule<A, D> : R extends 'insert_multiple' ? Molecule<A, D>[] : R extends 'update_multiple' ? Molecule<A, D>[] : R extends 'delete_multiple' ? Molecule<A, D>[] : R extends 'search_count' ? number : R extends 'search' ? Molecule<A, D>[] : never : never;
import { urn_response } from 'uranio-utils';
export declare type ApiResponse<A extends AtomName, R extends RouteName<A>, D extends Depth = 0> = urn_response.General<CallResponse<A, R, D>>;
export {}; /** --uranio-generate-end */
/** --uranio-generate-end */
