const path = require('path');

const {
  IS_OFFLINE,
  NODE_ENV,
  LAMBDA_TASK_ROOT,
  AWS_LAMBDA_FUNCTION_NAME,
} = process.env;

const FileUtil = {
  getPath(file) {
    /* istanbul ignore next */
    return (IS_OFFLINE !== 'true' && NODE_ENV !== 'test')
      ? path.resolve(LAMBDA_TASK_ROOT || 'root', '_optimize', AWS_LAMBDA_FUNCTION_NAME || 'func', file)
      : file;
  },
};

module.exports = FileUtil;
