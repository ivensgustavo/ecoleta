import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    //onde vão ficar as imagens
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    //processar um novo nome para o arquivo
    //request para dado da requisição
    //file representa informações do arquivo a ser upado
    //callback função a ser chamada após o novo nome ser processado
    filename(request, file, callback){
      const hash = crypto.randomBytes(6).toString('hex');

      const filename = `${hash}-${file.originalname}`;

      callback(null, filename);
    }
  })
};

