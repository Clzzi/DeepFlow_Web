import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Footer.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Footer = (): JSX.Element => {
  return (
    <div className={cx('Footer')}>
      <div className={cx('Footer-Contents')}>
        <div>Copyright yiyb0603. All right reserved. Since 2021</div>
      </div>
    </div>
  );
};

export default memo(Footer);
