import createError from 'http-errors';
import { logger as log } from '@utilities';
import type { Express, Request, Response, NextFunction } from 'express';

export default function configureErrorHandler(server: Express) {
  // Catch 404 and forward to error handler
  server.use(function (next: NextFunction) {
    next(createError(404));
  });

  // Error handler
  server.use(function (err: any, req: Request, res: Response) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    log.error(err, 'Main Error Handler');
  });
}
