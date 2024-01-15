class Event {
    subjects: String[];
    objects: String[];
    dynamic: String;
    
    constructor(subject: String[], object: String[], dynamic: String) {
        this.subjects = subject;
        this.objects = object;
        this.dynamic = dynamic;
    }
}

export default Event;
