declare module 'uranio-schema/index' {
  /**
   * Index module
   *
   * @packageDocumentation
   */
  import * as urn_schema from 'uranio-schema/main';
  export default urn_schema;

}
declare module 'uranio-schema/main' {
  /**
   * Main module
   *
   * @packageDocumentation
   */
  export * from 'uranio-schema/typ/index';
  import * as stc from 'uranio-schema/stc/index';
  export { stc };

}
declare module 'uranio-schema/run' {
  /**
   * Run module for testing
   * Entry point for `yarn dev` `npm run dev` command.
   *
   * @packageDocumentation
   */
  export {};

}
declare module 'uranio-schema/stc/index' {
  /**
   * Index module for statics
   *
   * @packageDocumentation
   */
  export * from 'uranio-schema/stc/static';

}
declare module 'uranio-schema/stc/static' {
  /**
   * Static types module
   *
   * This modules defines all the static definitions
   *
   * @packageDocumentation
   */
  import { BookPropertyType } from 'uranio-schema/typ/atom';
  export const atom_hard_properties: {
      readonly _id: {
          readonly type: BookPropertyType.ID;
          readonly label: "_id";
      };
      readonly _date: {
          readonly type: BookPropertyType.TIME;
          readonly label: "_date";
          readonly default: "NOW";
          readonly on_error: () => Date;
      };
  };
  export const atom_common_properties: {
      readonly _r: {
          readonly type: BookPropertyType.ID;
          readonly label: "_r";
          readonly optional: true;
      };
      readonly _w: {
          readonly type: BookPropertyType.ID;
          readonly label: "_w";
          readonly optional: true;
      };
      readonly _deleted_from: {
          readonly type: BookPropertyType.ID;
          readonly label: "Deleted from";
          readonly optional: true;
      };
  };
  export const abstract_passport: {
      readonly _id: "string";
      readonly auth_atom_name: "string";
      readonly groups: "string[]";
  };

}
declare module 'uranio-schema/typ/atom' {
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
  import { KeyOfHardProperties, KeyOfCommonProperties, BookPropertyType, RealTypeOfAtomHardProperty, RealTypeOfAtomCommonProperty } from 'uranio-schema/typ/private';
  export { BookPropertyType };
  export const enum BookSecurityType {
      UNIFORM = "UNIFORM",
      GRANULAR = "GRANULAR"
  }
  export const enum BookPermissionType {
      NOBODY = "NOBODY",
      PUBLIC = "PUBLIC"
  }
  type AtomHardProperties = {
      [k in KeyOfHardProperties]: RealTypeOfAtomHardProperty<k>;
  };
  type AtomCommonProperties = {
      [k in KeyOfCommonProperties]?: RealTypeOfAtomCommonProperty<k>;
  };
  export type Depth = undefined | 0 | 1 | 2 | 3;
  type PrimitiveShape<A extends AtomName> = Omit<AtomShape<A>, BondProperties<A>>;
  type BondPrimitiveShape<A extends AtomName> = BondProperties<A> extends keyof AtomShape<A> ? Pick<AtomShape<A>, BondProperties<A>> : never;
  type AtomPrimitiveShape<A extends AtomName> = PrimitiveShape<A>;
  type BondShape<A extends AtomName, D extends Depth> = D extends (0 | undefined) ? BondPrimitiveShape<A> : D extends 1 ? BondShapeDepth1<A> : D extends 2 ? BondShapeDepth2<A> : D extends 3 ? BondShapeDepth3<A> : D extends 4 ? BondShapeDepth4<A> : never;
  export type Molecule<A extends AtomName, D extends Depth = 0> = D extends (0 | undefined) ? Atom<A> : AtomHardProperties & AtomCommonProperties & AtomPrimitiveShape<A> & BondShape<A, D>;
  export type AuthAtom<A extends AuthName> = Atom<A>;
  export type AuthAtomShape<A extends AuthName> = AtomShape<A>;
  /**
   * Generate
   */
  export type AtomName = 'superuser' | 'user' | 'group' | 'media';
  export type AuthName = 'superuser' | 'user';
  export type LogName = never;
  type SuperuserShape = AtomCommonProperties & {
      email: string;
      password: string;
      groups: string[];
      favicon?: string;
  };
  type UserShape = AtomCommonProperties & {
      email: string;
      password: string;
      groups: string[];
  };
  type GroupShape = AtomCommonProperties & {
      name: string;
  };
  type MediaShape = AtomCommonProperties & {
      src: string;
      filename: string;
      type: string;
      size: number;
  };
  type BondProperties<A extends AtomName> = A extends 'superuser' ? 'groups' | 'favicon' : A extends 'user' ? 'groups' : A extends 'group' ? never : A extends 'media' ? never : never;
  type BondShapeDepth1<A extends AtomName> = A extends 'superuser' ? {
      groups: Atom<'group'>[];
      favicon?: Atom<'media'>;
  } : A extends 'user' ? {
      groups: Atom<'group'>[];
  } : A extends 'group' ? never : A extends 'media' ? never : never;
  type BondShapeDepth2<A extends AtomName> = A extends 'superuser' ? {
      groups: Molecule<'group', 1>[];
      favicon?: Molecule<'media', 1>;
  } : A extends 'user' ? {
      groups: Molecule<'group', 1>[];
  } : A extends 'group' ? never : A extends 'media' ? never : never;
  type BondShapeDepth3<A extends AtomName> = A extends 'superuser' ? {
      groups: Molecule<'group', 2>[];
      favicon?: Molecule<'media', 2>;
  } : A extends 'user' ? {
      groups: Molecule<'group', 2>[];
  } : A extends 'group' ? never : A extends 'media' ? never : never;
  type BondShapeDepth4<A extends AtomName> = A extends 'superuser' ? {
      groups: Molecule<'group', 3>[];
      favicon?: Molecule<'media', 3>;
  } : A extends 'user' ? {
      groups: Molecule<'group', 3>[];
  } : A extends 'group' ? never : A extends 'media' ? never : never;
  type Superuser = AtomHardProperties & SuperuserShape;
  type User = AtomHardProperties & UserShape;
  type Group = AtomHardProperties & GroupShape;
  type Media = AtomHardProperties & MediaShape;
  export type AtomShape<A extends AtomName> = A extends 'superuser' ? SuperuserShape : A extends 'user' ? UserShape : A extends 'group' ? GroupShape : A extends 'media' ? MediaShape : never;
  export type Atom<A extends AtomName> = A extends 'superuser' ? Superuser : A extends 'user' ? User : A extends 'group' ? Group : A extends 'media' ? Media : never;

}
declare module 'uranio-schema/typ/index' {
  /**
   * Index module for types
   *
   * @packageDocumentation
   */
  export * from 'uranio-schema/typ/atom';
  export * from 'uranio-schema/typ/query';

}
declare module 'uranio-schema/typ/private' {
  /**
   * Private module
   * so that it doesn't export all the common types.
   *
   * @packageDocumentation
   */
  import { atom_hard_properties, atom_common_properties } from 'uranio-schema/stc/index';
  export const enum BookPropertyType {
      ID = "ID",
      TEXT = "TEXT",
      LONG_TEXT = "LONG_TEXT",
      EMAIL = "EMAIL",
      INTEGER = "INTEGER",
      FLOAT = "FLOAT",
      BINARY = "BINARY",
      ENCRYPTED = "ENCRYPTED",
      DAY = "DAY",
      TIME = "TIME",
      ENUM_STRING = "ENUM_STRING",
      ENUM_NUMBER = "ENUM_NUMBER",
      SET_STRING = "SET_STRING",
      SET_NUMBER = "SET_NUMBER",
      ATOM = "ATOM",
      ATOM_ARRAY = "ATOM_ARRAY"
  }
  export type RealType<AT extends BookPropertyType> = AT extends BookPropertyType.ID ? string : AT extends BookPropertyType.TEXT ? string : AT extends BookPropertyType.LONG_TEXT ? string : AT extends BookPropertyType.EMAIL ? string : AT extends BookPropertyType.INTEGER ? number : AT extends BookPropertyType.FLOAT ? number : AT extends BookPropertyType.BINARY ? boolean : AT extends BookPropertyType.ENCRYPTED ? string : AT extends BookPropertyType.DAY ? Date : AT extends BookPropertyType.TIME ? Date : AT extends BookPropertyType.SET_STRING ? Array<string> : AT extends BookPropertyType.SET_NUMBER ? Array<number> : AT extends BookPropertyType.ENUM_STRING ? string : AT extends BookPropertyType.ENUM_NUMBER ? number : AT extends BookPropertyType.ATOM ? string : AT extends BookPropertyType.ATOM_ARRAY ? string[] : never;
  export type KeyOfHardProperties = keyof typeof atom_hard_properties;
  export type KeyOfCommonProperties = keyof typeof atom_common_properties;
  type DefinitionPropertyInferType<P> = P extends {
      type: infer I;
  } ? I : never;
  type DefinitionTypeOfHardProperty<k extends KeyOfHardProperties> = DefinitionPropertyInferType<typeof atom_hard_properties[k]>;
  type DefinitionTypeOfCommonProperty<k extends KeyOfCommonProperties> = DefinitionPropertyInferType<typeof atom_common_properties[k]>;
  export type RealTypeOfAtomHardProperty<k extends KeyOfHardProperties> = RealType<DefinitionTypeOfHardProperty<k>>;
  export type RealTypeOfAtomCommonProperty<k extends KeyOfCommonProperties> = RealType<DefinitionTypeOfCommonProperty<k>>;
  export {};

}
declare module 'uranio-schema/typ/query' {
  /**
   * Query type module
   *
   * @packageDocumentation
   */
  import * as atoms from 'uranio-schema/typ/atom';
  import * as common from 'uranio-schema/typ/private';
  export type Query<A extends atoms.AtomName> = Query.Expression<A> | Query.Logical<A>;
  type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
  export namespace Query {
      type QueryAtomKey<A extends atoms.AtomName> = common.KeyOfHardProperties | common.KeyOfCommonProperties | keyof atoms.Atom<A>;
      type QueryAtomRealType<A extends atoms.AtomName, P extends QueryAtomKey<A>> = P extends common.KeyOfHardProperties ? common.RealTypeOfAtomHardProperty<P> : P extends common.KeyOfCommonProperties ? common.RealTypeOfAtomCommonProperty<P> : P extends keyof atoms.Atom<A> ? PropType<atoms.Atom<A>, P> : never;
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
  export {};

}
declare module 'uranio-schema' {
  import main = require('uranio-schema/index');
  export = main;
}