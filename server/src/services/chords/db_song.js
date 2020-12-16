const { CollectionDefinition, Schema, Permission, PermissionTypes, DatabaseTrigger, } = require('@modular-rest/server');

let SongChordSchema = new Schema({
    rowIndex: Number,
    column: String,
    title: String,
    table: String,
    chord: String,
    keySignature: String,
})

module.exports = [
    new CollectionDefinition({
        db: 'tab',
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
        db: 'tab',
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
        db: 'tab',
        collection: 'song',
        schema: new Schema({
            title: { type: String, required: true },
            artists: [{ type: Schema.Types.ObjectId, ref: 'artist', default: [] }],
            genres: [{ type: Schema.Types.ObjectId, ref: 'genre', default: [] }],
            chords: {
                keySignature: { type: String, enum: ['major', 'minor'] },
                list: [SongChordSchema]
            },
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
