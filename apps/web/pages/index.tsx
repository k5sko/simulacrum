import React, { useEffect } from 'react';
import {
  Terminal,
  useEventQueue,
  textLine,
  textWord,
  commandWord,
} from '@jquesnelle/crt-terminal/src';
import getQuery from '../../api/gpt.mjs';
import Layout from '../components/Layout/Layout';
import classes from './index.module.scss';


function Web() {
  const eventQueue = useEventQueue();

  const {print, loading } = eventQueue.handlers;

  const handleCommand = async (command: string) => {
    loading(true);
    const response = await getQuery(command);
    loading(false);
    print([
      textLine({
        words: [
          textWord({ characters: 'Narrator: ' }),
          commandWord({ characters: response, prompt: '>' }),
        ],
      }),
    ],);
  };

  useEffect(() => {
    // Perform any async operations here if necessary
  }, []);

  return (
    <Layout>
      <main className={classes.mainContainer}>
        <Terminal
          queue={eventQueue}
          onCommand={handleCommand}
          banner={[
            textLine({
              className: classes.customLine,
              words: [commandWord({ characters: 'Type begin story to begin', prompt: '>' })],
            }),
          ]}

        />
      </main>
    </Layout>
  );
}

export default Web;
