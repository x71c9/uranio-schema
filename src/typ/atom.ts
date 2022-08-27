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

import {AtomHardProperties, AtomCommonProperties} from './common';


export type Depth = undefined | 0 | 1 | 2 | 3;


type PrimitiveShape<A extends AtomName> =
	Omit<AtomShape<A>, BondProperties<A>>

type BondPrimitiveShape<A extends AtomName> =
	BondProperties<A> extends keyof AtomShape<A> ?
	Pick<AtomShape<A>, BondProperties<A>> :
	never

type AtomPrimitiveShape<A extends AtomName> =
	PrimitiveShape<A>

type BondShape<A extends AtomName, D extends Depth> =
	D extends (0 | undefined) ? BondPrimitiveShape<A> :
	D extends 1 ? BondShapeDepth1<A> :
	D extends 2 ? BondShapeDepth2<A> :
	D extends 3 ? BondShapeDepth3<A> :
	D extends 4 ? BondShapeDepth4<A> :
	never

export type Molecule<A extends AtomName, D extends Depth = 0> =
	D extends (0 | undefined) ? Atom<A> :
	AtomHardProperties &
	AtomCommonProperties &
	AtomPrimitiveShape<A> &
	BondShape<A,D>

export type AuthAtom<A extends AuthName> =
	Atom<A>

export type AuthAtomShape<A extends AuthName> =
	AtomShape<A>

/** --uranio-generate-start */

export type AtomName = '_superuser' | '_group' | '_user' | '_media' | '_error' | '_request' | '_setting'

export type AuthName = '_superuser' | '_user'

export type LogName = '_error' | '_request'

type _superuserShape = AtomCommonProperties & {
	email: string
	password: string
	groups?: string[]
}

type _groupShape = AtomCommonProperties & {
	name: string
}

type _userShape = AtomCommonProperties & {
	email: string
	password: string
	groups?: string[]
}

type _mediaShape = AtomCommonProperties & {
	src: string
	filename: string
	type: string
	size: number
	width?: number
	height?: number
}

type _errorShape = AtomCommonProperties & {
	status: number
	msg: string
	error_code: string
	error_msg: string
	request?: string
	stack?: string
}

type _requestShape = AtomCommonProperties & {
	full_path: string
	route_path?: string
	atom_path?: string
	connection_path?: string
	method?: string
	atom_name?: string
	route_name?: string
	params?: string
	query?: string
	headers?: string
	body?: string
	file?: string
	ip?: string
	is_auth?: boolean
	auth_action?: string
}

type _settingShape = AtomCommonProperties & {
	name: string
	value?: string
	filter?: string
}

type BondProperties<A extends AtomName> =
	A extends '_superuser' ? 'groups' :
	A extends '_group' ? never :
	A extends '_user' ? 'groups' :
	A extends '_media' ? never :
	A extends '_error' ? 'request' :
	A extends '_request' ? never :
	A extends '_setting' ? never :
	never

type BondShapeDepth1<A extends AtomName> =
	A extends '_superuser' ? {groups?: Atom<'_group'>[]} :
	A extends '_group' ? Record<never, unknown> :
	A extends '_user' ? {groups?: Atom<'_group'>[]} :
	A extends '_media' ? Record<never, unknown> :
	A extends '_error' ? {request?: Atom<'_request'>} :
	A extends '_request' ? Record<never, unknown> :
	A extends '_setting' ? Record<never, unknown> :
	never

type BondShapeDepth2<A extends AtomName> =
	A extends '_superuser' ? {groups?: Molecule<'_group', 1>[]} :
	A extends '_group' ? Record<never, unknown> :
	A extends '_user' ? {groups?: Molecule<'_group', 1>[]} :
	A extends '_media' ? Record<never, unknown> :
	A extends '_error' ? {request?: Molecule<'_request', 1>} :
	A extends '_request' ? Record<never, unknown> :
	A extends '_setting' ? Record<never, unknown> :
	never

type BondShapeDepth3<A extends AtomName> =
	A extends '_superuser' ? {groups?: Molecule<'_group', 2>[]} :
	A extends '_group' ? Record<never, unknown> :
	A extends '_user' ? {groups?: Molecule<'_group', 2>[]} :
	A extends '_media' ? Record<never, unknown> :
	A extends '_error' ? {request?: Molecule<'_request', 2>} :
	A extends '_request' ? Record<never, unknown> :
	A extends '_setting' ? Record<never, unknown> :
	never

