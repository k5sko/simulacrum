import { useState, useEffect, useRef } from 'react';
import { Nullable } from '../../utils/helpers';
import { printer, PrintableItem, PrinterResponse, createPrinterTask, PrinterConfig } from '../../API/printer';

type PrinterReturnType = ReturnType<typeof usePrinter>;

const defaultState: PrinterResponse = {
  state: [],
  remainingLines: null,
  printedLines: [],
  wordFullyPrinted: true,
  newLine: true,
};

type IntervalID = ReturnType<typeof setTimeout>;
type ResolveCallback = Nullable<(value: unknown) => void>;


interface PrinterProps extends PrinterConfig {
  afterPrintCallback: () => void;
}

function usePrinter({ printerSpeed, charactersPerTick, afterPrintCallback }: PrinterProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [activeTimeout, setActiveTimeout] = useState<IntervalID | null>(null);

  const [printerResponse, setPrinterResponse] = useState<PrinterResponse>(defaultState);
  const resolveRef = useRef<ResolveCallback>(null);

  const clearTimeoutState = () => {
    if (activeTimeout) {
      clearTimeout(activeTimeout);
      setActiveTimeout(null);
    }
  };

  const clearResolver = () => {
    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }
  };

  const nextPrint = () => {
    const { remainingLines, printedLines, wordFullyPrinted, newLine, state, configOverride} = printerResponse;
    if (!remainingLines) return;

    const resp = printer({
      remainingLines,
      printedLines: newLine ? [] : printedLines,
      wordFullyPrinted,
      newLine,
      state,
      charactersToPrint: configOverride?.charactersPerTick ?? charactersPerTick,
    });
    setPrinterResponse({...resp, configOverride});
    setActiveTimeout(null);
  };

  const startPrint = async (line: PrintableItem, configOverride?: Partial<PrinterConfig>) => {
    const resp = printer({
      remainingLines: line,
      printedLines: [],
      state: printerResponse.state,
      wordFullyPrinted: true,
      newLine: true,
      charactersToPrint: configOverride?.charactersPerTick ?? charactersPerTick,
    });
    setIsPrinting(true);
    setPrinterResponse({...resp, configOverride});

    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const stopPrint = () => {
    setIsPrinting(false);
    clearTimeoutState();
    clearResolver();
  };

  const clear = () => {
    setPrinterResponse(defaultState);
  };

  useEffect(() => {
    const shouldStopPrint = isPrinting && !printerResponse.remainingLines;
    const shouldPrint = isPrinting && !activeTimeout;
    const shouldClearTimeout = !isPrinting && activeTimeout;

    if (shouldStopPrint) {
      stopPrint();
      afterPrintCallback();
    } else if (shouldPrint) {
      setActiveTimeout(createPrinterTask(nextPrint, printerResponse?.configOverride?.printerSpeed ?? printerSpeed));
      afterPrintCallback();
    } else if (shouldClearTimeout) {
      clearTimeoutState();
    }
    return () => {};
    // disabled due to inner structure: nextSlide only matters when activeTimeout or isLoading updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPrinting, activeTimeout]);

  useEffect(
    () => () => {
      clearTimeoutState();
      clearResolver();
    },
    // disabled due to inner structure: should be equal to "onBeforeUnmount"
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    state: printerResponse.state,
    handlers: {
      startPrint,
      clear,
    },
  };
}

export type { PrinterReturnType, PrinterConfig, PrinterProps };
export { usePrinter };
