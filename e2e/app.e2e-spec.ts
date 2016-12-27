import { browser, element, by, protractor } from 'protractor';

describe("TodoApp", function () {
  let todos = element.all(by.css("section.todoapp .todo-list li"));

  beforeEach(function () {
    browser.get('');

    // remove todos from previous test

    let mainSection = element(by.css("section.todoapp .main"));

    mainSection.isPresent().then(isPresent => {
      if (isPresent) {
        let todoToRemove = browser.findElement(by.css(".todo-list li"));
        // perform hover
        browser.actions().mouseMove(todoToRemove).perform();
        todoToRemove.findElement(by.css("button.destroy")).click();
      }
    });

    expect(todos.count()).toBe(0);
  });

  it("should create new todo", function () {
    let expectedText = "tst";
    let newTodoInput = element(by.css("section.todoapp .new-todo"));
    newTodoInput.sendKeys(expectedText);
    newTodoInput.sendKeys(protractor.Key.ENTER);

    expect(todos.count()).toBe(1);
    expect(todos.last().getText()).toBe(expectedText);
  });

  it("should remove todo", function () {
    // create new todo

    let expectedText = "tst";
    let newTodoInput = element(by.css("section.todoapp .new-todo"));
    newTodoInput.sendKeys(expectedText);
    newTodoInput.sendKeys(protractor.Key.ENTER);
    expect(todos.count()).toBe(1);

    // remove created todo

    let todoToRemove = browser.findElement(by.css(".todo-list li"));
    // perform hover
    browser.actions().mouseMove(todoToRemove).perform();
    todoToRemove.findElement(by.css("button.destroy")).click();
    expect(todos.count()).toBe(0);
  });

  it("should mark todo as completed", function () {
    // create new todo

    let expectedText = "tst";
    let newTodoInput = element(by.css("section.todoapp .new-todo"));
    newTodoInput.sendKeys(expectedText);
    newTodoInput.sendKeys(protractor.Key.ENTER);
    expect(todos.count()).toBe(1);

    let createdTodo = element(by.css(".todo-list li"));
    let completedFlagElement = createdTodo.element(by.css("input.toggle"));
    expect(completedFlagElement.isSelected()).toBe(false);

    completedFlagElement.click();
    expect(completedFlagElement.isSelected()).toBe(true);
  });

  it("should mark todo as active", function () {
    // create new todo

    let expectedText = "tst";
    let newTodoInput = element(by.css("section.todoapp .new-todo"));
    newTodoInput.sendKeys(expectedText);
    newTodoInput.sendKeys(protractor.Key.ENTER);
    expect(todos.count()).toBe(1);

    let createdTodo = element(by.css(".todo-list li"));
    let completedFlagElement = createdTodo.element(by.css("input.toggle"));
    expect(completedFlagElement.isSelected()).toBe(false);

    completedFlagElement.click();
    expect(completedFlagElement.isSelected()).toBe(true);

    completedFlagElement.click();
    expect(completedFlagElement.isSelected()).toBe(false);
  });
});
