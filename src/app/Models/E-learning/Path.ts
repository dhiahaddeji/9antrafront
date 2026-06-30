export class Path {
    id?:number
    title?: string
    description?: string
    duration?: number
    language?: string
    image?: any
    price?: number
    careerDevelopment?: string
    learningGoals?: Goal[]
}

class Goal {
    description?: string
}
