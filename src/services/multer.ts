import multer from 'multer';
const storage = multer.memoryStorage(); // Handle file in-memory for further processing
export const upload = multer({storage: storage});
