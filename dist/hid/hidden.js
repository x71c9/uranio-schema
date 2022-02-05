"use strict";
/**
 * Private module
 * so that it doesn't export all the common types.
 *
 * @packageDocumentation
 */
// import {atom_hard_properties, atom_common_properties} from '../stc/';
// export enum BookProperty {
//   ID = 'ID',
//   TEXT = 'TEXT',
//   LONG_TEXT = 'LONG_TEXT',
//   EMAIL = 'EMAIL',
//   INTEGER = 'INTEGER',
//   FLOAT = 'FLOAT',
//   BINARY = 'BINARY',
//   ENCRYPTED = 'ENCRYPTED',
//   DAY = 'DAY',
//   TIME = 'TIME',
//   ENUM_STRING = 'ENUM_STRING',
//   ENUM_NUMBER = 'ENUM_NUMBER',
//   SET_STRING = 'SET_STRING',
//   SET_NUMBER = 'SET_NUMBER',
//   ATOM = 'ATOM',
//   ATOM_ARRAY = 'ATOM_ARRAY'
// }
// export enum BookSecurity {
//   UNIFORM = 'UNIFORM',
//   GRANULAR = 'GRANULAR'
// }
// export enum BookPermission {
//   NOBODY = 'NOBODY',
//   PUBLIC = 'PUBLIC'
// }
// export enum AuthAction {
//   READ = 'READ',
//   WRITE = 'WRITE',
//   AUTH = 'AUTH'
// }
// export type AtomHardProperties = {
//   [k in KeyOfHardProperties]: RealTypeOfAtomHardProperty<k>
// }
// export type AtomCommonProperties = {
//   [k in KeyOfCommonProperties]?: RealTypeOfAtomCommonProperty<k>
// }
// type RealType<AT extends BookProperty> =
//   AT extends BookProperty.ID ? string :
//   AT extends BookProperty.TEXT ? string :
//   AT extends BookProperty.LONG_TEXT ? string :
//   AT extends BookProperty.EMAIL ? string :
//   AT extends BookProperty.INTEGER ? number :
//   AT extends BookProperty.FLOAT ? number :
//   AT extends BookProperty.BINARY ? boolean :
//   AT extends BookProperty.ENCRYPTED ? string :
//   AT extends BookProperty.DAY ? Date :
//   AT extends BookProperty.TIME ? Date :
//   AT extends BookProperty.SET_STRING ? Array<string> :
//   AT extends BookProperty.SET_NUMBER ? Array<number> :
//   AT extends BookProperty.ENUM_STRING ? string :
//   AT extends BookProperty.ENUM_NUMBER ? number :
//   AT extends BookProperty.ATOM ? string :
//   AT extends BookProperty.ATOM_ARRAY ? string[] :
//   never;
// export type KeyOfHardProperties = keyof typeof atom_hard_properties
// export type KeyOfCommonProperties = keyof typeof atom_common_properties
// type DefinitionPropertyInferType<P> = P extends {type: infer I} ? I : never;
// type DefinitionTypeOfHardProperty<k extends KeyOfHardProperties> =
//   DefinitionPropertyInferType<typeof atom_hard_properties[k]>;
// type DefinitionTypeOfCommonProperty<k extends KeyOfCommonProperties> =
//   DefinitionPropertyInferType<typeof atom_common_properties[k]>;
// export type RealTypeOfAtomHardProperty<k extends KeyOfHardProperties> =
//   RealType<DefinitionTypeOfHardProperty<k>>;
// export type RealTypeOfAtomCommonProperty<k extends KeyOfCommonProperties> =
//   RealType<DefinitionTypeOfCommonProperty<k>>;
// type RealTypeOfAtomHardProperty<k extends KeyOfHardProperties> =
//   k extends '_id' ? string :
//   k extends '_date' ? Date :
//   never;
// type RealTypeOfAtomCommonProperty<k extends KeyOfCommonProperties> =
//   k extends '_r' ? string :
//   k extends '_w' ? string :
//   k extends '_deleted_from' ? string :
//   never;
//# sourceMappingURL=hidden.js.map