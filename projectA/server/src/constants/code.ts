// constants/code.ts

// 枚举状态码 根据自己需要定义
enum Code {
  SUCCESS = 200,
  DENIED = 410,
  ERROR = 530,
}

enum CodeMessage {
  SUCCESS = '请求成功',
  DENIED = '无权限',
  ERROR = '系统异常',
}

// 状态类型 只能是Code中所枚举的状态
type codeType = keyof typeof Code

export { Code, codeType, CodeMessage }