type BondShapeDepth4<A extends AtomName> =
	A extends '_superuser' ? {groups?: Molecule<'_group', 3>[]} :
	A extends '_group' ? Record<never, unknown> :
	A extends '_user' ? {groups?: Molecule<'_group', 3>[]} :
	A extends '_media' ? Record<never, unknown> :
	A extends '_error' ? {request?: Molecule<'_request', 3>} :
	A extends '_request' ? Record<never, unknown> :
	A extends '_setting' ? Record<never, unknown> :
	never

type _superuser = AtomHardProperties & _superuserShape

type _group = AtomHardProperties & _groupShape

type _user = AtomHardProperties & _userShape

type _media = AtomHardProperties & _mediaShape

type _error = AtomHardProperties & _errorShape

type _request = AtomHardProperties & _requestShape

type _setting = AtomHardProperties & _settingShape

export type AtomShape<A extends AtomName> =
	A extends '_superuser' ? _superuserShape :
	A extends '_group' ? _groupShape :
	A extends '_user' ? _userShape :
	A extends '_media' ? _mediaShape :
	A extends '_error' ? _errorShape :
	A extends '_request' ? _requestShape :
	A extends '_setting' ? _settingShape :
	never

export type Atom<A extends AtomName> =
	A extends '_superuser' ? _superuser :
	A extends '_group' ? _group :
	A extends '_user' ? _user :
	A extends '_media' ? _media :
	A extends '_error' ? _error :
	A extends '_request' ? _request :
	A extends '_setting' ? _setting :
	never


type RouteDefaultName = 'count' | 'find_one' | 'find' | 'find_id' | 'insert' | 'update' | 'delete' | 'insert_multiple' | 'update_multiple' | 'delete_multiple' | 'search_count' | 'search'

type RouteCustomName<A extends AtomName> =
	A extends '_superuser' ? never :
	A extends '_group' ? never :
	A extends '_user' ? never :
	A extends '_media' ? 'upload' | 'presigned' :
	A extends '_error' ? never :
	A extends '_request' ? never :
	A extends '_setting' ? never :
	never

export type RouteName<A extends AtomName> =
	RouteCustomName<A> | RouteDefaultName;

