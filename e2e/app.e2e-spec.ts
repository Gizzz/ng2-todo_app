import { browser, element, by, protractor } from 'protractor';

let todoApp = element(by.css("section.todoapp"));
let todos = todoApp.elementArrayFinder_.all(by.css(".todo-list li"));

describe("TodoApp", function () {
  beforeEach(function () {
    browser.get('');

    // remove todos from previous test

    todos.count().then(count => {
      if (count) {
        removeLastTodo();
      }
    });

    expect(todos.count()).toBe(0);
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

  it("should mark todo as completed", function () {
    createTodo({ title: "tst" });
    expect(todos.count()).toBe(1);

    let createdTodo = element(by.css(".todo-list li"));
    let completedFlagElement = createdTodo.element(by.css("input.toggle"));
    expect(completedFlagElement.isSelected()).toBe(false);

    completedFlagElement.click();
    expect(completedFlagElement.isSelected()).toBe(true);
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