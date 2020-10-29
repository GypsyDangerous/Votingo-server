export const promisify = (func: Function) => {
	return (...args: Array<any>) => {
		return new Promise((resolve, reject) => {
			func(...args, (err: any, result: any) => {
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		})
	}
}