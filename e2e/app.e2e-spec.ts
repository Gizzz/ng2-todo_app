import { browser, element, by, protractor } from 'protractor';

describe("TodoApp", function () {
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
  });

  it("should create new todo", function () {
    let mainSection = element(by.css("section.todoapp .main"));
    expect(mainSection.isPresent()).toBe(false);

    let expectedText = "tst";
    let newTodoInput = element(by.css("section.todoapp .new-todo"));
    newTodoInput.sendKeys(expectedText);
    newTodoInput.sendKeys(protractor.Key.ENTER);

    let todos = element.all(by.css("section.todoapp .todo-list li"));
    expect(todos.count()).toBe(1);
    expect(todos.last().getText()).toBe(expectedText);
  });

  it("should remove todo", function () {
    let todos = element.all(by.css("section.todoapp .todo-list li"));
    expect(todos.count()).toBe(0);

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
});
