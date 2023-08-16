'use strict'

const inputField = document.getElementById('input-item')
const addButton = document.getElementById('add-button')
const todoList = document.getElementById('todo-list')
const doneList = document.getElementById('done-list')

const createNewItem = function(newItem) {
  const listItem = document.createElement('li')
  const checkBox = document.createElement('input')
  const itemText = document.createElement('p')
  const deleteBtn = document.createElement('span')

  checkBox.type = 'checkbox'
  itemText.innerText = newItem
  deleteBtn.innerText = 'close'
  deleteBtn.className = 'material-symbols-outlined'

  listItem.appendChild(checkBox)
  listItem.appendChild(itemText)
  listItem.appendChild(deleteBtn)

  checkBox.addEventListener('change', function() {
    if (checkBox.checked) {
      deleteBtn.innerText = 'done'
    } else {
      deleteBtn.innerText = 'close'
    }
  })

  deleteBtn.addEventListener('click', function() {
    if (checkBox.checked) {
      moveItemToDone(listItem)
    } else {
      if (this.parentElement.parentElement.id === 'done-list') {
        moveItemToTodoList(listItem)
      } else if (this.parentElement.parentElement.id === 'todo-list') {
        listItem.remove()
      }
    }
  })

  return listItem
}

const addItem = function() {
  const newItemText = inputField.value.trim()
  if (newItemText !== '') {
    const listItem = createNewItem(inputField.value)
    todoList.appendChild(listItem)
    inputField.value = ''
  }
}

addButton.addEventListener('click', addItem)

inputField.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    addButton.click()
  }
})

const deleteItem = function() {
  const listItem = this.parentNode
  const ul = listItem.parentNode
  ul.removeChild(listItem)
  checkDoneListEmpty()
}

function moveItemToDone(listItem) {
  if (!document.getElementById('done-title')) {
    const doneTitle = document.createElement('h3')
    doneTitle.innerText = 'Done'
    doneTitle.id = 'done-title'
    doneList.before(doneTitle)
  }
  doneList.appendChild(listItem)
  checkDoneListEmpty()
}

function moveItemToTodoList(listItem) {
  todoList.appendChild(listItem)
  checkDoneListEmpty()
}

function checkDoneListEmpty() {
  if (doneList.childElementCount === 0) {
    document.getElementById('done-title').style.display = "none"
  } else {
    document.getElementById('done-title').style.display = "block"
  }
}