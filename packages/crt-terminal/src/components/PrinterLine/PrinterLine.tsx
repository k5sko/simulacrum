import React, { PropsWithChildren } from 'react';
import { exhaustiveCheck } from '../../utils/helpers';
import { Lines, LineTypes } from '../../API/sentence/sentence';
import classes from './printer-line.module.scss';

interface PrinterLineProps {
  line: Lines;
}

const checkLines = exhaustiveCheck('Unknown line type: ');

const PrinterLine = function PrinterLine({ line, children }: PropsWithChildren<PrinterLineProps>) {
  const { className = '', dataAttribute, id } = line;

  return (() => {
    switch (line.type) {
      case LineTypes.TEXT:
        return (
          <div
            id={id}
            className={[classes.textLine, 'crt-text-line', className].join(' ')}
            data-crt-terminal={dataAttribute}
            style={{marginLeft: line.marginChars ? `${line.marginChars}ch` : 0 }}
          >
            {children}
          </div>
        );
      case LineTypes.COMMAND:
        return (
          <div
            id={id}
            className={[classes.commandLine, 'crt-command-line', className].join(' ')}
            data-crt-terminal={dataAttribute}
          >
            {children}
          </div>
        );
      case LineTypes.INLINE_TEXT:
        // return (
        //   <span
        //     id={id}
        //     className={[classes.inlineTextLine, 'crt-command-line', 'crt-inline-command-line', className].join(' ')}
        //     data-crt-terminal={dataAttribute}
        //   >
        //     {children}
        //   </span>
        // );
        return <>{children}</>;
      default:
        return checkLines(line);
    }
  })();
};

export default PrinterLine;
