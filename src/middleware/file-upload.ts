const multer = require("multer");
const uuidv1 = require("uuid/v1");

const MimeTypeMap : any = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};

const fileUpload = multer({
	limits: 500000,
	storage: multer.diskStorage({
		destination: (req: any, file: any, callback: any) => {
			callback(null, "uploads/images");
		},
		filename: (req: any, file: any, callback: any) => {
			const ext = MimeTypeMap[file.mimetype];
			callback(null, uuidv1() + "." + ext);
		},
	}),
	fileFilter: (req: any, file: any, callback: any) => {
		const isValid = !!MimeTypeMap[file.mimetype];
		let error = isValid ? null : new Error("Invalid File Type");
		callback(error, isValid);
	},
});

export = fileUpload;
