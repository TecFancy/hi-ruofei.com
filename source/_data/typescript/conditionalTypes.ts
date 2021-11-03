/*
 * @Author: 若非
 * @Date: 2021-11-03 16:45:12
 * @LastEditTime: 2021-11-03 17:54:01
 * @LastEditors: Please set LastEditors
 * @Description: Conditional Types - 条件类型
 * @FilePath: \hi-ruofei.com\source\_data\typescript\conditionalTypes.ts
 */

/**
 * Obtain the parameters of a function type in a tuple
 * type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
 */

/**
 * 条件类型看起来像这样：
 * SomeType extends OtherType ? TrueType : FalseType;
 */
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
type Example1 = Dog extends Animal ? number : string; // number
type Example2 = RegExp extends Animal ? number : string; // string

/**
 * 简化函数重载
 */
interface IdLabel {
  id: number; // some fields
}
interface NameLabel {
  name: string; // other fields
}
// `createLabel` 的这三个重载描述的是同一个函数，该函数会根据形参的类型去选择对
// 应的类型声明。对于 `createLabel` 可以处理的每一种新的类型，重载的类型都是以
// 指数增长的。
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  console.log(nameOrId);
  throw "unimplemented";
}
// 使用条件类型简化函数重载
type NameOrId<T extends string | number> = T extends string
  ? NameLabel
  : IdLabel;
function simpleCreateLabel<T extends string | number>(
  nameOrId: T
): NameOrId<T> {
  console.log(nameOrId);
  throw "unimplemented";
}
const firstLabel = simpleCreateLabel("typescript"); // NameLabel
const secondLabel = simpleCreateLabel(3.1415926); // IdLabel
const thirdLabel = simpleCreateLabel(Math.random() ? "hello world" : 42); // NameLabel | IdLabel
const fourthLabel = simpleCreateLabel(Math.random() ? 42 : "hello world"); // IdLabel | NameLabel

/**
 * 条件类型约束
 */

/**
 * 在条件类型中推断
 */

/**
 * 分配条件类型
 */
