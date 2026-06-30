import { EChapter } from "./EChapters"

export class Course {
    id?:number
    title?: string
    description?: string
    duration?: number
    language?: string
    image?: any
    trailer?: string 
    goal?: Goal[]
    chapters?: EChapter[]
}

class Goal {
    description?: string
}