(function() {
    function createAppTitle(title){
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        button.disabled = true;

        input.addEventListener('input', function(){
            if (input !== '') {
                button.disabled = false;
            }
        })


        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    let boxAllArr = []; // new

    function createTodoItem(name, done = false) { // new
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        let creatId = Math.round(Math.random() * 1000); // new

        let creatBoxItem = {                            // new
            id: creatId,
            name: name,
            done: done,
        }

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
            creatBoxItem,  // new
        };

    }

    function createTodoApp(container, title = 'Список дел', listName = '') {  // new
        readItemBoxStr(listName)  // new


        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        for(let i = 0; i <= boxAllArr.length - 1; i++){  // new
          getLocalOldItem(boxAllArr[i], 'name');
        }

        function getLocalOldItem(element, newKey) {   // new

          let repeatItems = createTodoItem(element[newKey]);

          if (element['done'] !== false) {
            repeatItems.item.classList.toggle('list-group-item-success');
          }

          repeatItems.doneButton.addEventListener('click', function(){
            repeatItems.item.classList.toggle('list-group-item-success');

            for (let newDoneCheck = 0; newDoneCheck <= boxAllArr.length - 1; newDoneCheck++ ) {
              if (boxAllArr[newDoneCheck].name === repeatItems.creatBoxItem.name) {
                boxAllArr[newDoneCheck].done = !boxAllArr[newDoneCheck].done;
              }
            }
            let newSave = JSON.stringify(boxAllArr)
            localStorage.setItem(listName , newSave);

          });

          repeatItems.deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
            repeatItems.item.remove();
            }

            let newDeletBox = [];
            for (let newDeletCheck = 0; newDeletCheck <= boxAllArr.length - 1; newDeletCheck++ ) {
              if (boxAllArr[newDeletCheck].name !== repeatItems.creatBoxItem.name) {
                newDeletBox.push(boxAllArr[newDeletCheck]);
              }

            }

            boxAllArr = newDeletBox;
            let newPushDeletItem = JSON.stringify(boxAllArr)
            localStorage.setItem(listName , newPushDeletItem);
          });

          todoList.append(repeatItems.item);
        }


/////////////////////////////////////////////////////////////////////////submit
        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);


            todoItem.doneButton.addEventListener('click', function(){

                todoItem.item.classList.toggle('list-group-item-success');

                for (let doneCheck = 0; doneCheck <= boxAllArr.length - 1; doneCheck++ ) {  // new
                   if (boxAllArr[doneCheck].id === todoItem.creatBoxItem.id) {
                       boxAllArr[doneCheck].done = !boxAllArr[doneCheck].done;
                   }
                }
                let saveDoneTrue = JSON.stringify(boxAllArr)    // new
                localStorage.setItem(listName , saveDoneTrue);  // new

            });

            todoItem.deleteButton.addEventListener('click', function(){
                if (confirm('Вы уверены?')) {
                   todoItem.item.remove();
                }
                let deletBox = [];  // new
                for (let deletCheck = 0; deletCheck <= boxAllArr.length - 1; deletCheck++ ) {   // new
                    if (boxAllArr[deletCheck].id !== todoItem.creatBoxItem.id) {
                       deletBox.push(boxAllArr[deletCheck]);
                       console.log(boxAllArr[deletCheck]);
                    }
                }
                boxAllArr = deletBox;   // new
                let pushDeletItem = JSON.stringify(boxAllArr)  // new
                localStorage.setItem(listName , pushDeletItem);  // new
            });

            todoList.append(todoItem.item);

            boxAllArr.push(todoItem.creatBoxItem);  // new

            saveBoxStr(listName, boxAllArr);  // new

            console.log(boxAllArr) // Проверка

            todoItemForm.button.disabled = true;

            todoItemForm.input.value = '';

        });

    }

    ////////////////////////////////////////////////////////////////////// dop functions

    function saveBoxStr(key, boxArr){
        let getStrLoc = JSON.stringify(boxArr)
        localStorage.setItem(key , getStrLoc);
    }

    function readItemBoxStr(getKey){
        let getItemsFrom = localStorage.getItem(getKey);
        getItemsFrom = getItemsFrom ? JSON.parse(getItemsFrom) : [];
        console.log(getItemsFrom) // Проверка

        boxAllArr = getItemsFrom;

        return getItemsFrom;
    }


    window.createTodoApp = createTodoApp;

})();
