import CryptoJS from 'crypto-js'

// 后续考虑使用web worker优化大文件
export async function getFileHashAsync(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file) {
      console.log(file)
      const reader = new FileReader()
      reader.onload = function (e: FileReaderEventMap['load']) {
        if (e.target === null)
          return reject(new Error('文件读取失败失败'))

        const data: ArrayBuffer = e.target.result as ArrayBuffer
        console.log(data)
        const wordArray = CryptoJS.lib.WordArray.create(data)
        const hash: string = CryptoJS.MD5(wordArray).toString()
        resolve(hash)
      }
      reader.readAsArrayBuffer(file)
    }
    else {
      reject(new Error('获取文件哈希值失败'))
    }
  })
}
