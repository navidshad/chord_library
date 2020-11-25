const { CollectionDefinition, Schema, Permission, PermissionTypes, DatabaseTrigger, } = require('modular-rest');

module.exports = [
    new CollectionDefinition({
        db: 'chord',
        collection: 'category',
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
            title: String,
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
            title: String,
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