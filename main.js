const addButton = document.querySelector(".btn-Ekle");
const textInput = document.querySelector(".inputClass");
const inputs = document.querySelector(".inPut");
const todoList = document.querySelector(".ulList");
const clearButton = document.querySelector(".clearBtn");
const delAndRemove = document.querySelector("#idList");
const filterWord = document.querySelector(".inputClass2");

let list = [];

document.addEventListener("DOMContentLoaded", onLoad);
addButton.addEventListener("click", addTodoScreen);
clearButton.addEventListener("click", allClearList);
delAndRemove.addEventListener("click", deleteList);
// delAndRemove.addEventListener("click", renameList);
filterWord.addEventListener("keyup", onFilter);
document.addEventListener("keypress", enterControl);

function enterControl(e) {
    if (e.keyCode == 13) {
        addTodoScreen(e);
    }
}

function onFilter(e) {
    const toDoList = document.querySelectorAll(".listeler");
    const filter = e.target.value.toLowerCase().trim();


    if (toDoList.length > 0) {
        toDoList.forEach(function (todo) {
            if (todo.textContent.toLowerCase().includes(filter)) {
                todo.setAttribute("style", "display : block");
            } else {
                todo.setAttribute("style", "display : none !important");
            }
        });
    } else {
        getAlert("warning", "Filtreleme yapmak için en az bir tane ürün olmalı");
    }
}

function deleteList(e) {
    // ekrandan silme
    if (e.target.className == "fa-solid fa-trash fa-fade text-danger delete") {
        const deleteElement = e.target.parentElement.parentElement;
        deleteElement.remove();
        getAlert("success", "Silme işlemi başarıyla tamamlandı..");

        // storage dan silme
        deleteStorage(deleteElement.textContent);
    } else {
        // renameList();
    }

}

function deleteStorage(removeTextElement) {
    controlFromTheStorage();
    list.forEach(function (del, index) {
        if (removeTextElement == del) {
            list.splice(index, 1);
        }
    });
    localStorage.setItem("list", JSON.stringify(list));
}

function allClearList() {

    const list = document.querySelectorAll(".listeler");
    if (list.length > 0) {
        // ekrandan sil..
        list.forEach(function (todo) {
            todo.remove();
        });
        // storagedan sil..
        localStorage.clear();
        getAlert("warning", "Tüm ögeler başarılı bir şekilde silindi");

    } else {
        getAlert("warning", "Silinecek herhangi bir şey yok ..");
    }
}

function addTodoScreen(e) {
    const text = textInput.value;

    if (text == null || text == "") {
        getAlert("danger", "Lütfen boş bırakmayınız");
    } else {
        // ekranda göster
        showTheScreen(text);
        // storage da göster
        showTheStorage(text);
        getAlert("success", "Ekleme işlemi başarılı ..");
    }
    //e.preventDefault();
}

function showTheScreen(textContent) {
    /*                <li>Süt<div class="align"><i class="fa-solid fa-pencil fa-fade text-success"></i><i class="fa-solid fa-trash fa-fade text-danger"
                                style="margin-left: 6px;"></i></div>
                    </li> */

    const li = document.createElement("li");
    li.textContent = textContent;
    li.className = "listeler";

    const div = document.createElement("div");
    div.className = "align";

    const i1 = document.createElement("i");
    i1.className = "fa-solid fa-pencil fa-fade text-success rename";

    const i2 = document.createElement("i");
    i2.className = "fa-solid fa-trash fa-fade text-danger delete";
    i2.style = "margin-left: 10px";

    div.appendChild(i1);
    div.appendChild(i2);

    li.appendChild(div);
    todoList.appendChild(li);
    textInput.value = "";
}

function onLoad() {
    controlFromTheStorage();
    list.forEach(function (a) {
        showTheScreen(a);
    })
}

function showTheStorage(textContent) {
    controlFromTheStorage();
    list.push(textContent);
    localStorage.setItem("list", JSON.stringify(list));
}

function controlFromTheStorage() {
    if (localStorage.getItem("list") == null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem("list"));
    }
}

function getAlert(alertType, message) {
    /*<div class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div> */
    const div = document.createElement("div");
    div.className = "alert alert-" + alertType;
    div.textContent = message;

    inputs.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 2000);

}

