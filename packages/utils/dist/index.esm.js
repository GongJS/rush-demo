import log from 'npmlog';
export { default as log } from 'npmlog';

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
log.heading = 'js-cli';
log.addLevel('success', 2000, { fg: 'green', bold: true });
