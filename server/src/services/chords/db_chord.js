const { CollectionDefinition, Schema, Permission, PermissionTypes, DatabaseTrigger, } = require('@modular-rest/server');


let TableRowSchema = new Schema({
    major: { type: Schema.Types.ObjectId, ref: 'chord', required: true },
    naturalMinor: { type: Schema.Types.ObjectId, ref: 'chord', required: true },
    harmonicMinor: { type: Schema.Types.ObjectId, ref: 'chord', required: true },
    melodicMinor: { type: Schema.Types.ObjectId, ref: 'chord', required: true },
})

let TableChromaticRowSchema = new Schema({
    one: { type: Schema.Types.ObjectId, ref: 'chord' },
    two: { type: Schema.Types.ObjectId, ref: 'chord' },
    three: { type: Schema.Types.ObjectId, ref: 'chord' },
    four: { type: Schema.Types.ObjectId, ref: 'chord' },
})

module.exports = [
    new CollectionDefinition({
        db: 'chord',
        collection: 'type',
        schema: new Schema({
            title: { type: String, unique: true, required: true },
            description: String,
        }),
        permissions: [
            new Permission({
                type: PermissionTypes.god_access,
                write: true,
                read: true,
            }),
            new Permission({
                type: PermissionTypes.anonymous_access,
                read: true,
            })
        ],
    }),

    new CollectionDefinition({
        db: 'chord',
        collection: 'keysignature',
        schema: new Schema({
            minor: { type: String, unique: true, required: true },
            major: { type: String, unique: true, required: true },
            description: String,
        }),
        permissions: [
            new Permission({
                type: PermissionTypes.god_access,
                write: true,
                read: true,
            }),
            new Permission({
                type: PermissionTypes.anonymous_access,
                read: true,
            })
        ],
    }),

    new CollectionDefinition({
        db: 'chord',
        collection: 'chord',
        schema: new Schema({
            title: { type: String, unique: true, required: true },
            type: { type: Schema.Types.ObjectId, ref: 'type', required: true, },
        }),
        permissions: [
            new Permission({
                type: PermissionTypes.god_access,
                write: true,
                read: true,
            }),
            new Permission({
                type: PermissionTypes.anonymous_access,
                read: true,
            })
        ],
    }),

    new CollectionDefinition({
        db: 'chord',
        collection: 'table',
        schema: new Schema({
            keySignature: { type: Schema.Types.ObjectId, ref: 'keysignature', required: true, },
            type: { type: Schema.Types.ObjectId, ref: 'type', required: true, },
            rows: [TableRowSchema],
            vocalRows: { type: [String], default: [] },
            chromaticRows: [TableChromaticRowSchema],
        }),
        permissions: [
            new Permission({
                type: PermissionTypes.god_access,
                write: true,
                read: true,
            }),
            new Permission({
                type: PermissionTypes.anonymous_access,
                read: true,
            })
        ],
    }),
]
