import { browser, element, by, protractor } from 'protractor';

describe("TodoApp", function () {
  beforeEach(function () {
    browser.get('');
  });

  it("should create new todo", function () {
    let mainSection = element(by.css("section.todoapp .main"));
    expect(mainSection.isPresent()).toBe(false);

    let newTodo = element(by.css("section.todoapp .new-todo"));
    newTodo.sendKeys("tst");
    newTodo.sendKeys(protractor.Key.ENTER);

    let todos = element.all(by.css("section.todoapp .todo-list li"));
    expect(todos.last().getText()).toContain("tst");
  });

  it("should remove todo", function () {
    let todos = element.all(by.css("section.todoapp .todo-list li"));
    expect(todos.count()).toBe(1);

    let mainSection = element(by.css("section.todoapp .main"));
    expect(mainSection.isPresent()).toBe(true);

    let todo = element(by.css(".todo-list li"));
    let todoToRemove = browser.findElement(by.css(".todo-list li"));
    // perform hover
    browser.actions()
      .mouseMove(todoToRemove)
      .perform();
    todoToRemove.findElement(by.css(".todo-list li button.destroy")).click();

    expect(mainSection.isPresent()).toBe(false);
  });
});
