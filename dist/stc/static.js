"use strict";
/**
 * Static types module
 *
 * This modules defines all the static definitions
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.abstract_passport = exports.atom_common_properties = exports.atom_hard_properties = void 0;
exports.atom_hard_properties = {
    _id: {
        type: "ID" /* ID */,
        label: '_id',
    },
    _date: {
        type: "TIME" /* TIME */,
        label: '_date',
        default: 'NOW',
        on_error: () => { return new Date(); }
    }
};
exports.atom_common_properties = {
    _r: {
        type: "ID" /* ID */,
        label: '_r',
        optional: true
    },
    _w: {
        type: "ID" /* ID */,
        label: '_w',
        optional: true
    },
    _deleted_from: {
        type: "ID" /* ID */,
        label: 'Deleted from',
        optional: true
    }
};
exports.abstract_passport = {
    _id: 'string',
    auth_atom_name: 'string',
    groups: 'string[]'
};
//# sourceMappingURL=static.js.map