export type RouteURL<A extends AtomName, R extends RouteName<A>> =
	A extends '_superuser' ?
		R extends 'count' ? '/count' :
		R extends 'find_one' ? '/first' :
		R extends 'find' ? '/' :
		R extends 'find_id' ? '/:id' :
		R extends 'insert' ? '/' :
		R extends 'update' ? '/:id' :
		R extends 'delete' ? '/:id' :
		R extends 'insert_multiple' ? '/multiple' :
		R extends 'update_multiple' ? '/multiple/:ids' :
		R extends 'delete_multiple' ? '/multiple/:ids' :
		R extends 'search_count' ? '/search/count/:q' :
		R extends 'search' ? '/search/:q' :
		never :
	A extends '_group' ?
		R extends 'count' ? '/count' :
		R extends 'find_one' ? '/first' :
		R extends 'find' ? '/' :
		R extends 'find_id' ? '/:id' :
		R extends 'insert' ? '/' :
		R extends 'update' ? '/:id' :
		R extends 'delete' ? '/:id' :
		R extends 'insert_multiple' ? '/multiple' :
		R extends 'update_multiple' ? '/multiple/:ids' :
		R extends 'delete_multiple' ? '/multiple/:ids' :
		R extends 'search_count' ? '/search/count/:q' :
		R extends 'search' ? '/search/:q' :
		never :
	A extends '_user' ?
		R extends 'count' ? '/count' :
		R extends 'find_one' ? '/first' :
		R extends 'find' ? '/' :
		R extends 'find_id' ? '/:id' :
		R extends 'insert' ? '/' :
		R extends 'update' ? '/:id' :
		R extends 'delete' ? '/:id' :
		R extends 'insert_multiple' ? '/multiple' :
		R extends 'update_multiple' ? '/multiple/:ids' :
		R extends 'delete_multiple' ? '/multiple/:ids' :
		R extends 'search_count' ? '/search/count/:q' :
		R extends 'search' ? '/search/:q' :
		never :
	A extends '_media' ?
		R extends 'upload' ? '/upload' :
		R extends 'presigned' ? '/presigned' :
		R extends 'count' ? '/count' :
		R extends 'find_one' ? '/first' :
		R extends 'find' ? '/' :
		R extends 'find_id' ? '/:id' :
		R extends 'insert' ? '/' :
		R extends 'update' ? '/:id' :
		R extends 'delete' ? '/:id' :
		R extends 'insert_multiple' ? '/multiple' :
		R extends 'update_multiple' ? '/multiple/:ids' :
		R extends 'delete_multiple' ? '/multiple/:ids' :
		R extends 'search_count' ? '/search/count/:q' :
		R extends 'search' ? '/search/:q' :
		never :
	A extends '_error' ?
		R extends 'count' ? '/count' :
		R extends 'find_one' ? '/first' :
		R extends 'find' ? '/' :
		R extends 'find_id' ? '/:id' :
		R extends 'insert' ? '/' :
		R extends 'update' ? '/:id' :
		R extends 'delete' ? '/:id' :
		R extends 'insert_multiple' ? '/multiple' :
		R extends 'update_multiple' ? '/multiple/:ids' :
		R extends 'delete_multiple' ? '/multiple/:ids' :
		R extends 'search_count' ? '/search/count/:q' :
		R extends 'search' ? '/search/:q' :
		never :
	A extends '_request' ?
		R extends 'count' ? '/count' :
		R extends 'find_one' ? '/first' :
		R extends 'find' ? '/' :
		R extends 'find_id' ? '/:id' :
		R extends 'insert' ? '/' :
		R extends 'update' ? '/:id' :
		R extends 'delete' ? '/:id' :
		R extends 'insert_multiple' ? '/multiple' :
		R extends 'update_multiple' ? '/multiple/:ids' :
		R extends 'delete_multiple' ? '/multiple/:ids' :
		R extends 'search_count' ? '/search/count/:q' :
		R extends 'search' ? '/search/:q' :
		never :
	A extends '_setting' ?
		R extends 'count' ? '/count' :
		R extends 'find_one' ? '/first' :
		R extends 'find' ? '/' :
		R extends 'find_id' ? '/:id' :
		R extends 'insert' ? '/' :
		R extends 'update' ? '/:id' :
		R extends 'delete' ? '/:id' :
		R extends 'insert_multiple' ? '/multiple' :
		R extends 'update_multiple' ? '/multiple/:ids' :
		R extends 'delete_multiple' ? '/multiple/:ids' :
		R extends 'search_count' ? '/search/count/:q' :
		R extends 'search' ? '/search/:q' :
		never :
never


