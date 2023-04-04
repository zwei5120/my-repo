/**
 * 单例模式：通过闭包实现，业务函数可自定义
 * @param fn 自定义执行函数 通过singleTon函数只会执行一次
 * @returns
 */
export function singleTon(fn: Function) {
  let val: any;
  return function() {
    if (!val) {
      val = fn().apply(this, arguments);
      return val;
    }
    return val;
  };
}
