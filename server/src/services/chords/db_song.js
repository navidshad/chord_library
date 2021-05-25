const { CollectionDefinition, Schema, Schemas, Permission, PermissionTypes, DatabaseTrigger, } = require('@modular-rest/server');

let SongChordSchema = new Schema({
    rowIndex: Number,
    column: String,
    title: String,
    table: String,
    chord: String,
    keySignature: String,
    type: { type: String, enum: ['regular', 'chromatic'], default: 'regular' },
})
let VocalNoteSchema = new Schema({
    note: String,
    index: Number,
    table: String,
})

let SongSectionSchema = new Schema({
    title: String,
    direction: String,
    lines: [{ chords: String, text: String }]
})

let MelodySchema = new Schema({
    title: String,
    file: Schemas.file,
})

module.exports = [
    new CollectionDefinition({
        db: 'tab',
        collection: 'genre',
        schema: new Schema({
            title: String,
            image: Schemas.file,
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
            image: Schemas.file,
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
            rhythm: { type: String, },
            artists: [{ type: Schema.Types.ObjectId, ref: 'artist', default: [] }],
            genres: [{ type: Schema.Types.ObjectId, ref: 'genre', default: [] }],
            chords: {
                keySignature: { type: String, enum: ['major', 'minor'] },
                vocalNote: VocalNoteSchema,
                list: [SongChordSchema]
            },
            sections: [SongSectionSchema],
            image: Schemas.file,
            melodies: [MelodySchema],
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
