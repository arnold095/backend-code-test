export interface IocAdapter {
  get<T>(className: string): T;

  container<T>(): T | any;
}
