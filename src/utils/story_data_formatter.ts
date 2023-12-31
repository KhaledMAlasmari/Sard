import { Edge, Node } from "reactflow"
import { Chapter, Story, StoryEvent, StoryObject, StorySubject } from "./types/storyTypes"

const get_story_data = (nodes: Node[], edges: Edge[], genre: string) => {
    const story: Story = {
        genre: genre,
        chapters: []
    }

    const unorderedChapters = get_chapters(nodes)
    const orderedChapters = order_chapters(unorderedChapters, edges)
    const isOrdered = orderedChapters.length > 0 
    const chapters = isOrdered ? orderedChapters : unorderedChapters
    chapters.forEach((chapter, index) => {
        story.chapters.push(format_chapter(chapter, index, nodes, edges, isOrdered))
    })

    console.log(story)
    return story
}




const get_chapter_dynamics = (nodes: Node[], chapter: Node) => {
    const dynamics = nodes.filter(node => (node.type === "action" && node.parentNode === chapter.id))
    return dynamics
}


const get_chapter_events = (nodes: Node[], edges: Edge[], dynamics: Node[], chapter: Node) => {
    const events: StoryEvent[] = []
    dynamics.forEach(dynamic => {
        const subjects = get_subjects(dynamic, edges, nodes)
        const objects = get_objects(dynamic, edges, nodes)
        const event = {
            dynamic: {
                type: dynamic.type || null,
                name: dynamic.data.name,
            },
            subjects: subjects,
            objects: objects,
        }
        events.push(event)
    })
    return events
}

const get_subjects = (dynamic: Node, edges: Edge[], nodes: Node[]) => {
    const subjects: StorySubject[] = []
    edges.forEach(edge => {
        if (edge.target === dynamic.id) {
            const currentDynamicSubjects = nodes.filter(node => node.id === edge.source)
            if (currentDynamicSubjects) {
                // @ts-ignore
                subjects.push(...currentDynamicSubjects.map(subject => {
                    return {
                        name: subject.data.name,
                        image: subject.data.image,
                        type: subject.type
                    }
                }))
            }
        }
    })
    return subjects
}

const get_objects = (dynamic: Node, edges: Edge[], nodes: Node[]) => {
    const objects: StoryObject[] = []
    edges.forEach(edge => {
        if (edge.source === dynamic.id) {
            const currentDynamicObjects = nodes.filter(node => node.id === edge.target)
            if (currentDynamicObjects) {
                // @ts-ignore
                objects.push(...currentDynamicObjects.map(object => {
                    return {
                        name: object.data.name,
                        image: object.data.image,
                        type: object.type
                    }
                }))
            }
        }
    })
    return objects
}

const get_chapters = (nodes: Node[]) => {
    return nodes.filter(node => node.type === "chapter")
}


const order_chapters = (chapters: Node[], edges: Edge[]) => {
    const startingChapter = get_starting_chapter(chapters, edges)
    const orderedChapters = []
    if (startingChapter) {
        orderedChapters.push(startingChapter)
        for (let i = 0; i < chapters.length - 1; i++) {
            const next_chapter = get_next_chapter(chapters, edges, orderedChapters[i])
            if (next_chapter) {
                orderedChapters.push(next_chapter)
            }
            else {
                break
            }
        }
    }

    if (orderedChapters.length == chapters.length) {
        return orderedChapters
    }
    return []
}


const get_starting_chapter = (chapters: Node[], edges: Edge[]): Node | null => {
    let starting_chapters_count = 0
    let starting_chapters_index = -1
    chapters.forEach((chapter, index) => {
        const source_edge = edges.filter(edge => edge.source === chapter.id)
        const target_edge = edges.filter(edge => edge.target === chapter.id)
        if (target_edge.length === 0 && source_edge.length == 1) {
            starting_chapters_count++
            starting_chapters_index = index
        }
        else if (target_edge.length == 0 && source_edge.length == 0) {
            starting_chapters_count++
            starting_chapters_index = index
        }
    })
    if (starting_chapters_count === 1) {
        return chapters[starting_chapters_index]
    }
    return null
}


const get_next_chapter = (chapters: Node[], edges: Edge[], previous_chapter: Node) => {
    const edge = edges.find(edge => edge.source === previous_chapter.id)
    if (edge) {
        return chapters.find(chapter => chapter.id === edge.target)
    }
    else {
        return null
    }
}


const format_chapter = (chapter: Node, index: Number, nodes: Node[], edges: Edge[], isOrdered: boolean) => {
    const dynamics = get_chapter_dynamics(nodes, chapter)
    const events = get_chapter_events(nodes, edges, dynamics, chapter)
    return {
        id: isOrdered ? index : null,
        image: chapter.data.image,
        events: events
    }
}

export {
    get_story_data
}

