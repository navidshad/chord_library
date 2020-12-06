const { CollectionDefinition, Schema, Permission, PermissionTypes, DatabaseTrigger, } = require('modular-rest');

module.exports = [
    new CollectionDefinition({
        db: 'chord',
        collection: 'genre',
        schema: new Schema({
            title: String,
            parentId: String,
            sku: { type: String, unique: true },
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
        collection: 'artist',
        schema: new Schema({
            name: { type: String, required: true },
            chords: { type: Number, default: 0 },
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
        collection: 'song',
        schema: new Schema({
            title: { type: String, required: true },
		artists: {type: [String], required: true},
		genres:	{type: [String], default: []}
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
    })
]
