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

      console.log(
        `--- [CRON JOB] Tìm thấy ${orphanImages.length} ảnh rác. Đang tiến hành xóa... ---`,
      );

      const deleteResults = await Promise.allSettled(
        orphanImages.map((img) => deleteFromImageKit(img.fileId)),
      );

      const successfulIds = [];

      deleteResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successfulIds.push(orphanImages[index]._id);
        } else {
          console.error(
            `--- [CRON JOB FAILED] Không thể xóa ảnh trên ImageKit (FileID: ${orphanImages[index].fileId}):`,
            result.reason?.message || result.reason,
          );
        }
      });

      if (successfulIds.length > 0) {
        await TempUpload.deleteMany({ _id: { $in: successfulIds } });
        console.log(
          `--- [CRON JOB] Đã xóa hoàn tất ${successfulIds.length}/${orphanImages.length} ảnh rác! ---`,
        );
      } else {
        console.log(
          '--- [CRON JOB] Không có ảnh nào được xóa thành công trên cloud trong đợt này. ---',
        );
      }
    } catch (error) {
      console.error('--- [CRON JOB ERROR] Lỗi hệ thống khi dọn rác:', error);
    }
  });
};