export type RouteQueryParam<A extends AtomName, R extends RouteName<A>> =
	A extends '_superuser' ?
		R extends 'count' ? 'filter' :
		R extends 'find_one' ? 'filter' | 'options' :
		R extends 'find' ? 'filter' | 'options' :
		R extends 'find_id' ? 'options' :
		R extends 'insert' ? never :
		R extends 'update' ? 'options' :
		R extends 'delete' ? never :
		R extends 'insert_multiple' ? never :
		R extends 'update_multiple' ? never :
		R extends 'delete_multiple' ? never :
		R extends 'search_count' ? never :
		R extends 'search' ? 'options' :
		never :
	A extends '_group' ?
		R extends 'count' ? 'filter' :
		R extends 'find_one' ? 'filter' | 'options' :
		R extends 'find' ? 'filter' | 'options' :
		R extends 'find_id' ? 'options' :
		R extends 'insert' ? never :
		R extends 'update' ? 'options' :
		R extends 'delete' ? never :
		R extends 'insert_multiple' ? never :
		R extends 'update_multiple' ? never :
		R extends 'delete_multiple' ? never :
		R extends 'search_count' ? never :
		R extends 'search' ? 'options' :
		never :
	A extends '_user' ?
		R extends 'count' ? 'filter' :
		R extends 'find_one' ? 'filter' | 'options' :
		R extends 'find' ? 'filter' | 'options' :
		R extends 'find_id' ? 'options' :
		R extends 'insert' ? never :
		R extends 'update' ? 'options' :
		R extends 'delete' ? never :
		R extends 'insert_multiple' ? never :
		R extends 'update_multiple' ? never :
		R extends 'delete_multiple' ? never :
		R extends 'search_count' ? never :
		R extends 'search' ? 'options' :
		never :
	A extends '_media' ?
		R extends 'upload' ? never :
		R extends 'presigned' ? 'filename' | 'size' | 'type' :
		R extends 'count' ? 'filter' :
		R extends 'find_one' ? 'filter' | 'options' :
		R extends 'find' ? 'filter' | 'options' :
		R extends 'find_id' ? 'options' :
		R extends 'insert' ? never :
		R extends 'update' ? 'options' :
		R extends 'delete' ? never :
		R extends 'insert_multiple' ? never :
		R extends 'update_multiple' ? never :
		R extends 'delete_multiple' ? never :
		R extends 'search_count' ? never :
		R extends 'search' ? 'options' :
		never :
	A extends '_error' ?
		R extends 'count' ? 'filter' :
		R extends 'find_one' ? 'filter' | 'options' :
		R extends 'find' ? 'filter' | 'options' :
		R extends 'find_id' ? 'options' :
		R extends 'insert' ? never :
		R extends 'update' ? 'options' :
		R extends 'delete' ? never :
		R extends 'insert_multiple' ? never :
		R extends 'update_multiple' ? never :
		R extends 'delete_multiple' ? never :
		R extends 'search_count' ? never :
		R extends 'search' ? 'options' :
		never :
	A extends '_request' ?
		R extends 'count' ? 'filter' :
		R extends 'find_one' ? 'filter' | 'options' :
		R extends 'find' ? 'filter' | 'options' :
		R extends 'find_id' ? 'options' :
		R extends 'insert' ? never :
		R extends 'update' ? 'options' :
		R extends 'delete' ? never :
		R extends 'insert_multiple' ? never :
		R extends 'update_multiple' ? never :
		R extends 'delete_multiple' ? never :
		R extends 'search_count' ? never :
		R extends 'search' ? 'options' :
		never :
	A extends '_setting' ?
		R extends 'count' ? 'filter' :
		R extends 'find_one' ? 'filter' | 'options' :
		R extends 'find' ? 'filter' | 'options' :
		R extends 'find_id' ? 'options' :
		R extends 'insert' ? never :
		R extends 'update' ? 'options' :
		R extends 'delete' ? never :
		R extends 'insert_multiple' ? never :
		R extends 'update_multiple' ? never :
		R extends 'delete_multiple' ? never :
		R extends 'search_count' ? never :
		R extends 'search' ? 'options' :
		never :
never



import {urn_response} from 'urn-lib';

export type CallResponse<A extends AtomName, R extends RouteName<A>, D extends Depth = 0> =
	A extends '_superuser' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		R extends 'search_count' ? number :
		R extends 'search' ? Molecule<A,D>[] :
		never :
	A extends '_group' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		R extends 'search_count' ? number :
		R extends 'search' ? Molecule<A,D>[] :
		never :
	A extends '_user' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		R extends 'search_count' ? number :
		R extends 'search' ? Molecule<A,D>[] :
		never :
	A extends '_media' ?
		R extends 'upload' ? Molecule<A,D>[] :
		R extends 'presigned' ? string :
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		R extends 'search_count' ? number :
		R extends 'search' ? Molecule<A,D>[] :
		never :
	A extends '_error' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		R extends 'search_count' ? number :
		R extends 'search' ? Molecule<A,D>[] :
		never :
	A extends '_request' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		R extends 'search_count' ? number :
		R extends 'search' ? Molecule<A,D>[] :
		never :
	A extends '_setting' ?
		R extends 'count' ? number :
		R extends 'find_one' ? Molecule<A,D> :
		R extends 'find' ? Molecule<A,D>[] :
		R extends 'find_id' ? Molecule<A,D> :
		R extends 'insert' ? Molecule<A,D> :
		R extends 'update' ? Molecule<A,D> :
		R extends 'delete' ? Molecule<A,D> :
		R extends 'insert_multiple' ? Molecule<A,D>[] :
		R extends 'update_multiple' ? Molecule<A,D>[] :
		R extends 'delete_multiple' ? Molecule<A,D>[] :
		R extends 'search_count' ? number :
		R extends 'search' ? Molecule<A,D>[] :
		never :
	never


export type ApiResponse<A extends AtomName, R extends RouteName<A>, D extends Depth = 0> = urn_response.General<CallResponse<A,R,D>>

export {};

/** --uranio-generate-end */
