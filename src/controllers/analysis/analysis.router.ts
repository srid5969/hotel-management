import express from 'express';
import {asyncWrapper} from './../../middleware/async-wrapper';
import {upload} from '../../services/multer';
import { AnalysisReportController } from './analysis.controller';

export const AnalysisRouter = express.Router();

AnalysisRouter.post(
  '/cover-analysis',
  upload.single('file'),
  asyncWrapper(AnalysisReportController.importCoverAnalysisReport)
);
