import { browser, by, element, ElementFinder, protractor, $, $$ } from 'protractor';

let todoApp = element(by.css("section.todoapp"));
let todos = todoApp.elementArrayFinder_.all(by.css(".todo-list li"));
let toggleAll_btn = todoApp.element(by.css(".toggle-all"));
let clearCompleted_btn = todoApp.$("button.clear-completed");

describe("TodoApp", function () {
  beforeEach(function () {
    browser.get('');
    expect(todos.count()).toBe(0);
  });

  afterEach(function () {
    // delete todos from previous test

    browser.getCurrentUrl().then((currentUrl) => { 
      if (currentUrl !== browser.baseUrl) {
        browser.get('');
      }

      todos.count().then(count => {
        for (let i = count; i > 0; i--) {
          deleteLastTodo();
        }
      });
    })
  });

  describe("basic ops", function() {
    it("should create todo with title", function () {
      let expectedText = "tst";
      createTodo({ title: expectedText });

      expect(todos.count()).toBe(1);
      expect(todos.last().getText()).toBe(expectedText);
    });

    it("should not create todo without title", function () {
      createTodo({ title: "" });
      expect(todos.count()).toBe(0);
    });

    it("should delete todo", function () {
      createTodo({ title: "tst" });
      expect(todos.count()).toBe(1);

      deleteLastTodo();
      expect(todos.count()).toBe(0);
    });

    it("should create todos in subsequent order", function () {
      let todoTitle_1 = "todo title 1";
      let todoTitle_2 = "todo title 2";
      let todoTitle_3 = "todo title 3";

      createTodo({ title: todoTitle_1 });
      createTodo({ title: todoTitle_2 });
      createTodo({ title: todoTitle_3 });
      expect(todos.count()).toBe(3);

      let lastTodo = todos.last();
      expect(lastTodo.element(by.css("label")).getText()).toBe(todoTitle_3);
      deleteLastTodo();

      lastTodo = todos.last();
      expect(lastTodo.element(by.css("label")).getText()).toBe(todoTitle_2);
      deleteLastTodo();
      
      lastTodo = todos.last();
      expect(lastTodo.element(by.css("label")).getText()).toBe(todoTitle_1);
      deleteLastTodo();

      expect(todos.count()).toBe(0);
    });

    it("should mark todo as completed", function () {
      createTodo({ title: "tst" });
      expect(todos.count()).toBe(1);

      let createdTodo = element(by.css(".todo-list li"));
      let completedCheckbox = createdTodo.element(by.css("input.toggle"));
      expect(completedCheckbox.isSelected()).toBe(false);

      completedCheckbox.click();
      expect(completedCheckbox.isSelected()).toBe(true);
    });

    it("should mark todo as active", function () {
      createTodo({ title: "tst", completed: true });
      expect(todos.count()).toBe(1);

      let createdTodo = todos.last();
      let completedCheckbox = createdTodo.element(by.css("input.toggle"));
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

      let todo_1 = todos.first();
      let todo_2 = todos.last();
      let completedCheckbox_1 = todo_1.element(by.css("input.toggle"));
      let completedCheckbox_2 = todo_2.element(by.css("input.toggle"));
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

      let todo_1 = todos.first();
      let todo_2 = todos.last();
      let completedCheckbox_1 = todo_1.element(by.css("input.toggle"));
      let completedCheckbox_2 = todo_2.element(by.css("input.toggle"));
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

      let todo_1 = todos.first();
      let todo_2 = todos.last();
      let completedCheckbox_1 = todo_1.element(by.css("input.toggle"));
      let completedCheckbox_2 = todo_2.element(by.css("input.toggle"));
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
      let todo = todos.first();
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

  describe("routing", function () {        
    it("should activate correct link if route is active", function () {
      let filters = todoApp.$(".footer .filters");
      let all_filterLink = filters.$$("li a").get(0);
      let active_filterLink = filters.$$("li a").get(1);
      let completed_filterLink = filters.$$("li a").get(2);

      // without todos main section is not visible
      createTodo({ title: "1" });

      browser.get('');
      expect(all_filterLink.getAttribute("class")).toBe("selected");
      expect(active_filterLink.getAttribute("class")).toBe("");
      expect(completed_filterLink.getAttribute("class")).toBe("");

      browser.get('/active');
      expect(all_filterLink.getAttribute("class")).toBe("");
      expect(active_filterLink.getAttribute("class")).toBe("selected");
      expect(completed_filterLink.getAttribute("class")).toBe("");

      browser.get('/completed');
      expect(all_filterLink.getAttribute("class")).toBe("");
      expect(active_filterLink.getAttribute("class")).toBe("");
      expect(completed_filterLink.getAttribute("class")).toBe("selected");
    });

    it("should display active todos at active page", function () {
      createTodo({ title: "1" });
      expect(todos.count()).toBe(1);
      
      browser.get('/active');
      expect(todos.count()).toBe(1);

      browser.get('/completed');
      expect(todos.count()).toBe(0);
    });

    it("should display completed todos at completed page", function () {
      createTodo({ title: "1", completed: true });
      expect(todos.count()).toBe(1);
      
      browser.get('/active');
      expect(todos.count()).toBe(0);

      browser.get('/completed');
      expect(todos.count()).toBe(1);
    });

    it("should move todo on toggle to appropriate page", function () {
      let todo = createTodo({ title: "1" });

      browser.get('/active');
      expect(todos.count()).toBe(1);

      // make todo completed
      let completedCheckbox = todo.$("input.toggle");
      completedCheckbox.click();
      expect(todos.count()).toBe(0);

      browser.get('/completed');
      expect(todos.count()).toBe(1);

      // make todo active
      completedCheckbox.click();
      expect(todos.count()).toBe(0);

      browser.get('/active');
      expect(todos.count()).toBe(1);
    });

    it("toggleAll button should move items from active to completed page", function () {
      createTodo({ title: "1" });
      createTodo({ title: "2" });
      browser.get('/active');
      expect(todos.count()).toBe(2);

      toggleAll_btn.click();
      expect(todos.count()).toBe(0);

      browser.get('/completed');
      expect(todos.count()).toBe(2);
    });

    it("toggleAll button should move items from completed to active page", function () {
      createTodo({ title: "1", completed: true });
      createTodo({ title: "2", completed: true });

      browser.get('/completed');
      expect(todos.count()).toBe(2);

      toggleAll_btn.click();
      expect(todos.count()).toBe(0);

      browser.get('/active');
      expect(todos.count()).toBe(2);
    });

    it("clearCompleted button should delete items from completed page", function () {
      createTodo({ title: "1", completed: true });
      createTodo({ title: "2", completed: true });

      browser.get("/completed");
      expect(todos.count()).toBe(2);
      
      clearCompleted_btn.click();
      expect(todos.count()).toBe(0);

      browser.get("");
      expect(todos.count()).toBe(0);
    });
  });

  it("main section should not be visible when no todos", function () {
    let mainSection = todoApp.$("section.main");
    expect(mainSection.isPresent()).toBe(false);
  });

  it("main section should be visible when any todo", function () {
    let mainSection = todoApp.$("section.main");
    expect(mainSection.isPresent()).toBe(false);

    let todo = createTodo({ title: "1" });
    expect(mainSection.isDisplayed()).toBe(true);

    let completedCheckbox = todo.$("input.toggle");
    completedCheckbox.click();
    expect(mainSection.isDisplayed()).toBe(true);

    deleteLastTodo();
    expect(mainSection.isPresent()).toBe(false);
  });

  it("'items left' text should display # of todos left correctly", function () {
    let itemsLeft_element = todoApp.$(".footer .todo-count");
    expect(itemsLeft_element.isPresent()).toBe(false);

    let todo_1 = createTodo({ title: "1" });
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

    let completedCheckbox_1 = todo_1.$("input.toggle");
    completedCheckbox_1.click();
    expect(itemsLeft_element.getText()).toBe("0 items left");

    deleteLastTodo();
    expect(itemsLeft_element.isPresent()).toBe(false);
  });
});

// helpers

function createTodo(todoOptions: any): ElementFinder {
  let title = todoOptions.title;
  let newTodoInput = todoApp.element(by.css(".new-todo"));
  newTodoInput.sendKeys(title);
  newTodoInput.sendKeys(protractor.Key.ENTER);

  if (todoOptions.completed) {
    let createdTodo = todos.last();
    let completedCheckbox = createdTodo.element(by.css("input.toggle"));
    completedCheckbox.click();
  } 

  return todos.last();
}

function deleteLastTodo(): void {
  let todoToDelete = todos.last().getWebElement();
  // perform hover
  browser.actions().mouseMove(todoToDelete).perform();
  todoToDelete.findElement(by.css("button.destroy")).click();
}