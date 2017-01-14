"use strict";
var protractor_1 = require('protractor');
var todoApp = protractor_1.element(protractor_1.by.css("section.todoapp"));
var todos = todoApp.elementArrayFinder_.all(protractor_1.by.css(".todo-list li"));
var newTodo_input = todoApp.element(protractor_1.by.css(".new-todo"));
var toggleAll_btn = todoApp.element(protractor_1.by.css(".toggle-all"));
var clearCompleted_btn = todoApp.$("button.clear-completed");
describe("TodoApp", function () {
    beforeEach(function () {
        protractor_1.browser.get('');
        expect(todos.count()).toBe(0);
    });
    afterEach(function () {
        // delete todos from previous test
        protractor_1.browser.getCurrentUrl().then(function (currentUrl) {
            if (currentUrl !== protractor_1.browser.baseUrl) {
                protractor_1.browser.get('');
            }
            todos.count().then(function (count) {
                for (var i = count; i > 0; i--) {
                    deleteLastTodo();
                }
            });
        });
    });
    describe("basic ops", function () {
        it("should create todo with title", function () {
            var expectedText = "tst";
            createTodo({ title: expectedText });
            expect(todos.count()).toBe(1);
            expect(todos.last().getText()).toBe(expectedText);
        });
        it("should not create todo without title", function () {
            createTodo({ title: "" });
            expect(todos.count()).toBe(0);
        });
        it("should create todo on blur if title is not empty", function () {
            var headerTitle = todoApp.$(".header h1");
            newTodo_input.sendKeys("");
            headerTitle.click();
            expect(todos.count()).toBe(0);
            newTodo_input.sendKeys("tst");
            headerTitle.click();
            expect(todos.count()).toBe(1);
        });
        it("should create todos in subsequent order", function () {
            var todoTitle_1 = "todo title 1";
            var todoTitle_2 = "todo title 2";
            var todoTitle_3 = "todo title 3";
            createTodo({ title: todoTitle_1 });
            createTodo({ title: todoTitle_2 });
            createTodo({ title: todoTitle_3 });
            expect(todos.count()).toBe(3);
            var lastTodo = todos.last();
            expect(lastTodo.element(protractor_1.by.css("label")).getText()).toBe(todoTitle_3);
            deleteLastTodo();
            lastTodo = todos.last();
            expect(lastTodo.element(protractor_1.by.css("label")).getText()).toBe(todoTitle_2);
            deleteLastTodo();
            lastTodo = todos.last();
            expect(lastTodo.element(protractor_1.by.css("label")).getText()).toBe(todoTitle_1);
            deleteLastTodo();
            expect(todos.count()).toBe(0);
        });
        it("should delete todo", function () {
            createTodo({ title: "tst" });
            expect(todos.count()).toBe(1);
            deleteLastTodo();
            expect(todos.count()).toBe(0);
        });
        it("should mark todo as completed", function () {
            createTodo({ title: "tst" });
            expect(todos.count()).toBe(1);
            var createdTodo = protractor_1.element(protractor_1.by.css(".todo-list li"));
            var completedCheckbox = createdTodo.element(protractor_1.by.css("input.toggle"));
            expect(completedCheckbox.isSelected()).toBe(false);
            completedCheckbox.click();
            expect(completedCheckbox.isSelected()).toBe(true);
        });
        it("should mark todo as active", function () {
            createTodo({ title: "tst", completed: true });
            expect(todos.count()).toBe(1);
            var createdTodo = todos.last();
            var completedCheckbox = createdTodo.element(protractor_1.by.css("input.toggle"));
            expect(completedCheckbox.isSelected()).toBe(true);
            completedCheckbox.click();
            expect(completedCheckbox.isSelected()).toBe(false);
        });
    });
    describe("toggleAll button", function () {
        it("should complete all todos if all active", function () {
            createTodo({ title: "1" });
            createTodo({ title: "2" });
            expect(todos.count()).toBe(2);
            var todo_1 = todos.first();
            var todo_2 = todos.last();
            var completedCheckbox_1 = todo_1.element(protractor_1.by.css("input.toggle"));
            var completedCheckbox_2 = todo_2.element(protractor_1.by.css("input.toggle"));
            expect(completedCheckbox_1.isSelected()).toBe(false);
            expect(completedCheckbox_2.isSelected()).toBe(false);
            toggleAll_btn.click();
            expect(completedCheckbox_1.isSelected()).toBe(true);
            expect(completedCheckbox_2.isSelected()).toBe(true);
        });
        it("should complete all todos if one active and one completed", function () {
            createTodo({ title: "1" });
            createTodo({ title: "2" });
            expect(todos.count()).toBe(2);
            var todo_1 = todos.first();
            var todo_2 = todos.last();
            var completedCheckbox_1 = todo_1.element(protractor_1.by.css("input.toggle"));
            var completedCheckbox_2 = todo_2.element(protractor_1.by.css("input.toggle"));
            completedCheckbox_1.click();
            expect(completedCheckbox_1.isSelected()).toBe(true);
            expect(completedCheckbox_2.isSelected()).toBe(false);
            toggleAll_btn.click();
            expect(completedCheckbox_1.isSelected()).toBe(true);
            expect(completedCheckbox_2.isSelected()).toBe(true);
        });
        it("should make active all todos if all completed", function () {
            createTodo({ title: "1" });
            createTodo({ title: "2" });
            expect(todos.count()).toBe(2);
            var todo_1 = todos.first();
            var todo_2 = todos.last();
            var completedCheckbox_1 = todo_1.element(protractor_1.by.css("input.toggle"));
            var completedCheckbox_2 = todo_2.element(protractor_1.by.css("input.toggle"));
            completedCheckbox_1.click();
            completedCheckbox_2.click();
            expect(completedCheckbox_1.isSelected()).toBe(true);
            expect(completedCheckbox_2.isSelected()).toBe(true);
            toggleAll_btn.click();
            expect(completedCheckbox_1.isSelected()).toBe(false);
            expect(completedCheckbox_2.isSelected()).toBe(false);
        });
    });
    describe("clearCompleted button", function () {
        it("should not be visible if no completed todos", function () {
            expect(clearCompleted_btn.isPresent()).toBe(false);
            createTodo({ title: "1", completed: false });
            expect(clearCompleted_btn.isPresent()).toBe(false);
        });
        it("should be visible if any completed todo", function () {
            expect(clearCompleted_btn.isPresent()).toBe(false);
            createTodo({ title: "1", completed: true });
            expect(clearCompleted_btn.isPresent()).toBe(true);
        });
        it("should remove only completed todos", function () {
            createTodo({ title: "1", completed: false });
            createTodo({ title: "2", completed: true });
            expect(todos.count()).toBe(2);
            expect(clearCompleted_btn.isPresent()).toBe(true);
            clearCompleted_btn.click();
            expect(todos.count()).toBe(1);
            var todo = todos.first();
            expect(todo.$(".view label").getText()).toBe("1");
            expect(todo.$(".view input.toggle").isSelected()).toBe(false);
        });
        it("should remove all completed todos", function () {
            createTodo({ title: "1", completed: true });
            createTodo({ title: "2", completed: true });
            expect(todos.count()).toBe(2);
            expect(clearCompleted_btn.isPresent()).toBe(true);
            clearCompleted_btn.click();
            expect(todos.count()).toBe(0);
        });
    });
    describe("todo editing", function () {
        it("should enter editing mode on dblclick", function () {
            var todo = createTodo({ title: "1" });
            expect(todo.$(".view").isDisplayed()).toBe(true);
            expect(todo.$(".edit").isDisplayed()).toBe(false);
            protractor_1.browser.actions().doubleClick(todo.getWebElement()).perform();
            expect(todo.$(".view").isDisplayed()).toBe(false);
            expect(todo.$(".edit").isDisplayed()).toBe(true);
        });
        it("should save changes and leave on ENTER", function () {
            var todo = createTodo({ title: "1" });
            protractor_1.browser.actions().doubleClick(todo.getWebElement()).perform();
            expect(todo.$(".view").isDisplayed()).toBe(false);
            expect(todo.$(".edit").isDisplayed()).toBe(true);
            todo.$(".edit").sendKeys("2");
            todo.$(".edit").sendKeys(protractor_1.protractor.Key.ENTER);
            expect(todo.$(".view").isDisplayed()).toBe(true);
            expect(todo.$(".edit").isDisplayed()).toBe(false);
            expect(todo.$(".view label").getText()).toBe("12");
        });
        it("should save changes and leave on blur", function () {
            var todo = createTodo({ title: "1" });
            protractor_1.browser.actions().doubleClick(todo.getWebElement()).perform();
            expect(todo.$(".view").isDisplayed()).toBe(false);
            expect(todo.$(".edit").isDisplayed()).toBe(true);
            todo.$(".edit").sendKeys("2");
            todo.$(".edit").sendKeys(protractor_1.protractor.Key.ENTER);
            // perform blur
            newTodo_input.click();
            expect(todo.$(".view").isDisplayed()).toBe(true);
            expect(todo.$(".edit").isDisplayed()).toBe(false);
            expect(todo.$(".view label").getText()).toBe("12");
        });
        it("should discard changes and leave on ESC", function () {
            var todo = createTodo({ title: "1" });
            protractor_1.browser.actions().doubleClick(todo.getWebElement()).perform();
            expect(todo.$(".view").isDisplayed()).toBe(false);
            expect(todo.$(".edit").isDisplayed()).toBe(true);
            todo.$(".edit").sendKeys("2");
            todo.$(".edit").sendKeys(protractor_1.protractor.Key.ESCAPE);
            expect(todo.$(".view").isDisplayed()).toBe(true);
            expect(todo.$(".edit").isDisplayed()).toBe(false);
            expect(todo.$(".view label").getText()).toBe("1");
        });
        it("should delete todo if title is empty", function () {
            var todo = createTodo({ title: "1" });
            expect(todos.count()).toBe(1);
            protractor_1.browser.actions().doubleClick(todo.getWebElement()).perform();
            todo.$(".edit").sendKeys(protractor_1.protractor.Key.BACK_SPACE);
            todo.$(".edit").sendKeys(protractor_1.protractor.Key.ENTER);
            expect(todos.count()).toBe(0);
        });
        it("should not delete empty todo if editing cancelled", function () {
            var todo = createTodo({ title: "1" });
            expect(todos.count()).toBe(1);
            protractor_1.browser.actions().doubleClick(todo.getWebElement()).perform();
            todo.$(".edit").sendKeys(protractor_1.protractor.Key.BACK_SPACE);
            todo.$(".edit").sendKeys(protractor_1.protractor.Key.ESCAPE);
            expect(todos.count()).toBe(1);
        });
    });
    describe("routing", function () {
        it("should activate correct link if route is active", function () {
            var filters = todoApp.$(".footer .filters");
            var all_filterLink = filters.$$("li a").get(0);
            var active_filterLink = filters.$$("li a").get(1);
            var completed_filterLink = filters.$$("li a").get(2);
            // without todos main section is not visible
            createTodo({ title: "1" });
            protractor_1.browser.get('');
            expect(all_filterLink.getAttribute("class")).toBe("selected");
            expect(active_filterLink.getAttribute("class")).toBe("");
            expect(completed_filterLink.getAttribute("class")).toBe("");
            protractor_1.browser.get('/active');
            expect(all_filterLink.getAttribute("class")).toBe("");
            expect(active_filterLink.getAttribute("class")).toBe("selected");
            expect(completed_filterLink.getAttribute("class")).toBe("");
            protractor_1.browser.get('/completed');
            expect(all_filterLink.getAttribute("class")).toBe("");
            expect(active_filterLink.getAttribute("class")).toBe("");
            expect(completed_filterLink.getAttribute("class")).toBe("selected");
        });
        it("should display active todos at active page", function () {
            createTodo({ title: "1" });
            expect(todos.count()).toBe(1);
            protractor_1.browser.get('/active');
            expect(todos.count()).toBe(1);
            protractor_1.browser.get('/completed');
            expect(todos.count()).toBe(0);
        });
        it("should display completed todos at completed page", function () {
            createTodo({ title: "1", completed: true });
            expect(todos.count()).toBe(1);
            protractor_1.browser.get('/active');
            expect(todos.count()).toBe(0);
            protractor_1.browser.get('/completed');
            expect(todos.count()).toBe(1);
        });
        it("should move todo on toggle to appropriate page", function () {
            var todo = createTodo({ title: "1" });
            protractor_1.browser.get('/active');
            expect(todos.count()).toBe(1);
            // make todo completed
            var completedCheckbox = todo.$("input.toggle");
            completedCheckbox.click();
            expect(todos.count()).toBe(0);
            protractor_1.browser.get('/completed');
            expect(todos.count()).toBe(1);
            // make todo active
            completedCheckbox.click();
            expect(todos.count()).toBe(0);
            protractor_1.browser.get('/active');
            expect(todos.count()).toBe(1);
        });
        it("toggleAll button should move items from active to completed page", function () {
            createTodo({ title: "1" });
            createTodo({ title: "2" });
            protractor_1.browser.get('/active');
            expect(todos.count()).toBe(2);
            toggleAll_btn.click();
            expect(todos.count()).toBe(0);
            protractor_1.browser.get('/completed');
            expect(todos.count()).toBe(2);
        });
        it("toggleAll button should move items from completed to active page", function () {
            createTodo({ title: "1", completed: true });
            createTodo({ title: "2", completed: true });
            protractor_1.browser.get('/completed');
            expect(todos.count()).toBe(2);
            toggleAll_btn.click();
            expect(todos.count()).toBe(0);
            protractor_1.browser.get('/active');
            expect(todos.count()).toBe(2);
        });
        it("clearCompleted button should delete items from completed page", function () {
            createTodo({ title: "1", completed: true });
            createTodo({ title: "2", completed: true });
            protractor_1.browser.get("/completed");
            expect(todos.count()).toBe(2);
            clearCompleted_btn.click();
            expect(todos.count()).toBe(0);
            protractor_1.browser.get("");
            expect(todos.count()).toBe(0);
        });
    });
    it("main section and footer should not be visible when no todos", function () {
        var mainSection = todoApp.$("section.main");
        var footer = todoApp.$(".footer");
        expect(mainSection.isPresent()).toBe(false);
        expect(footer.isPresent()).toBe(false);
    });
    it("main section and footer should be visible when any todo", function () {
        var mainSection = todoApp.$("section.main");
        var footer = todoApp.$(".footer");
        expect(mainSection.isPresent()).toBe(false);
        expect(footer.isPresent()).toBe(false);
        var todo = createTodo({ title: "1" });
        expect(mainSection.isDisplayed()).toBe(true);
        expect(footer.isDisplayed()).toBe(true);
        var completedCheckbox = todo.$("input.toggle");
        completedCheckbox.click();
        expect(mainSection.isDisplayed()).toBe(true);
        expect(footer.isDisplayed()).toBe(true);
        deleteLastTodo();
        expect(mainSection.isPresent()).toBe(false);
        expect(footer.isPresent()).toBe(false);
    });
    it("'items left' text should display # of todos left correctly", function () {
        var itemsLeft_element = todoApp.$(".footer .todo-count");
        expect(itemsLeft_element.isPresent()).toBe(false);
        var todo_1 = createTodo({ title: "1" });
        expect(itemsLeft_element.isDisplayed()).toBe(true);
        expect(itemsLeft_element.getText()).toBe("1 item left");
        createTodo({ title: "2" });
        expect(itemsLeft_element.getText()).toBe("2 items left");
        createTodo({ title: "3" });
        expect(itemsLeft_element.getText()).toBe("3 items left");
        deleteLastTodo();
        expect(itemsLeft_element.getText()).toBe("2 items left");
        deleteLastTodo();
        expect(itemsLeft_element.getText()).toBe("1 item left");
        var completedCheckbox_1 = todo_1.$("input.toggle");
        completedCheckbox_1.click();
        expect(itemsLeft_element.getText()).toBe("0 items left");
        deleteLastTodo();
        expect(itemsLeft_element.isPresent()).toBe(false);
    });
});
// helpers
function createTodo(todoOptions) {
    var title = todoOptions.title;
    newTodo_input.sendKeys(title);
    newTodo_input.sendKeys(protractor_1.protractor.Key.ENTER);
    if (todoOptions.completed) {
        var createdTodo = todos.last();
        var completedCheckbox = createdTodo.element(protractor_1.by.css("input.toggle"));
        completedCheckbox.click();
    }
    return todos.last();
}
function deleteLastTodo() {
    var todoToDelete = todos.last().getWebElement();
    // perform hover
    protractor_1.browser.actions().mouseMove(todoToDelete).perform();
    todoToDelete.findElement(protractor_1.by.css("button.destroy")).click();
}
//# sourceMappingURL=app.e2e-spec.js.map