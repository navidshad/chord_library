const { CollectionDefinition, Schema, Permission, PermissionTypes, DatabaseTrigger, } = require('@modular-rest/server');

module.exports = [
    new CollectionDefinition({
        db: 'song',
        collection: 'genre',
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
        db: 'song',
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
        db: 'song',
        collection: 'song',
        schema: new Schema({
            title: { type: String, required: true },
            artists: [{ type: Schema.Types.ObjectId, ref: 'artist', default: [] }],
            genres: [{ type: Schema.Types.ObjectId, ref: 'genre', default: [] }],
            content: String,
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
