const { CollectionDefinition, Schema, Permission, PermissionTypes, DatabaseTrigger, } = require('@modular-rest/server');

module.exports = [
    new CollectionDefinition({
        db: 'chord',
        collection: 'type',
        schema: new Schema({
            title: { type: String, unique: true },
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
        collection: 'degree',
        schema: new Schema({
            minor: String,
            major: String,
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
            degree: { type: Schema.Types.ObjectId, ref: 'degree', required: true, },
            type: { type: Schema.Types.ObjectId, ref: 'degree', required: true, },
            table: Array,
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
