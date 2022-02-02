"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
// export const su:Molecule<'superuser',1> = {
//   _id: '',
//   _date: new Date(),
//   email: '',
//   password: '',
//   groups: [{_id: '', _date: new Date(), name: ''}],
//   // favicon: {_id: '', _date: new Date()}
// }
//# sourceMappingURL=atom.js.map