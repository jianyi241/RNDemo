import { JSEncrypt } from 'jsencrypt'

const PUBLIC_KEY =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChEL++GBMv5/0JBrGW8U9FVmNVMQhxLDoCPntiVcCLi8u0Ut4+mg31cyMtrmWVzQBuuTDFMA+WMw/0H5CZp5cbEUseE5gKvO8lCHxbWwuouRcBrhN/asKPIHLZWP0lW0EMrcMkSTK64QCtV0SrL0v3U9MtUd04D5euw6aoLKS2awIDAQAB'
const RSAEncryption = {
    // 公钥串

    // 公钥加密
    encrypt(data: string): string | false {
        const publicKey = `-----BEGIN PUBLIC KEY-----${PUBLIC_KEY}-----END PUBLIC KEY-----`
        const encryptor = new JSEncrypt() // 新建JSEncrypt对象
        encryptor.setPublicKey(publicKey) // 设置公钥
        // 对需要加密的数据进行加密
        return encryptor.encrypt(data)
    },

    // 私钥解密
    decrypt(data: string, pKey: string): string | false {
        const privateKey = `-----BEGIN RSA PRIVATE KEY-----${pKey}RZWiISXt8gmeDiF/X0lalHm7ZuDU4sIA/YQ2L+S/wQ==-----END RSA PRIVATE KEY-----`
        const decrypt = new JSEncrypt()
        decrypt.setPrivateKey(privateKey) // 设置私钥
        return decrypt.decrypt(data)
    }
}

export default RSAEncryption
