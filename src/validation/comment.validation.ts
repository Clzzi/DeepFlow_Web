import { errorToast } from 'lib/Toast';
import { isEmpty } from 'util/isEmpty';

export const validateComment = (contents: string): boolean => {
  if (isEmpty(contents)) {
    errorToast('빈칸없이 입력해주세요.');
    return false;
  }

  return true;
}