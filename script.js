const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')

const LOCAL_STORAGE_LIST_KEY = 'tasks.list'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'tasks.selectedListId'

listsContainer.addEventListener('click', e => {
    console.log(e.target.tagName.toLowerCase())
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId //error here
        console.log(selectedListId)
        saveAndRender()
    }
})

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
    
} ) 

function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: []}
}

function saveAndRender() {
    save()
    render()

}

function save() { 
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))

}

function render() {
    clearElement(listsContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.ListId = list.id
        listElement.classList.add("list-name") // hightlight selected item
        listElement.innerText = list.name
        if (list.id === selectedListId) {
            listElement.classList.add('active-list')
        }
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
    
}

render()

