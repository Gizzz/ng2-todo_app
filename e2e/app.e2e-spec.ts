import { browser, by, element, protractor, $, $$ } from 'protractor';

let todoApp = element(by.css("section.todoapp"));
let todos = todoApp.elementArrayFinder_.all(by.css(".todo-list li"));

describe("TodoApp", function () {
  beforeEach(function () {
    browser.get('');

    expect(todos.count()).toBe(0);
  });

  afterEach(function () {
    // remove todos from previous test

    todos.count().then(count => {
      for (let i = count; i > 0; i--) {
        removeLastTodo();
      }
    });
  });

  it("should create new todo", function () {
    let expectedText = "tst";
    createTodo({ title: expectedText });

    expect(todos.count()).toBe(1);
    expect(todos.last().getText()).toBe(expectedText);
  });

  it("should remove todo", function () {
    createTodo({ title: "tst" });
    expect(todos.count()).toBe(1);

    removeLastTodo();
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
    removeLastTodo();

    lastTodo = todos.last();
    expect(lastTodo.element(by.css("label")).getText()).toBe(todoTitle_2);
    removeLastTodo();
    
    lastTodo = todos.last();
    expect(lastTodo.element(by.css("label")).getText()).toBe(todoTitle_1);
    removeLastTodo();

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

  describe("completeAll button", function () {
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

      let completeAll = todoApp.element(by.css(".toggle-all"));
      completeAll.click();

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

      let completeAll = todoApp.element(by.css(".toggle-all"));
      completeAll.click();

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

      let completeAll = todoApp.element(by.css(".toggle-all"));
      completeAll.click();

      expect(completedCheckbox_1.isSelected()).toBe(false);
      expect(completedCheckbox_2.isSelected()).toBe(false);
    });
  });
});

// helpers

function createTodo(options: any): void {
  let title = options.title;
  let newTodoInput = todoApp.element(by.css(".new-todo"));
  newTodoInput.sendKeys(title);
  newTodoInput.sendKeys(protractor.Key.ENTER);

  if (options.completed) {
    let createdTodo = todos.last();
    let completedCheckbox = createdTodo.element(by.css("input.toggle"));
    completedCheckbox.click();
  } 
}

function removeLastTodo(): void {
  let todoToRemove = todos.last().getWebElement();
  // perform hover
  browser.actions().mouseMove(todoToRemove).perform();
  todoToRemove.findElement(by.css("button.destroy")).click();
}