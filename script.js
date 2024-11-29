const button = document.getElementById("btn")
const input = document.getElementById("input")
const ta = document.getElementById("textarea")
const w1 = document.getElementById("warning1")
const w2 = document.getElementById("warning2")
const list = document.getElementById("container")

// localStorage.clear()

function display() {
    list.innerHTML = "";

    let data = localStorage.getItem("tasks");
    if (!data) {
        return;
    }

    data = JSON.parse(data);

    for (let item of data) {
        let dabba = document.createElement("div");
        dabba.classList.add("card", "mb-3", "shadow-sm");

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "justify-content-between", "align-items-center");

        let textContainer = document.createElement("div");

        let tasktitle = document.createElement("h3");
        tasktitle.classList.add("card-title");
        tasktitle.innerText = item.title;

        let taskdesc = document.createElement("p");
        taskdesc.classList.add("card-text");
        taskdesc.innerText = item.desc;

        textContainer.appendChild(tasktitle);
        textContainer.appendChild(taskdesc);

        // Create delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.innerText = "Delete";

        // Handle delete action
        deleteBtn.addEventListener("click", () => {
            let originalData = localStorage.getItem("tasks")
            originalData = JSON.parse(originalData)

            let arr = originalData.filter((i) => {
                return i.desc != item.desc
            })
            localStorage.setItem("tasks", JSON.stringify(arr))
            display()
        })

        cardBody.appendChild(textContainer);
        cardBody.appendChild(deleteBtn);
        dabba.appendChild(cardBody);
        list.appendChild(dabba);
    }
}

display()

button.addEventListener("click", () => {
    let isEmpty = false
    if (input.value == "") {
        isEmpty = true
        w1.classList.remove("d-none")
    }
    if (!ta.value) {
        isEmpty = true
        w2.classList.remove("d-none")
    }

    if (isEmpty) {
        return
    }

    let val1 = input.value
    let val2 = ta.value

    let tasksArray = localStorage.getItem("tasks") || []

    if (tasksArray.length) {
        tasksArray = JSON.parse(tasksArray)
    }

    tasksArray.push({
        title: val1,
        desc: val2
    })

    localStorage.setItem("tasks", JSON.stringify(tasksArray))

    input.value = ""
    ta.value = ""

    display()

})
input.addEventListener("input", () => {
    if (input.value) {
        w1.classList.add("d-none")
    }
})
ta.addEventListener("input", () => {
    if (ta.value) {
        w2.classList.add("d-none")
    }
})