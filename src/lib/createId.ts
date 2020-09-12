let id: number = JSON.parse(window.localStorage.getItem('MaxID') || '0')

function createId() {
    id++
    window.localStorage.setItem('MaxID', JSON.stringify(id))
    return id
}

export default createId