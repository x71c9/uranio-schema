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

export type AtomName = '_superuser' | '_user' | '_group' | '_media'

export type AuthName = '_superuser' | '_user'

export type LogName = never

type SuperuserShape = AtomCommonProperties & {
	email: string
	password: string
	groups: string[]
	favicon?: string
}

type UserShape = AtomCommonProperties & {
	email: string
	password: string
	groups: string[]
}

type GroupShape = AtomCommonProperties & {
	name: string
}

type MediaShape = AtomCommonProperties & {
	src: string
	filename: string
	type: string
	size: number
}

type BondProperties<A extends AtomName> =
	A extends '_superuser' ? 'groups' | 'favicon' :
	A extends '_user' ? 'groups' :
	A extends '_group' ? never :
	A extends '_media' ? never :
	never

type BondShapeDepth1<A extends AtomName> =
	A extends '_superuser' ? {groups: Atom<'_group'>[], favicon?:Atom<'_media'>} :
	A extends '_user' ? {groups: Atom<'_group'>[]} :
	A extends '_group' ? never :
	A extends '_media' ? never :
	never

type BondShapeDepth2<A extends AtomName> =
	A extends '_superuser' ? {groups: Molecule<'_group',1>[], favicon?:Molecule<'_media',1>} :
	A extends '_user' ? {groups: Molecule<'_group',1>[]} :
	A extends '_group' ? never :
	A extends '_media' ? never :
	never

type BondShapeDepth3<A extends AtomName> =
	A extends '_superuser' ? {groups: Molecule<'_group',2>[], favicon?:Molecule<'_media',2>} :
	A extends '_user' ? {groups: Molecule<'_group',2>[]} :
	A extends '_group' ? never :
	A extends '_media' ? never :
	never

type BondShapeDepth4<A extends AtomName> =
	A extends '_superuser' ? {groups: Molecule<'_group',3>[], favicon?:Molecule<'_media',3>} :
	A extends '_user' ? {groups: Molecule<'_group',3>[]} :
	A extends '_group' ? never :
	A extends '_media' ? never :
	never

type Superuser =
	AtomHardProperties & SuperuserShape

type User =
	AtomHardProperties & UserShape

type Group =
	AtomHardProperties & GroupShape

type Media =
	AtomHardProperties & MediaShape

export type AtomShape<A extends AtomName> =
	A extends '_superuser' ? SuperuserShape :
	A extends '_user' ? UserShape :
	A extends '_group' ? GroupShape :
	A extends '_media' ? MediaShape :
	never

export type Atom<A extends AtomName> =
	A extends '_superuser' ? Superuser :
	A extends '_user' ? User :
	A extends '_group' ? Group :
	A extends '_media' ? Media :
	never;

export type RouteCustomName<A extends AtomName> =
	A extends '_superuser' ? never :
	A extends '_user' ? never :
	A extends '_group' ? never :
	A extends '_media' ? never :
	A extends '_request' ? never :
	A extends '_error' ? never :
	never;

/** --uranio-generate-end */

// export const molecule:Molecule<'_superuser',1> = {
//   _id: '',
//   _date: new Date(),
//   _deleted_from: '',
//   email: '',
//   password: '',
//   groups: [{_id: '', _date: new Date(), name: ''}],
//   // favicon: {_id: '', _date: new Date()}
// };
