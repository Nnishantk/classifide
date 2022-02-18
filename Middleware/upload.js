// const multer = require("multer");
// const { GridFsStorage } = require('multer-gridfs-storage');
// //const url = 'mongodb://yourhost:27017/classified';

// const storage = new GridFsStorage({
//     url: process.env.DATABASEURL,
//     options: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         file: (req, file) => {
//             const match = ["image/png", "image/jpeg"];
//             if (match.indexOf(file.mimetype) === -1) {
//                 const filename = `${Date.now()}-any-name-${file.originalname}`;
//                 return filename;
//             }
//             return {
//                 bucketName: "photos",
//                 filename: `$(Date.now()-any-name-${file.originalname}`
//             }
//         }
//     }
// })

// module.exports = multer({ storage })