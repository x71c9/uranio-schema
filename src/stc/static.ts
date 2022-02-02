/**
 * Static types module
 *
 * This modules defines all the static definitions
 *
 * @packageDocumentation
 */

import {BookPropertyType} from '../typ/atom';

export const atom_hard_properties = {
	_id: {
		type: BookPropertyType.ID,
		label: '_id',
	},
	_date: {
		type: BookPropertyType.TIME,
		label: '_date',
		default: 'NOW',
		on_error: () => {return new Date();}
	}
} as const;

export const atom_common_properties = {
	_r:{
		type: BookPropertyType.ID,
		label: '_r',
		optional: true
	},
	_w:{
		type: BookPropertyType.ID,
		label: '_w',
		optional: true
	},
	_deleted_from: {
		type: BookPropertyType.ID,
		label: 'Deleted from',
		optional: true
	}
} as const;

export const abstract_passport = {
	_id: 'string',
	auth_atom_name: 'string',
	groups: 'string[]'
} as const;
