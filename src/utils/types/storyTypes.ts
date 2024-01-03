type StoryEvent = {
    dynamic: Dynamic
    subjects: StorySubject[];
    objects: StoryObject[];
}


type Chapter = {
    id: Number | null,
    title?: String|undefined,
    image: String| null,
    events: StoryEvent[]

}


type StorySubject = {
    name: String,
    image: String | null,
    type: String

}


type StoryObject = {
    name: String,
    image: String | null,
    type: String

}

type Story = {
    genre: string | null;
    storyType: string;
    chapters: Chapter[];
}


type GeneratedStory = {
    story: {
        chapter_id: number
        chapter_story: String
        chapter_prompt: String
    }[] | null
}

type Dynamic = {
    type: String | null;
    name: any;
}

export type {
    StoryEvent,
    Chapter,
    Story,
    StorySubject,
    StoryObject,
    Dynamic,
    GeneratedStory
}
