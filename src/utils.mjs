import path from 'path';
import * as sass from 'sass';
import chokidar from 'chokidar';
import ora from 'ora';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

let index = 1;

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const SCSS_SOURCE_PATH = path.resolve(__dirname, '../source/index.scss');

export function compileScss() {
    const start = Date.now();
    const spinner = ora('Compiling scss...').start();

    return sass.compileAsync(SCSS_SOURCE_PATH).then((result) => {
        spinner.suffixText = chalk.gray(`${Date.now() - start}ms`);
        spinner.succeed(chalk.green(`scss compiled! ${index !== 1 ? `(x${index})` : ''}`));
        index++;
        spinner.clear();
        return result.css;
    });
}

export function scssChangeListener(callback) {
    const watcher = chokidar.watch('*.scss', {
        cwd: path.resolve(__dirname, '../source/'),
    });

    watcher.on('change', (filePath) => {
        console.log('change', filePath)
        compileScss().then((css) => {
            callback(css, filePath);
        });
    });

    return () => watcher.close();
}
