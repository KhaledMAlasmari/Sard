import { Edge, Node } from "reactflow"
import { get_story_data } from "./story_data_formatter"
import { Dynamic, Story, StoryObject, StorySubject } from "./types/storyTypes"

const isValidStory = (story: Story): boolean => {
    if (story.chapters.length === 0) {
        return false
    }
    
    for (const chapter of story.chapters) {
        if (chapter.events.length === 0) {
            return false
        }
        for (const event of chapter.events) {
            if (event.subjects.length === 0 || event.objects.length === 0) {
                return false
            }
            const isDynamicValid = validateDynamic(event.dynamic)
            const isSubjectsValid = validateSubjects(event.subjects)
            const isObjectsValid = validateSubjects(event.objects)
            if(!isSubjectsValid || !isObjectsValid || !isDynamicValid) {
                return false
            }
        }
    }
    return true
}

const validateSubjects = (subjects: StorySubject[] | StoryObject[]) => {
    for (const subject of subjects) {
        if (subject.name === "" || !subject.name) {
            return false
        }
    }
    return true
}


const validateDynamic = (dynamic: Dynamic) => {
    if (dynamic.name === "" || !dynamic.name) {
        return false
    }
    return true
}


export { isValidStory }
