function generateNode(id: string, type: string, data: Object, position: {x: number, y: number}){
    return {
        id,
        type,
        data,
        position
    }
}
export {generateNode}
