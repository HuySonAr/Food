import { z } from 'zod';
import { zObjectId } from '../utils/zod.util.js';

export const idParamDto = (filedName = 'ID') => {
  return z.object({
    id: zObjectId(filedName),
  });
};
