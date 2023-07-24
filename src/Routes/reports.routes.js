import { Router } from 'express';
import { getPaymentReport, getPerHourSellingReport, getTopSoldProducts, getTotalCardSaleMadeReport, getTotalCashSaleMadeReport, getTotalSale, getTotalSellingPerDayReport } from '../Controllers/reports.controller.js';
import authenticateUser from '../Middleware/authenticate.middleware.js';
import { validatePerHourSaleReport, validateReportForDate, validateReportForTotalSale, validateTopProductSoldReport } from '../Middleware/validators/reports.middleware.js';

const router = Router();

router.get('/report/payments', [authenticateUser], getPaymentReport);
router.get('/report/top-sold-products', [authenticateUser, validateTopProductSoldReport], getTopSoldProducts);
router.get('/report/per-hour-sale', [authenticateUser, validatePerHourSaleReport], getPerHourSellingReport);
router.get('/report/per-day-sale', [authenticateUser, validateReportForDate], getTotalSellingPerDayReport);
router.get('/report/per-day-cash-sale', [authenticateUser, validateReportForDate], getTotalCashSaleMadeReport);
router.get('/report/per-day-card-sale', [authenticateUser, validateReportForDate], getTotalCardSaleMadeReport);
router.get('/report/total-sales', [authenticateUser, validateReportForTotalSale], getTotalSale);

export default router
