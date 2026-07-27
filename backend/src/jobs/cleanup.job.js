import cron from 'node-cron';
import TempUpload from '../models/TempUpload.js';
import { deleteFromImageKit } from '../middleware/upload.middleware.js';

export const startCleanupJob = () => {
  cron.schedule('0 2 * * *', async () => {
    console.log('--- [CRON JOB] Bắt đầu dọn dẹp ảnh rác Tiptap ---');
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const orphanImages = await TempUpload.find({
        isUsed: false,
        createdAt: { $lt: twentyFourHoursAgo },
      });

      if (orphanImages.length === 0) {
        console.log('--- [CRON JOB] Không có ảnh rác nào cần dọn dẹp ---');
        return;
      }

      console.log(`--- [CRON JOB] Tìm thấy ${orphanImages.length} ảnh rác. Đang tiến hành xóa... ---`);

      const deletePromises = orphanImages.map((img) => deleteFromImageKit(img.fileId));
      await Promise.allSettled(deletePromises);

      const orphanIds = orphanImages.map((img) => img._id);
      await TempUpload.deleteMany({ _id: { $in: orphanIds } });

      console.log('--- [CRON JOB] Dọn dẹp ảnh rác hoàn tất! ---');
    } catch (error) {
      console.error('--- [CRON JOB ERROR] Lỗi khi dọn dẹp ảnh rác:', error);
    }
  });
};