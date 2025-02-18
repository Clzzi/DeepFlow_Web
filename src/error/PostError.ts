import { ErrorStatus } from 'lib/enum/response';
import { historySingleton } from 'lib/singleton/history';
import Toast from 'lib/Toast';
import { IError } from 'types/Response';
import CustomError from './CustomError';

export default class PostError extends CustomError {
  constructor(
    private _error: IError,
  ) {
    super(_error);
  }

  public getPostError(): void {
    const { status, message } = this;
    switch (status) {
      case ErrorStatus.NOT_FOUND:
        Toast.errorToast('존재하지 않는 글입니다.');
        historySingleton.push('/');
        return;

      default:
        Toast.errorToast(message);
        return;
    }
  }

  public postFormError(): void {
    const { status, message } = this;

    switch (status) {
      case ErrorStatus.VALIDATE:
        Toast.errorToast('검증 오류입니다.')
        return;

      default:
        Toast.errorToast(message);
        return;
    }
  }
}